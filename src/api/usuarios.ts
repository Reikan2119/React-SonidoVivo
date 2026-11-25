import { API, leerError } from "./config";

export interface UsuarioAPI {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string | null;
  direccion?: string | null;
  rol: string;
  activo: boolean;
  fechaRegistro?: string;
}

export async function registrarUsuario(datos: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: string;
}): Promise<UsuarioAPI> {
  const r = await fetch(`${API}/usuarios/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!r.ok) throw new Error(await leerError(r, "No se pudo registrar el usuario"));
  return r.json();
}

export async function actualizarUsuario(id: number, cambios: {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  direccion?: string;
}): Promise<UsuarioAPI> {
  const r = await fetch(`${API}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cambios),
  });
  if (!r.ok) throw new Error(await leerError(r, "No se pudo actualizar el perfil"));
  return r.json();
}
export async function loginUsuario(email: string, password: string): Promise<UsuarioAPI> {
  const r = await fetch(`${API}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (r.status === 401 || r.status === 404) {
    throw new Error("Correo o contraseña incorrectos");
  }
  if (!r.ok) throw new Error(await leerError(r, "No se pudo iniciar sesión"));
  return r.json();
}