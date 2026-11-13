import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { existeUsuario, registrarUsuario } from "../../paginas/paginaLogin";
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
  const claseCampo = (campo: CampoRegistro) =>
    `form-control${mostrarError(campo) ? " is-invalid campo-error" : ""}`;
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
        <div
          className="alert py-2 px-3 mb-3"
          role="alert"
          style={{ backgroundColor: "#3a1f1f", border: "1px solid #dc3545", color: "#ffb3b3" }}
        >
          Revisa los campos marcados en rojo para completar tu registro.
        </div>
      )}

      <div className="row">
        <div className="col-12 col-sm-6 mb-3">
          <label className="form-label" htmlFor="registro-nombre">
            Nombre <span style={{ color: "#ff9b91" }}>*</span>
          </label>
          <input
            id="registro-nombre"
            ref={nombreRef}
            type="text"
            className={claseCampo("nombre")}
            value={valores.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            onBlur={() => handleBlur("nombre")}
            aria-invalid={mostrarError("nombre")}
            aria-describedby={mostrarError("nombre") ? "error-registro-nombre" : undefined}
            autoComplete="given-name"
          />
          {mostrarError("nombre") && (
            <p id="error-registro-nombre" className="mensaje-error mt-1 mb-0" role="alert">
              {errores.nombre}
            </p>
          )}
        </div>

        <div className="col-12 col-sm-6 mb-3">
          <label className="form-label" htmlFor="registro-apellido">
            Apellido <span style={{ color: "#ff9b91" }}>*</span>
          </label>
          <input
            id="registro-apellido"
            ref={apellidoRef}
            type="text"
            className={claseCampo("apellido")}
            value={valores.apellido}
            onChange={(e) => handleChange("apellido", e.target.value)}
            onBlur={() => handleBlur("apellido")}
            aria-invalid={mostrarError("apellido")}
            aria-describedby={mostrarError("apellido") ? "error-registro-apellido" : undefined}
            autoComplete="family-name"
          />
          {mostrarError("apellido") && (
            <p id="error-registro-apellido" className="mensaje-error mt-1 mb-0" role="alert">
              {errores.apellido}
            </p>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="registro-email">
          Correo electrónico <span style={{ color: "#ff9b91" }}>*</span>
        </label>
        <input
          id="registro-email"
          ref={emailRef}
          type="email"
          className={claseCampo("email")}
          value={valores.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={mostrarError("email")}
          aria-describedby={mostrarError("email") ? "error-registro-email" : undefined}
          placeholder="nombre@correo.cl"
          autoComplete="email"
        />
        {mostrarError("email") && (
          <p id="error-registro-email" className="mensaje-error mt-1 mb-0" role="alert">
            {errores.email}
          </p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="registro-password">
          Contraseña <span style={{ color: "#ff9b91" }}>*</span>
        </label>
        <input
          id="registro-password"
          ref={passwordRef}
          type="password"
          className={claseCampo("password")}
          value={valores.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          aria-invalid={mostrarError("password")}
          aria-describedby={mostrarError("password") ? "error-registro-password" : "ayuda-registro-password"}
          autoComplete="new-password"
        />
        {mostrarError("password") ? (
          <p id="error-registro-password" className="mensaje-error mt-1 mb-0" role="alert">
            {errores.password}
          </p>
        ) : (
          <span id="ayuda-registro-password" className="small" style={{ color: "#c9bca8" }}>
            Usa al menos 6 caracteres.
          </span>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="registro-password2">
          Repetir contraseña <span style={{ color: "#ff9b91" }}>*</span>
        </label>
        <input
          id="registro-password2"
          ref={password2Ref}
          type="password"
          className={claseCampo("password2")}
          value={valores.password2}
          onChange={(e) => handleChange("password2", e.target.value)}
          onBlur={() => handleBlur("password2")}
          aria-invalid={mostrarError("password2")}
          aria-describedby={mostrarError("password2") ? "error-registro-password2" : undefined}
          autoComplete="new-password"
        />
        {mostrarError("password2") && (
          <p id="error-registro-password2" className="mensaje-error mt-1 mb-0" role="alert">
            {errores.password2}
          </p>
        )}
      </div>

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
