import { API, leerError } from "./config";

export interface ItemPedido {
  productoId: number;
  cantidad: number;
}

export interface Pedido {
  id: number;
  usuarioId: number;
  fechaPedido: string;
  estado: string;
  tipoEntrega: string;
  direccionEntrega?: string | null;
  total: number;
  items: ItemPedido[];
}

export async function crearPedido(datos: {
  usuarioId: number;
  tipoEntrega: string;
  direccionEntrega?: string;
  items: ItemPedido[];
}): Promise<Pedido> {
  const r = await fetch(`${API}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!r.ok) throw new Error(await leerError(r, "No se pudo registrar el pedido"));
  return r.json();
}

export async function listarPedidos(usuarioId?: number): Promise<Pedido[]> {
  const url = usuarioId ? `${API}/pedidos?usuarioId=${usuarioId}` : `${API}/pedidos`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(await leerError(r, "No se pudieron cargar los pedidos"));
  return r.json();
}

export async function obtenerPedido(id: number): Promise<Pedido> {
  const r = await fetch(`${API}/pedidos/${id}`);
  if (!r.ok) throw new Error(await leerError(r, "Pedido no encontrado"));
  return r.json();
}

export async function cambiarEstadoPedido(id: number, estado: string): Promise<Pedido> {
  const r = await fetch(`${API}/pedidos/${id}/estado?estado=${encodeURIComponent(estado)}`, { method: "PUT" });
  if (!r.ok) throw new Error(await leerError(r, "No se pudo cambiar el estado"));
  return r.json();
}

export async function cancelarPedido(id: number): Promise<Pedido> {
  const r = await fetch(`${API}/pedidos/${id}/cancelar`, { method: "PUT" });
  if (!r.ok) throw new Error(await leerError(r, "No se pudo cancelar el pedido"));
  return r.json();
}