import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSesion } from "../../utils/auth";
import { guitarras, bajos, baterias, teclados, accesorios } from "./paginaInstrumentos";
import { cuerdas, otros } from "./paginaAccesorios";

const todos = [...guitarras, ...bajos, ...baterias, ...teclados, ...accesorios, ...cuerdas, ...otros];

function Admin() {
  const navigate = useNavigate();
  const sesion = getSesion();

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
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.titulo}</td>
                    <td>${p.precio.toLocaleString("es-CL")}</td>
                    <td>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;