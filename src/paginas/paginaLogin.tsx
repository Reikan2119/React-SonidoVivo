import { useLocation } from "react-router-dom";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

export interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol?: string;
}

const KEY = "usuarios";
const SESSION = "usuarioActivo";

export function getUsuarios(): Usuario[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function normalizarEmail(email: string) {
  return email.trim().toLowerCase();
}

export function registrarUsuario(u: Usuario) {
  const usuarios = getUsuarios();
  usuarios.push({ ...u, email: normalizarEmail(u.email) });
  localStorage.setItem(KEY, JSON.stringify(usuarios));
}

export function existeUsuario(email: string): boolean {
  const buscado = normalizarEmail(email);
  return getUsuarios().some((u) => normalizarEmail(u.email) === buscado);
}

export function loginUsuario(email: string, password: string): Usuario | null {
  const usuarios = getUsuarios();
  const buscado = normalizarEmail(email);
  return usuarios.find((u) => normalizarEmail(u.email) === buscado && u.password === password) || null;
}

export function setSesion(u: Usuario) {
  localStorage.setItem(SESSION, JSON.stringify(u));
}

export function getSesion(): Usuario | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION) || "null");
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(SESSION);
}

export function actualizarUsuario(email: string, cambios: Partial<Usuario>) {
  const usuarios = getUsuarios();
  const buscado = normalizarEmail(email);
  const idx = usuarios.findIndex((u) => normalizarEmail(u.email) === buscado);
  if (idx === -1) return false;
  usuarios[idx] = { ...usuarios[idx], ...cambios };
  localStorage.setItem(KEY, JSON.stringify(usuarios));
  const sesion = getSesion();
  if (sesion && normalizarEmail(sesion.email) === buscado) {
    setSesion(usuarios[idx]);
  }
  return true;
}

function Login() {
  const location = useLocation();
  const registrado = Boolean((location.state as { registrado?: boolean } | null)?.registrado);

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <h1 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Iniciar sesión</h1>
              {registrado && (
                <div
                  className="alert py-2 px-3 mb-3"
                  role="status"
                  style={{ backgroundColor: "#1f3d2b", border: "1px solid #4caf50", color: "#b9f6ca" }}
                >
                  Tu cuenta fue creada correctamente. Ya puedes iniciar sesión.
                </div>
              )}
              <FormularioLogin />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
