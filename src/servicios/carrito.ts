import type { ItemCarrito, NuevoItemCarrito } from "../tipos/carrito";

const KEY = "carrito";
const STOCK_KEY = "stock_overrides";

function emitir(evento: string, detalle?: Record<string, unknown>): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(evento, { detail: detalle }));
  }
}

export function getCarrito(): ItemCarrito[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function contarItems(carrito: ItemCarrito[] = getCarrito()): number {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

export function addToCarrito(item: NuevoItemCarrito): void {
  const carrito = getCarrito();
  const existente = carrito.find((elemento) => elemento.id === item.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...item, cantidad: 1 });
  }

  localStorage.setItem(KEY, JSON.stringify(carrito));
  emitir("carrito-updated");
}

export function vaciarCarrito(): void {
  localStorage.removeItem(KEY);
  emitir("carrito-updated");
}

export function getStock(id: number, stockPorDefecto: number): number {
  try {
    const overrides = JSON.parse(localStorage.getItem(STOCK_KEY) || "{}");
    return overrides[id] !== undefined ? overrides[id] : stockPorDefecto;
  } catch {
    return stockPorDefecto;
  }
}

export function setStock(id: number, valor: number): void {
  const overrides = JSON.parse(localStorage.getItem(STOCK_KEY) || "{}");
  overrides[id] = Math.max(0, valor);
  localStorage.setItem(STOCK_KEY, JSON.stringify(overrides));
}

export function adjustStock(id: number, delta: number, stockPorDefecto: number): void {
  const stockActual = getStock(id, stockPorDefecto);
  setStock(id, stockActual + delta);
  emitir("stock-updated", { id });
}

export function puedeAgregar(stock: number, cantidadActual: number): boolean {
  if (stock <= 0) return false;
  return cantidadActual < stock;
}
