import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { guitarras, bajos, baterias, teclados, accesorios } from "./paginaProductos";

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

const STOCK_KEY = "stock_overrides";

export function getStock(id: number, defaultStock: number): number {
  try {
    const o = JSON.parse(localStorage.getItem(STOCK_KEY) || "{}");
    return o[id] !== undefined ? o[id] : defaultStock;
  } catch {
    return defaultStock;
  }
}

export function setStock(id: number, value: number) {
  const o = JSON.parse(localStorage.getItem(STOCK_KEY) || "{}");
  o[id] = Math.max(0, value);
  localStorage.setItem(STOCK_KEY, JSON.stringify(o));
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

const todos = [...guitarras, ...bajos, ...baterias, ...teclados, ...accesorios];

function Carrito() {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const cargar = () => setItems(getCarrito());

  useEffect(() => {
    cargar();
  }, []);

  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const [comprado, setComprado] = useState(false);

  const handleComprar = () => {
    items.forEach((i) => {
      const prod = todos.find((p) => p.id === i.id);
      if (prod) adjustStock(i.id, -i.cantidad, prod.stock);
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
                    {items.map((i) => (
                      <tr key={i.id}>
                        <td>{i.titulo}</td>
                        <td>{i.cantidad}</td>
                        <td>${i.precio.toLocaleString("es-CL")}</td>
                        <td>${(i.precio * i.cantidad).toLocaleString("es-CL")}</td>
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