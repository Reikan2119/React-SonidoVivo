const KEY = "stock_overrides";

function getOverrides(): Record<number, number> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function saveOverrides(o: Record<number, number>) {
  localStorage.setItem(KEY, JSON.stringify(o));
}

export function getStock(id: number, defaultStock: number): number {
  const o = getOverrides();
  return o[id] !== undefined ? o[id] : defaultStock;
}

export function setStock(id: number, value: number) {
  const o = getOverrides();
  o[id] = Math.max(0, value);
  saveOverrides(o);
}

export function adjustStock(id: number, delta: number, defaultStock: number) {
  const actual = getStock(id, defaultStock);
  setStock(id, actual + delta);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("stock-updated", { detail: { id } }));
  }
}

export function puedeAgregar(stock: number, cantidadActual: number): boolean {
  if (stock <= 0) return false;
  return cantidadActual < stock;
}
