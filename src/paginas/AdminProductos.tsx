import { useEffect, useState } from "react";
import { obtenerProductos, obtenerCategorias, type Producto, type Categoria } from "../api/productos";
import { API } from "../api/config";

function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const cargar = () => {
    obtenerProductos().then(setProductos).catch(() => alert("Error cargando productos"));
    obtenerCategorias().then(setCategorias).catch(() => {});
  };

  useEffect(() => { cargar(); }, []);

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar producto?")) return;
    const r = await fetch(`${API}/productos/${id}`, { method: "DELETE" });
    if (r.ok) cargar(); else alert("No se pudo eliminar");
  };

  return (
    <div className="pagina pagina-admin">
      <div className="panel-sonido">
        <h2 className="titulo-panel">Productos</h2>
        <div className="table-responsive">
          <table className="table tabla-sonido align-middle">
            <thead><tr><th>ID</th><th>Título</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.titulo}</td>
                  <td>{p.categoria?.nombre}</td>
                  <td>${p.precio.toLocaleString("es-CL")}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="texto-tenue small mb-0 mt-3">Categorías disponibles: {categorias.map((c) => c.nombre).join(", ")}</p>
      </div>
    </div>
  );
}
export default AdminProductos;