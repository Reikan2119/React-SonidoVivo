import { useRef, useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario, setSesion } from "../../servicios/auth";
import { esCorreoValido } from "../../utilidades/validacion";

type CampoLogin = "email" | "password";
type ErroresLogin = Partial<Record<CampoLogin, string>>;
type CamposTocados = Partial<Record<CampoLogin, boolean>>;

function validarCampo(campo: CampoLogin, valor: string): string {
  if (campo === "email") {
    if (!valor.trim()) return "El correo electrónico es obligatorio.";
    if (!esCorreoValido(valor)) return "Ingresa un correo válido, por ejemplo: nombre@correo.cl";
    return "";
  }

  if (!valor) return "La contraseña es obligatoria.";
  return "";
}

function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<ErroresLogin>({});
  const [tocados, setTocados] = useState<CamposTocados>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mostrarError = (campo: CampoLogin) => Boolean(tocados[campo] && errores[campo]);
  const claseCampo = (campo: CampoLogin) =>
    `form-control${mostrarError(campo) ? " is-invalid campo-error" : ""}`;

  const handleChange = (campo: CampoLogin, valor: string) => {
    if (campo === "email") setEmail(valor);
    else setPassword(valor);

    setError("");

    if (tocados[campo]) {
      setErrores((anteriores) => ({ ...anteriores, [campo]: validarCampo(campo, valor) }));
    }
  };

  const handleBlur = (campo: CampoLogin) => {
    setTocados((anteriores) => ({ ...anteriores, [campo]: true }));
    setErrores((anteriores) => ({
      ...anteriores,
      [campo]: validarCampo(campo, campo === "email" ? email : password),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevosErrores: ErroresLogin = {
      email: validarCampo("email", email),
      password: validarCampo("password", password),
    };

    setErrores(nuevosErrores);
    setTocados({ email: true, password: true });
    setError("");

    if (nuevosErrores.email) {
      emailRef.current?.focus();
      return;
    }

    if (nuevosErrores.password) {
      passwordRef.current?.focus();
      return;
    }

    const emailLimpio = email.trim().toLowerCase();

    if (emailLimpio === "admin@sonidovivo.com" && password === "admin123") {
      setSesion({ nombre: "Admin", apellido: "", email: emailLimpio, password, rol: "admin" });
      navigate("/admin");
      return;
    }

    const u = loginUsuario(emailLimpio, password);
    if (u) {
      setSesion(u);
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card p-4"
      style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}
    >
      <div className="mb-3">
        <label className="form-label" htmlFor="login-email">
          Correo electrónico <span style={{ color: "#ff9b91" }}>*</span>
        </label>
        <input
          id="login-email"
          ref={emailRef}
          type="email"
          className={claseCampo("email")}
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={mostrarError("email")}
          aria-describedby={mostrarError("email") ? "error-login-email" : undefined}
          placeholder="nombre@correo.cl"
          autoComplete="email"
        />
        {mostrarError("email") && (
          <p id="error-login-email" className="mensaje-error mt-1 mb-0" role="alert">
            {errores.email}
          </p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="login-password">
          Contraseña <span style={{ color: "#ff9b91" }}>*</span>
        </label>
        <input
          id="login-password"
          ref={passwordRef}
          type="password"
          className={claseCampo("password")}
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          aria-invalid={mostrarError("password")}
          aria-describedby={mostrarError("password") ? "error-login-password" : undefined}
          autoComplete="current-password"
        />
        {mostrarError("password") && (
          <p id="error-login-password" className="mensaje-error mt-1 mb-0" role="alert">
            {errores.password}
          </p>
        )}
      </div>

      {error && (
        <p className="mensaje-error mb-3" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
        Entrar
      </button>
      <p className="text-center mt-3 mb-0">
        ¿No tienes cuenta? <Link to="/registro" style={{ color: "#d98e2f" }}>Regístrate</Link>
      </p>
    </form>
  );
}

export default FormularioLogin;
