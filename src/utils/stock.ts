export function puedeAgregar(stock: number, cantidadActual: number): boolean {
  if (stock <= 0) return false;
  return cantidadActual < stock;
}