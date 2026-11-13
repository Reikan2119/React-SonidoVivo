import { useRef, useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getSesion, actualizarUsuario } from "./paginaLogin";

type CampoPerfil = "nombre" | "password" | "password2";
type ErroresPerfil = Partial<Record<CampoPerfil, string>>;
type CamposTocados = Partial<Record<CampoPerfil, boolean>>;

function Perfil() {
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
  const claseCampo = (campo: CampoPerfil) =>
    `form-control${mostrarError(campo) ? " is-invalid campo-error" : ""}`;

  const validarCampo = (campo: CampoPerfil, valoresActuales = { nombre, password, password2 }): string => {
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
      if (valoresActuales.password && valoresActuales.password2 && valoresActuales.password !== valoresActuales.password2) {
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
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
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

                <div className="mb-3">
                  <label className="form-label" htmlFor="perfil-nombre">
                    Nombre <span style={{ color: "#ff9b91" }}>*</span>
                  </label>
                  <input
                    id="perfil-nombre"
                    ref={nombreRef}
                    type="text"
                    className={claseCampo("nombre")}
                    value={nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    onBlur={() => handleBlur("nombre")}
                    aria-invalid={mostrarError("nombre")}
                    aria-describedby={mostrarError("nombre") ? "error-perfil-nombre" : undefined}
                    autoComplete="name"
                  />
                  {mostrarError("nombre") && (
                    <p id="error-perfil-nombre" className="mensaje-error mt-1 mb-0" role="alert">
                      {errores.nombre}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="perfil-password">
                    Nueva contraseña (opcional)
                  </label>
                  <input
                    id="perfil-password"
                    ref={passwordRef}
                    type="password"
                    className={claseCampo("password")}
                    value={password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    aria-invalid={mostrarError("password")}
                    aria-describedby={mostrarError("password") ? "error-perfil-password" : "ayuda-perfil-password"}
                    autoComplete="new-password"
                  />
                  {mostrarError("password") ? (
                    <p id="error-perfil-password" className="mensaje-error mt-1 mb-0" role="alert">
                      {errores.password}
                    </p>
                  ) : (
                    <span id="ayuda-perfil-password" className="small" style={{ color: "#c9bca8" }}>
                      Mínimo 6 caracteres.
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="perfil-password2">
                    Repetir contraseña
                  </label>
                  <input
                    id="perfil-password2"
                    ref={password2Ref}
                    type="password"
                    className={claseCampo("password2")}
                    value={password2}
                    onChange={(e) => handleChange("password2", e.target.value)}
                    onBlur={() => handleBlur("password2")}
                    aria-invalid={mostrarError("password2")}
                    aria-describedby={mostrarError("password2") ? "error-perfil-password2" : undefined}
                    autoComplete="new-password"
                  />
                  {mostrarError("password2") && (
                    <p id="error-perfil-password2" className="mensaje-error mt-1 mb-0" role="alert">
                      {errores.password2}
                    </p>
                  )}
                </div>

                {mensaje && (
                  <p
                    role={mensajeError ? "alert" : "status"}
                    className="mt-1 mb-3"
                    style={{ color: mensajeError ? "#ff9b91" : "#b9f6ca" }}
                  >
                    {mensaje}
                  </p>
                )}

                <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Perfil;
