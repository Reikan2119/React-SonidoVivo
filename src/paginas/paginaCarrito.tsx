import { useState } from "react";
import { Link } from "react-router-dom";
import { todosLosProductos } from "./paginaProductos";

export interface ItemCarrito {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

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

export function addToCarrito(item: Omit<ItemCarrito, "cantidad">): void {
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

function Carrito() {
  const [items, setItems] = useState<ItemCarrito[]>(() => getCarrito());
  const [comprado, setComprado] = useState(false);

  const cargar = () => setItems(getCarrito());

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleComprar = () => {
    items.forEach((item) => {
      const producto = todosLosProductos.find((p) => p.id === item.id);
      if (producto) adjustStock(item.id, -item.cantidad, producto.stock);
    });
    vaciarCarrito();
    setItems([]);
    setComprado(true);
  };

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Carrito</h1>
          {comprado ? (
            <div className="text-center mt-4">
              <p style={{ color: "#d98e2f", fontSize: "1.25rem" }}>¡Compra realizada con éxito!</p>
              <Link to="/" className="btn" style={{ backgroundColor: "#d98e2f", color: "#1c1a17", fontWeight: "bold" }}>
                Volver a inicio
              </Link>
            </div>
          ) : items.length === 0 ? (
            <p className="text-center lead">Tu carrito está vacío.</p>
          ) : (
            <>
              <div className="table-responsive mt-4">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.titulo}</td>
                        <td>{item.cantidad}</td>
                        <td>${item.precio.toLocaleString("es-CL")}</td>
                        <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-end mt-3">
                <h4 style={{ color: "#d98e2f" }}>Total: ${total.toLocaleString("es-CL")}</h4>
                <button className="btn mt-2 me-2" style={{ backgroundColor: "#b5731e", color: "#fff" }} onClick={() => { vaciarCarrito(); cargar(); }}>
                  Vaciar carrito
                </button>
                <button className="btn mt-2" style={{ backgroundColor: "#d98e2f", color: "#1c1a17", fontWeight: "bold" }} onClick={handleComprar}>
                  Comprar
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Carrito;
