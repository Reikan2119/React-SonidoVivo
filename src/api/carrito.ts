// Llamadas al microservicio de carrito (a través del Gateway).
// El carrito se guarda en MySQL por usuario: no se pierde al cerrar el navegador ni al cambiar de equipo.
import { API, leerError } from "./config";

export interface ItemCarrito {
  productoId: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  subtotal: number;
}

export interface CarritoDatos {
  usuarioId: number;
  items: ItemCarrito[];
  total: number;
}

async function pedir(url: string, opciones?: RequestInit): Promise<CarritoDatos> {
  const respuesta = opciones ? await fetch(url, opciones) : await fetch(url);
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta, "No se pudo actualizar el carrito"));
  }
  return respuesta.json();
}

export function obtenerCarrito(usuarioId: number) {
  return pedir(`${API}/carrito/${usuarioId}`);
}

export function agregarAlCarrito(usuarioId: number, productoId: number, cantidad = 1) {
  return pedir(`${API}/carrito/${usuarioId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productoId, cantidad }),
  });
}

export function cambiarCantidad(usuarioId: number, productoId: number, cantidad: number) {
  return pedir(`${API}/carrito/${usuarioId}/items/${productoId}?cantidad=${cantidad}`, { method: "PUT" });
}

export function quitarDelCarrito(usuarioId: number, productoId: number) {
  return pedir(`${API}/carrito/${usuarioId}/items/${productoId}`, { method: "DELETE" });
}

export async function vaciarCarrito(usuarioId: number) {
  const respuesta = await fetch(`${API}/carrito/${usuarioId}`, { method: "DELETE" });
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta, "No se pudo vaciar el carrito"));
  }
}

export function cantidadesPorProducto(carrito: CarritoDatos | null): Record<number, number> {
  const cantidades: Record<number, number> = {};
  carrito?.items.forEach((item) => {
    cantidades[item.productoId] = item.cantidad;
  });
  return cantidades;
}
