import { useEffect, useState } from "react";
import { mensajeError } from "../api/config";
import { listarContactos, cambiarEstadoContacto, type Contacto } from "../api/contacto";

function ListadoContactos() {
  const [contactos, setContactos] = useState<Contacto[]>([]);

  const cargar = async () => setContactos(await listarContactos());

  useEffect(() => { cargar().catch(() => alert("Error cargando mensajes")); }, []);

  const cambiar = async (id: number, estado: string) => {
    try { await cambiarEstadoContacto(id, estado); cargar(); }
    catch (e) { alert(mensajeError(e, "Error")); }
  };

  return (
    <div className="pagina pagina-admin">
      <div className="panel-sonido">
        <h2 className="titulo-panel">Mensajes de contacto</h2>
        <div className="table-responsive">
          <table className="table tabla-sonido align-middle">
            <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Asunto</th><th>Mensaje</th><th>Estado</th><th>Acción</th></tr></thead>
            <tbody>
              {contactos.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.email}</td>
                  <td>{c.asunto}</td>
                  <td>{c.mensaje}</td>
                  <td>{c.estado}</td>
                  <td>
                    <select className="form-select form-select-sm" value={c.estado} onChange={(e) => cambiar(c.id, e.target.value)}>
                      <option value="PENDIENTE">PENDIENTE</option>
                      <option value="ATENDIDO">ATENDIDO</option>
                    </select>
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
export default ListadoContactos;