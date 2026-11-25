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
    <div className="container mt-4">
      <h2 className="mb-3">Productos</h2>
      <table className="table table-striped">
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
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-muted small">Categorías disponibles: {categorias.map((c) => c.nombre).join(", ")}</p>
    </div>
  );
}
export default AdminProductos;
