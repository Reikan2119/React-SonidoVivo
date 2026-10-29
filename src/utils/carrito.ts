export interface ItemCarrito {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

const KEY = "carrito";

export function getCarrito(): ItemCarrito[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToCarrito(item: Omit<ItemCarrito, "cantidad">) {
  const carrito = getCarrito();
  const existente = carrito.find((i) => i.id === item.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...item, cantidad: 1 });
  }
  localStorage.setItem(KEY, JSON.stringify(carrito));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("carrito-updated"));
  }
}

export function vaciarCarrito() {
  localStorage.removeItem(KEY);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("carrito-updated"));
  }
}