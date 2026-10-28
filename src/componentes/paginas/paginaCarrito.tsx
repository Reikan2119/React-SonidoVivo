import { useState, useEffect } from "react";
import { getCarrito, vaciarCarrito } from "../../utils/carrito";
import type { ItemCarrito } from "../../utils/carrito";

function Carrito() {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const cargar = () => setItems(getCarrito());

  useEffect(() => {
    cargar();
  }, []);

  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Carrito</h1>
          {items.length === 0 ? (
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
                <button className="btn mt-2" style={{ backgroundColor: "#b5731e", color: "#fff" }} onClick={() => { vaciarCarrito(); cargar(); }}>
                  Vaciar carrito
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