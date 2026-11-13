export interface ItemCarrito {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

export type NuevoItemCarrito = Omit<ItemCarrito, "cantidad">;
