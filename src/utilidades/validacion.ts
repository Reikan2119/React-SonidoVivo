/**
 * Reglas de validación compartidas por los formularios.
 * Se usan cadenas ya recortadas cuando el formulario lo necesita.
 */
export function esCorreoValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());
}

export function estaVacio(valor: string): boolean {
  return valor.trim().length === 0;
}
