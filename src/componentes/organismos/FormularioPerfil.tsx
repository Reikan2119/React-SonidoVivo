import { useRef, useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../atomos/Alerta";
import CampoFormulario from "../moleculas/CampoFormulario";
import { getSesion, actualizarUsuario } from "../../paginas/paginaLogin";

type CampoPerfil = "nombre" | "password" | "password2";
type ErroresPerfil = Partial<Record<CampoPerfil, string>>;
type CamposTocados = Partial<Record<CampoPerfil, boolean>>;

function FormularioPerfil() {
  const navigate = useNavigate();
  const sesion = getSesion();
  const [nombre, setNombre] = useState(sesion?.nombre || "");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errores, setErrores] = useState<ErroresPerfil>({});
  const [tocados, setTocados] = useState<CamposTocados>({});
  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState(false);

  const nombreRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!sesion) navigate("/login");
  }, [sesion, navigate]);

  if (!sesion) return null;

  const mostrarError = (campo: CampoPerfil) => Boolean(tocados[campo] && errores[campo]);

  const validarCampo = (
    campo: CampoPerfil,
    valoresActuales = { nombre, password, password2 },
  ): string => {
    if (campo === "nombre") {
      if (!valoresActuales.nombre.trim()) return "El nombre es obligatorio.";
      if (valoresActuales.nombre.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
    }

    if (campo === "password") {
      if (!valoresActuales.password && valoresActuales.password2) return "Escribe primero la nueva contraseña.";
      if (valoresActuales.password && valoresActuales.password.length < 6) {
        return "La nueva contraseña debe tener al menos 6 caracteres.";
      }
    }

    if (campo === "password2") {
      if (valoresActuales.password && !valoresActuales.password2) return "Repite la nueva contraseña.";
      if (
        valoresActuales.password &&
        valoresActuales.password2 &&
        valoresActuales.password !== valoresActuales.password2
      ) {
        return "Las contraseñas no coinciden.";
      }
    }

    return "";
  };

  const handleChange = (campo: CampoPerfil, valor: string) => {
    const nuevosValores = {
      nombre: campo === "nombre" ? valor : nombre,
      password: campo === "password" ? valor : password,
      password2: campo === "password2" ? valor : password2,
    };

    if (campo === "nombre") setNombre(valor);
    if (campo === "password") setPassword(valor);
    if (campo === "password2") setPassword2(valor);

    setMensaje("");

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

  const handleBlur = (campo: CampoPerfil) => {
    setTocados((anteriores) => ({ ...anteriores, [campo]: true }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: validarCampo(campo) }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nuevosErrores: ErroresPerfil = {
      nombre: validarCampo("nombre"),
      password: validarCampo("password"),
      password2: validarCampo("password2"),
    };

    setErrores(nuevosErrores);
    setTocados({ nombre: true, password: true, password2: true });
    setMensaje("");
    setMensajeError(false);

    if (nuevosErrores.nombre) {
      nombreRef.current?.focus();
      return;
    }

    if (nuevosErrores.password) {
      passwordRef.current?.focus();
      return;
    }

    if (nuevosErrores.password2) {
      password2Ref.current?.focus();
      return;
    }

    const cambios: { nombre?: string; password?: string } = { nombre: nombre.trim() };
    if (password) cambios.password = password;

    const actualizado = actualizarUsuario(sesion.email, cambios);
    if (!actualizado) {
      setMensaje("No se pudo actualizar el perfil. Vuelve a iniciar sesión.");
      setMensajeError(true);
      return;
    }

    setMensaje("Perfil actualizado correctamente.");
    setMensajeError(false);
    setPassword("");
    setPassword2("");
    setErrores({});
    setTocados({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card p-4"
      style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}
    >
      <h1 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Mi Perfil</h1>

      <p className="small mb-3" style={{ color: "#c9bca8" }}>
        El nombre es obligatorio. La contraseña solo se cambia si completas los dos campos.
      </p>

      <CampoFormulario
        id="perfil-nombre"
        etiqueta="Nombre"
        obligatorio
        valor={nombre}
        onCambio={(valor) => handleChange("nombre", valor)}
        onDesenfoque={() => handleBlur("nombre")}
        error={mostrarError("nombre") ? errores.nombre : undefined}
        autoComplete="name"
        refInput={nombreRef}
      />

      <CampoFormulario
        id="perfil-password"
        etiqueta="Nueva contraseña (opcional)"
        tipo="password"
        valor={password}
        onCambio={(valor) => handleChange("password", valor)}
        onDesenfoque={() => handleBlur("password")}
        error={mostrarError("password") ? errores.password : undefined}
        ayuda="Mínimo 6 caracteres."
        autoComplete="new-password"
        refInput={passwordRef}
      />

      <CampoFormulario
        id="perfil-password2"
        etiqueta="Repetir contraseña"
        tipo="password"
        valor={password2}
        onCambio={(valor) => handleChange("password2", valor)}
        onDesenfoque={() => handleBlur("password2")}
        error={mostrarError("password2") ? errores.password2 : undefined}
        autoComplete="new-password"
        refInput={password2Ref}
      />

      {mensaje && <Alerta tipo={mensajeError ? "error" : "exito"}>{mensaje}</Alerta>}

      <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
        Guardar cambios
      </button>
    </form>
  );
}

export default FormularioPerfil;
