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

export function registrarUsuario(u: Usuario) {
  const usuarios = getUsuarios();
  usuarios.push(u);
  localStorage.setItem(KEY, JSON.stringify(usuarios));
}

export function loginUsuario(email: string, password: string): Usuario | null {
  const usuarios = getUsuarios();
  return usuarios.find((u) => u.email === email && u.password === password) || null;
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
  const idx = usuarios.findIndex((u) => u.email === email);
  if (idx === -1) return false;
  usuarios[idx] = { ...usuarios[idx], ...cambios };
  localStorage.setItem(KEY, JSON.stringify(usuarios));
  const sesion = getSesion();
  if (sesion && sesion.email === email) {
    setSesion(usuarios[idx]);
  }
  return true;
}

function Login() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <h1 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Iniciar sesión</h1>
              <FormularioLogin />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
