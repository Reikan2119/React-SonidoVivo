import { API, leerError } from "./config";

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
}

export interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  categoria: Categoria;
  activo: boolean;
  precioOferta?: number | null;
  precioAnterior?: number | null;
}

export interface Oferta {
  id: number;
  idProducto?: number;
  id_producto?: number;
  tituloProducto?: string;
  titulo?: string;
  imagen: string;
  precio: number;
  precioOferta: number;
  precioAnterior: number;
  stock: number;
}

export async function obtenerProductos(): Promise<Producto[]> {
  const r = await fetch(`${API}/productos`);
  if (!r.ok) throw new Error(await leerError(r, "No se pudieron cargar los productos"));
  return r.json();
}

export async function obtenerProducto(id: number): Promise<Producto> {
  const r = await fetch(`${API}/productos/${id}`);
  if (!r.ok) throw new Error(await leerError(r, "Producto no encontrado"));
  return r.json();
}

export async function obtenerCategorias(): Promise<Categoria[]> {
  const r = await fetch(`${API}/categorias`);
  if (!r.ok) throw new Error(await leerError(r, "No se pudieron cargar las categorías"));
  return r.json();
}

export async function obtenerOfertas(): Promise<Oferta[]> {
  const r = await fetch(`${API}/ofertas`);
  if (!r.ok) throw new Error(await leerError(r, "No se pudieron cargar las ofertas"));
  return r.json();
}

export async function buscarProductos(texto: string): Promise<Producto[]> {
  const r = await fetch(`${API}/productos?texto=${encodeURIComponent(texto)}`);
  if (!r.ok) throw new Error(await leerError(r, "Error al buscar productos"));
  return r.json();
}

export async function productosPorCategoria(slug: string): Promise<Producto[]> {
  const r = await fetch(`${API}/productos?categoria=${encodeURIComponent(slug)}`);
  if (!r.ok) throw new Error(await leerError(r, "Error al filtrar productos"));
  return r.json();
}
