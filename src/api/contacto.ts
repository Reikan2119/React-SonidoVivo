import { API, leerError } from "./config";

export interface Contacto {
  id: number;
  nombre: string;
  email: string;
  telefono?: string | null;
  asunto: string;
  mensaje: string;
  estado: string;
  fechaEnvio: string;
}

export async function enviarContacto(datos: {
  nombre: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
}): Promise<Contacto> {
  const r = await fetch(`${API}/contactos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!r.ok) throw new Error(await leerError(r, "No se pudo enviar el mensaje"));
  return r.json();
}

export async function listarContactos(): Promise<Contacto[]> {
  const r = await fetch(`${API}/contactos`);
  if (!r.ok) throw new Error(await leerError(r, "No se pudieron cargar los mensajes"));
  return r.json();
}

export async function cambiarEstadoContacto(id: number, estado: string): Promise<Contacto> {
  const r = await fetch(`${API}/contactos/${id}/estado?estado=${encodeURIComponent(estado)}`, { method: "PUT" });
  if (!r.ok) throw new Error(await leerError(r, "No se pudo cambiar el estado"));
  return r.json();
}