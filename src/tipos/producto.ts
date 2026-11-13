export interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
}

export interface Oferta extends Producto {
  precioAnterior: number;
}

export interface Categoria {
  nombre: string;
  slug: string;
}

export type SeccionCatalogo =
  | {
      titulo: string;
      slug: string;
      tipo: "producto";
      items: Producto[];
    }
  | {
      titulo: string;
      slug: string;
      tipo: "oferta";
      items: Oferta[];
    };
