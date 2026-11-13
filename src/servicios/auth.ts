import type { CambiosUsuario, Usuario } from "../tipos/usuario";

const KEY = "usuarios";
const SESSION = "usuarioActivo";

function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

function emitirCambioSesion(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("sesion-updated"));
  }
}

export function getUsuarios(): Usuario[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function registrarUsuario(usuario: Usuario): void {
  const usuarios = getUsuarios();
  usuarios.push({ ...usuario, email: normalizarEmail(usuario.email) });
  localStorage.setItem(KEY, JSON.stringify(usuarios));
}

export function existeUsuario(email: string): boolean {
  const buscado = normalizarEmail(email);
  return getUsuarios().some((usuario) => normalizarEmail(usuario.email) === buscado);
}

export function loginUsuario(email: string, password: string): Usuario | null {
  const buscado = normalizarEmail(email);
  return (
    getUsuarios().find(
      (usuario) => normalizarEmail(usuario.email) === buscado && usuario.password === password,
    ) || null
  );
}

export function setSesion(usuario: Usuario): void {
  localStorage.setItem(SESSION, JSON.stringify(usuario));
  emitirCambioSesion();
}

export function getSesion(): Usuario | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION) || "null");
  } catch {
    return null;
  }
}

export function cerrarSesion(): void {
  localStorage.removeItem(SESSION);
  emitirCambioSesion();
}

export function actualizarUsuario(email: string, cambios: CambiosUsuario): boolean {
  const usuarios = getUsuarios();
  const buscado = normalizarEmail(email);
  const indice = usuarios.findIndex((usuario) => normalizarEmail(usuario.email) === buscado);

  if (indice === -1) return false;

  usuarios[indice] = { ...usuarios[indice], ...cambios };
  localStorage.setItem(KEY, JSON.stringify(usuarios));

  const sesion = getSesion();
  if (sesion && normalizarEmail(sesion.email) === buscado) {
    setSesion(usuarios[indice]);
  }

  return true;
}
