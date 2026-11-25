import { useRef, useState, type FormEvent } from "react";
import Alerta from "../atomos/Alerta";
import CampoFormulario from "../moleculas/CampoFormulario";
import { enviarContacto } from "../../api/contacto";
const esCorreoValido = (valor: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());

type CampoContacto = "nombre" | "correo" | "mensaje";

type ValoresContacto = Record<CampoContacto, string>;
type ErroresContacto = Partial<Record<CampoContacto, string>>;
type CamposTocados = Partial<Record<CampoContacto, boolean>>;

const VALORES_INICIALES: ValoresContacto = {
  nombre: "",
  correo: "",
  mensaje: "",
};

const CAMPOS: CampoContacto[] = ["nombre", "correo", "mensaje"];

function validarCampo(campo: CampoContacto, valor: string): string {
  const limpio = valor.trim();

  if (!limpio) {
    if (campo === "nombre") return "El nombre es obligatorio. Escribe cómo te llamas.";
    if (campo === "correo") return "El correo es obligatorio. Escribe tu correo electrónico.";
    return "El mensaje es obligatorio. Cuéntanos en qué podemos ayudarte.";
  }

  if (campo === "nombre" && limpio.length < 3) {
    return "El nombre debe tener al menos 3 caracteres.";
  }

  if (campo === "correo" && !esCorreoValido(limpio)) {
    return "Ingresa un correo válido, por ejemplo: nombre@correo.cl";
  }

  if (campo === "mensaje" && limpio.length < 10) {
    return "El mensaje debe tener al menos 10 caracteres para que podamos ayudarte.";
  }

  if (campo === "mensaje" && limpio.length > 500) {
    return "El mensaje no puede superar los 500 caracteres.";
  }

  return "";
}

function FormularioContacto() {
  const [valores, setValores] = useState<ValoresContacto>(VALORES_INICIALES);
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [tocados, setTocados] = useState<CamposTocados>({});
  const [intentoEnviar, setIntentoEnviar] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const nombreRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const mensajeRef = useRef<HTMLTextAreaElement>(null);

  const tieneErrores = CAMPOS.some((campo) => Boolean(errores[campo]));
  const mostrarError = (campo: CampoContacto) => Boolean(tocados[campo] && errores[campo]);

  const validarTodos = (): ErroresContacto => {
    const nuevosErrores: ErroresContacto = {};
    CAMPOS.forEach((campo) => {
      const error = validarCampo(campo, valores[campo]);
      if (error) nuevosErrores[campo] = error;
    });
    return nuevosErrores;
  };

  const handleChange = (campo: CampoContacto, valor: string) => {
    setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    setEnviado(false);
    setIntentoEnviar(false);

    if (tocados[campo]) {
      setErrores((anteriores) => ({
        ...anteriores,
        [campo]: validarCampo(campo, valor),
      }));
    }
  };

  const handleBlur = (campo: CampoContacto) => {
    setTocados((anteriores) => ({ ...anteriores, [campo]: true }));
    setErrores((anteriores) => ({
      ...anteriores,
      [campo]: validarCampo(campo, valores[campo]),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nuevosErrores = validarTodos();

    setErrores(nuevosErrores);
    setTocados({ nombre: true, correo: true, mensaje: true });
    setIntentoEnviar(true);
    setEnviado(false);

    const primerCampoConError = CAMPOS.find((campo) => nuevosErrores[campo]);
    if (primerCampoConError) {
      if (primerCampoConError === "nombre") nombreRef.current?.focus();
      if (primerCampoConError === "correo") correoRef.current?.focus();
      if (primerCampoConError === "mensaje") mensajeRef.current?.focus();
      return;
    }

    try {
      await enviarContacto({
        nombre: valores.nombre.trim(),
        email: valores.correo.trim(),
        asunto: "Consulta general",
        mensaje: valores.mensaje.trim(),
      });
      setEnviado(true);
      setValores(VALORES_INICIALES);
      setTocados({});
      setIntentoEnviar(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo enviar el mensaje");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="panel-formulario"
    >
      <p className="small mb-3 texto-tenue">
        Los campos marcados con <span className="obligatorio">*</span> son obligatorios.
      </p>

      {intentoEnviar && tieneErrores && (
        <Alerta tipo="error">Revisa los campos marcados en rojo antes de enviar el mensaje.</Alerta>
      )}

      <CampoFormulario
        id="contacto-nombre"
        etiqueta="Nombre"
        obligatorio
        valor={valores.nombre}
        onCambio={(valor) => handleChange("nombre", valor)}
        onDesenfoque={() => handleBlur("nombre")}
        error={mostrarError("nombre") ? errores.nombre : undefined}
        placeholder="Tu nombre y apellido"
        autoComplete="name"
        refInput={nombreRef}
      />

      <CampoFormulario
        id="contacto-correo"
        etiqueta="Correo"
        obligatorio
        tipo="email"
        valor={valores.correo}
        onCambio={(valor) => handleChange("correo", valor)}
        onDesenfoque={() => handleBlur("correo")}
        error={mostrarError("correo") ? errores.correo : undefined}
        placeholder="nombre@correo.cl"
        autoComplete="email"
        refInput={correoRef}
      />

      <CampoFormulario
        id="contacto-mensaje"
        etiqueta="Mensaje"
        obligatorio
        multilinea
        filas={4}
        valor={valores.mensaje}
        onCambio={(valor) => handleChange("mensaje", valor)}
        onDesenfoque={() => handleBlur("mensaje")}
        error={mostrarError("mensaje") ? errores.mensaje : undefined}
        placeholder="Cuéntanos qué instrumento buscas o qué duda tienes."
        ayuda="Mínimo 10 caracteres."
        maxLength={500}
        refTextarea={mensajeRef}
      />

      <button type="submit" className="btn btn-sonido w-100">
        Enviar
      </button>

      {enviado && (
        <Alerta tipo="exito" className="mt-3 mb-0">
          ¡Mensaje enviado correctamente! Te responderemos a la brevedad.
        </Alerta>
      )}
    </form>
  );
}

export default FormularioContacto;