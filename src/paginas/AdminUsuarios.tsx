import { useEffect, useState } from "react";
import { API, leerError } from "../api/config";

interface Usuario {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  rol: string;
  activo: boolean;
}

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const cargar = async () => {
    const r = await fetch(`${API}/usuarios`);
    if (r.ok) setUsuarios(await r.json());
  };

  useEffect(() => { cargar(); }, []);

  const cambiarRol = async (id: number, rol: string) => {
    const r = await fetch(`${API}/usuarios/${id}/rol`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreRol: rol }),
    });
    if (r.ok) cargar(); else alert(await leerError(r, "No se pudo cambiar el rol"));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Usuarios</h2>
      <table className="table table-striped">
        <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Activo</th><th>Cambiar rol</th></tr></thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre} {u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>{u.activo ? "Sí" : "No"}</td>
              <td>
                <select className="form-select form-select-sm" value={u.rol} onChange={(e) => cambiarRol(u.id, e.target.value)}>
                  <option value="CLIENTE">CLIENTE</option>
                  <option value="VENDEDOR">VENDEDOR</option>
                  <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminUsuarios;
