import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../atomos/Alerta";
import CampoFormulario from "../moleculas/CampoFormulario";
import { existeUsuario, registrarUsuario } from "../../servicios/auth";
import { esCorreoValido } from "../../utilidades/validacion";

type CampoRegistro = "nombre" | "apellido" | "email" | "password" | "password2";
type ValoresRegistro = Record<CampoRegistro, string>;
type ErroresRegistro = Partial<Record<CampoRegistro, string>>;
type CamposTocados = Partial<Record<CampoRegistro, boolean>>;

const VALORES_INICIALES: ValoresRegistro = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  password2: "",
};

const CAMPOS: CampoRegistro[] = ["nombre", "apellido", "email", "password", "password2"];

function validarCampo(campo: CampoRegistro, valores: ValoresRegistro): string {
  const valor = valores[campo];

  if (campo === "nombre") {
    if (!valor.trim()) return "El nombre es obligatorio.";
    if (valor.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
  }

  if (campo === "apellido") {
    if (!valor.trim()) return "El apellido es obligatorio.";
    if (valor.trim().length < 2) return "El apellido debe tener al menos 2 caracteres.";
  }

  if (campo === "email") {
    if (!valor.trim()) return "El correo electrónico es obligatorio.";
    if (!esCorreoValido(valor)) return "Ingresa un correo válido, por ejemplo: nombre@correo.cl";
  }

  if (campo === "password") {
    if (!valor) return "La contraseña es obligatoria.";
    if (valor.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
  }

  if (campo === "password2") {
    if (!valor) return "Repite la contraseña.";
    if (valor !== valores.password) return "Las contraseñas no coinciden.";
  }

  return "";
}

function FormularioRegistro() {
  const [valores, setValores] = useState<ValoresRegistro>(VALORES_INICIALES);
  const [errores, setErrores] = useState<ErroresRegistro>({});
  const [tocados, setTocados] = useState<CamposTocados>({});
  const [intentoEnviar, setIntentoEnviar] = useState(false);
  const navigate = useNavigate();

  const nombreRef = useRef<HTMLInputElement>(null);
  const apellidoRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const mostrarError = (campo: CampoRegistro) => Boolean(tocados[campo] && errores[campo]);
  const tieneErrores = CAMPOS.some((campo) => Boolean(errores[campo]));

  const validarTodos = (valoresActuales: ValoresRegistro): ErroresRegistro => {
    const nuevosErrores: ErroresRegistro = {};
    CAMPOS.forEach((campo) => {
      const error = validarCampo(campo, valoresActuales);
      if (error) nuevosErrores[campo] = error;
    });
    return nuevosErrores;
  };

  const handleChange = (campo: CampoRegistro, valor: string) => {
    const nuevosValores = { ...valores, [campo]: valor };
    setValores(nuevosValores);
    setIntentoEnviar(false);

    if (tocados[campo] || (campo === "password" && tocados.password2)) {
      setErrores((anteriores) => {
        const nuevosErrores = { ...anteriores };

        if (tocados[campo]) {
          nuevosErrores[campo] = validarCampo(campo, nuevosValores);
        }

        if (campo === "password" && tocados.password2) {
          nuevosErrores.password2 = validarCampo("password2", nuevosValores);
        }

        return nuevosErrores;
      });
    }
  };

  const handleBlur = (campo: CampoRegistro) => {
    setTocados((anteriores) => ({ ...anteriores, [campo]: true }));
    setErrores((anteriores) => ({
      ...anteriores,
      [campo]: validarCampo(campo, valores),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevosErrores = validarTodos(valores);
    const emailLimpio = valores.email.trim().toLowerCase();

    if (!nuevosErrores.email && existeUsuario(emailLimpio)) {
      nuevosErrores.email = "Ya existe una cuenta registrada con este correo. Inicia sesión.";
    }

    setErrores(nuevosErrores);
    setTocados({ nombre: true, apellido: true, email: true, password: true, password2: true });
    setIntentoEnviar(true);

    const primerCampoConError = CAMPOS.find((campo) => nuevosErrores[campo]);
    if (primerCampoConError) {
      if (primerCampoConError === "nombre") nombreRef.current?.focus();
      if (primerCampoConError === "apellido") apellidoRef.current?.focus();
      if (primerCampoConError === "email") emailRef.current?.focus();
      if (primerCampoConError === "password") passwordRef.current?.focus();
      if (primerCampoConError === "password2") password2Ref.current?.focus();
      return;
    }

    registrarUsuario({
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      email: emailLimpio,
      password: valores.password,
    });

    navigate("/login", { state: { registrado: true } });
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
        <Alerta tipo="error">Revisa los campos marcados en rojo para completar tu registro.</Alerta>
      )}

      <div className="row">
        <div className="col-12 col-sm-6">
          <CampoFormulario
            id="registro-nombre"
            etiqueta="Nombre"
            obligatorio
            valor={valores.nombre}
            onCambio={(valor) => handleChange("nombre", valor)}
            onDesenfoque={() => handleBlur("nombre")}
            error={mostrarError("nombre") ? errores.nombre : undefined}
            autoComplete="given-name"
            refInput={nombreRef}
          />
        </div>

        <div className="col-12 col-sm-6">
          <CampoFormulario
            id="registro-apellido"
            etiqueta="Apellido"
            obligatorio
            valor={valores.apellido}
            onCambio={(valor) => handleChange("apellido", valor)}
            onDesenfoque={() => handleBlur("apellido")}
            error={mostrarError("apellido") ? errores.apellido : undefined}
            autoComplete="family-name"
            refInput={apellidoRef}
          />
        </div>
      </div>

      <CampoFormulario
        id="registro-email"
        etiqueta="Correo electrónico"
        obligatorio
        tipo="email"
        valor={valores.email}
        onCambio={(valor) => handleChange("email", valor)}
        onDesenfoque={() => handleBlur("email")}
        error={mostrarError("email") ? errores.email : undefined}
        placeholder="nombre@correo.cl"
        autoComplete="email"
        refInput={emailRef}
      />

      <CampoFormulario
        id="registro-password"
        etiqueta="Contraseña"
        obligatorio
        tipo="password"
        valor={valores.password}
        onCambio={(valor) => handleChange("password", valor)}
        onDesenfoque={() => handleBlur("password")}
        error={mostrarError("password") ? errores.password : undefined}
        ayuda="Usa al menos 6 caracteres."
        autoComplete="new-password"
        refInput={passwordRef}
      />

      <CampoFormulario
        id="registro-password2"
        etiqueta="Repetir contraseña"
        obligatorio
        tipo="password"
        valor={valores.password2}
        onCambio={(valor) => handleChange("password2", valor)}
        onDesenfoque={() => handleBlur("password2")}
        error={mostrarError("password2") ? errores.password2 : undefined}
        autoComplete="new-password"
        refInput={password2Ref}
      />

      <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
        Registrarse
      </button>
      <p className="text-center mt-3 mb-0">
        ¿Ya tienes cuenta? <Link to="/login" style={{ color: "#d98e2f" }}>Inicia sesión</Link>
      </p>
    </form>
  );
}

export default FormularioRegistro;
