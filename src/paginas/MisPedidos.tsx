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

  if (!usuario) {
    return (
      <div className="pagina">
        <p className="estado-carga">Inicia sesión para ver tus pedidos.</p>
      </div>
    );
  }

  return (
    <div className="pagina pagina-pedidos">
      <header className="encabezado-pagina">
        <div className="container">
          <h1>Mis Pedidos</h1>
        </div>
      </header>

      <div className="container pb-5">
        {cargando ? (
          <p className="estado-carga">Cargando...</p>
        ) : pedidos.length === 0 ? (
          <div className="panel-sonido panel-vacio">
            <p className="mb-0">No tienes pedidos aún.</p>
          </div>
        ) : (
          <div className="panel-sonido">
            <div className="table-responsive">
              <table className="table tabla-sonido align-middle">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default MisPedidos;