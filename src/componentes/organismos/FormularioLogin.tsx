import { useRef, useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alerta from "../atomos/Alerta";
import CampoFormulario from "../moleculas/CampoFormulario";
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

    const usuario = loginUsuario(emailLimpio, password);
    if (usuario) {
      setSesion(usuario);
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
      <CampoFormulario
        id="login-email"
        etiqueta="Correo electrónico"
        obligatorio
        tipo="email"
        valor={email}
        onCambio={(valor) => handleChange("email", valor)}
        onDesenfoque={() => handleBlur("email")}
        error={mostrarError("email") ? errores.email : undefined}
        placeholder="nombre@correo.cl"
        autoComplete="email"
        refInput={emailRef}
      />

      <CampoFormulario
        id="login-password"
        etiqueta="Contraseña"
        obligatorio
        tipo="password"
        valor={password}
        onCambio={(valor) => handleChange("password", valor)}
        onDesenfoque={() => handleBlur("password")}
        error={mostrarError("password") ? errores.password : undefined}
        autoComplete="current-password"
        refInput={passwordRef}
      />

      {error && <Alerta tipo="error">{error}</Alerta>}

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
