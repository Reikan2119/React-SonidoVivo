import { useEffect, useState } from "react";
import { listarPedidos, cambiarEstadoPedido, cancelarPedido, type Pedido } from "../api/pedidos";

function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const cargar = async () => {
    const ps = await listarPedidos();
    setPedidos(ps);
  };

  useEffect(() => { cargar().catch(() => alert("Error cargando pedidos")); }, []);

  const cambiar = async (id: number, estado: string) => {
    try { await cambiarEstadoPedido(id, estado); cargar(); }
    catch (e) { alert(e instanceof Error ? e.message : "Error"); }
  };

  const cancelar = async (id: number) => {
    if (!confirm("¿Cancelar pedido?")) return;
    try { await cancelarPedido(id); cargar(); }
    catch (e) { alert(e instanceof Error ? e.message : "Error"); }
  };

  return (
    <div className="pagina pagina-admin">
      <div className="panel-sonido">
        <h2 className="titulo-panel">Pedidos</h2>
        <div className="table-responsive">
          <table className="table tabla-sonido align-middle">
            <thead><tr><th>N°</th><th>Usuario</th><th>Estado</th><th>Tipo</th><th>Total</th><th>Acciones</th></tr></thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.usuarioId}</td>
                  <td>{p.estado}</td>
                  <td>{p.tipoEntrega}</td>
                  <td>${p.total.toLocaleString("es-CL")}</td>
                  <td className="d-flex gap-1">
                    <select className="form-select form-select-sm" value={p.estado} onChange={(e) => cambiar(p.id, e.target.value)}>
                      <option value="EN_PREPARACION">EN_PREPARACION</option>
                      <option value="DESPACHADO">DESPACHADO</option>
                      <option value="ENTREGADO">ENTREGADO</option>
                    </select>
                    {p.estado === "EN_PREPARACION" && (
                      <button className="btn btn-outline-danger btn-sm" onClick={() => cancelar(p.id)}>Cancelar</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminPedidos;