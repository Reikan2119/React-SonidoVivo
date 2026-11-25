import { useEffect, useState } from "react";
import { obtenerUsuario } from "../api/sesion";
import { listarPedidos, type Pedido } from "../api/pedidos";

function MisPedidos() {
  const usuario = obtenerUsuario();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!usuario?.id) { setCargando(false); return; }
    listarPedidos(usuario.id)
      .then(setPedidos)
      .catch(() => alert("No se pudieron cargar los pedidos"))
      .finally(() => setCargando(false));
  }, [usuario?.id]);

  if (!usuario) return <div className="container mt-5 text-center">Inicia sesión para ver tus pedidos.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">Mis Pedidos</h2>
      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-center">No tienes pedidos aún.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Tipo entrega</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{new Date(p.fechaPedido).toLocaleString("es-CL")}</td>
                  <td>{p.estado}</td>
                  <td>{p.tipoEntrega}</td>
                  <td>${p.total.toLocaleString("es-CL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MisPedidos;
