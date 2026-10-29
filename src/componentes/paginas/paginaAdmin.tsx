import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSesion } from "../../utils/auth";
import { getStock, adjustStock } from "../../utils/stock";
import { guitarras, bajos, baterias, teclados, accesorios } from "./paginaProductos";

const todos = [...guitarras, ...bajos, ...baterias, ...teclados, ...accesorios];

function Admin() {
  const navigate = useNavigate();
  const sesion = getSesion();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!sesion || sesion.rol !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [sesion, navigate]);

  if (!sesion || sesion.rol !== "admin") return null;

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Panel de Administrador</h1>
          <p className="text-center lead">Bienvenido, {sesion.nombre || "Admin"}</p>
          <div className="table-responsive mt-4">
            <table className="table table-dark table-striped align-middle" data-refresh={refresh}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Ajustar</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((p) => {
                  const stock = getStock(p.id, p.stock);
                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.titulo}</td>
                      <td>${p.precio.toLocaleString("es-CL")}</td>
                      <td>{stock}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-success" onClick={() => { adjustStock(p.id, 1, p.stock); setRefresh((r) => r + 1); }}>+</button>
                          <button className="btn btn-danger" onClick={() => { adjustStock(p.id, -1, p.stock); setRefresh((r) => r + 1); }}>-</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;