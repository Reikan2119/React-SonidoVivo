

export interface UsuarioSesion {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  rol: "ADMINISTRADOR" | "VENDEDOR" | "CLIENTE";
}

const CLAVE = "usuarioActivo";

export function obtenerUsuario(): UsuarioSesion | null {
  try {
    const sesion = sessionStorage.getItem(CLAVE);
    return sesion ? JSON.parse(sesion) : null;
  } catch {
    return null;
  }
}

export function guardarUsuario(usuario: UsuarioSesion) {
  sessionStorage.setItem(CLAVE, JSON.stringify(usuario));
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE);
}

export function esAdmin(usuario: UsuarioSesion | null = obtenerUsuario()) {
  return usuario?.rol === "ADMINISTRADOR";
}

export function esVendedor(usuario: UsuarioSesion | null = obtenerUsuario()) {
  return usuario?.rol === "VENDEDOR" || usuario?.rol === "ADMINISTRADOR";
}