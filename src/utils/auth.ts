export interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
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