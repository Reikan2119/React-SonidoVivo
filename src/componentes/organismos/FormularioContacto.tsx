import { useRef, useState, type FormEvent } from "react";
import { esCorreoValido } from "../../utilidades/validacion";

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

  const claseCampo = (campo: CampoContacto) =>
    `form-control${mostrarError(campo) ? " is-invalid campo-error" : ""}`;

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    setEnviado(true);
    setValores(VALORES_INICIALES);
    setTocados({});
    setIntentoEnviar(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card p-4"
      style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}
    >
      <p className="small mb-3" style={{ color: "#c9bca8" }}>
        Los campos marcados con <span style={{ color: "#ff9b91" }}>*</span> son obligatorios.
      </p>

      {intentoEnviar && tieneErrores && (
        <div
          className="alert py-2 px-3 mb-3"
          role="alert"
          style={{ backgroundColor: "#3a1f1f", border: "1px solid #dc3545", color: "#ffb3b3" }}
        >
          Revisa los campos marcados en rojo antes de enviar el mensaje.
        </div>
      )}

      <div className="mb-3">
        <label className="form-label" htmlFor="contacto-nombre">
          Nombre <span style={{ color: "#ff9b91" }}>*</span>
        </label>
        <input
          id="contacto-nombre"
          ref={nombreRef}
          type="text"
          className={claseCampo("nombre")}
          value={valores.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
          onBlur={() => handleBlur("nombre")}
          aria-invalid={mostrarError("nombre")}
          aria-describedby={mostrarError("nombre") ? "error-contacto-nombre" : undefined}
          placeholder="Tu nombre y apellido"
          autoComplete="name"
        />
        {mostrarError("nombre") && (
          <p id="error-contacto-nombre" className="mensaje-error mt-1 mb-0" role="alert">
            {errores.nombre}
          </p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="contacto-correo">
          Correo <span style={{ color: "#ff9b91" }}>*</span>
        </label>
        <input
          id="contacto-correo"
          ref={correoRef}
          type="email"
          className={claseCampo("correo")}
          value={valores.correo}
          onChange={(e) => handleChange("correo", e.target.value)}
          onBlur={() => handleBlur("correo")}
          aria-invalid={mostrarError("correo")}
          aria-describedby={mostrarError("correo") ? "error-contacto-correo" : undefined}
          placeholder="nombre@correo.cl"
          autoComplete="email"
        />
        {mostrarError("correo") && (
          <p id="error-contacto-correo" className="mensaje-error mt-1 mb-0" role="alert">
            {errores.correo}
          </p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="contacto-mensaje">
          Mensaje <span style={{ color: "#ff9b91" }}>*</span>
        </label>
        <textarea
          id="contacto-mensaje"
          ref={mensajeRef}
          className={claseCampo("mensaje")}
          rows={4}
          value={valores.mensaje}
          onChange={(e) => handleChange("mensaje", e.target.value)}
          onBlur={() => handleBlur("mensaje")}
          aria-invalid={mostrarError("mensaje")}
          aria-describedby={mostrarError("mensaje") ? "error-contacto-mensaje" : "contador-contacto-mensaje"}
          placeholder="Cuéntanos qué instrumento buscas o qué duda tienes."
          maxLength={500}
        />
        <div className="d-flex justify-content-between align-items-start gap-3">
          {mostrarError("mensaje") ? (
            <p id="error-contacto-mensaje" className="mensaje-error mt-1 mb-0" role="alert">
              {errores.mensaje}
            </p>
          ) : (
            <span id="contador-contacto-mensaje" className="small mt-1" style={{ color: "#c9bca8" }}>
              Mínimo 10 caracteres.
            </span>
          )}
          <span className="small mt-1" style={{ color: "#c9bca8" }}>
            {valores.mensaje.length}/500
          </span>
        </div>
      </div>

      <button type="submit" className="btn fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
        Enviar
      </button>

      {enviado && (
        <div
          className="mt-3 mb-0 py-2 px-3"
          role="status"
          style={{ backgroundColor: "#1f3d2b", border: "1px solid #4caf50", color: "#b9f6ca", borderRadius: "0.375rem" }}
        >
          ¡Mensaje enviado correctamente! Te responderemos a la brevedad.
        </div>
      )}
    </form>
  );
}

export default FormularioContacto;
