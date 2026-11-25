import { useEffect, useState } from "react";
import { obtenerProductos, obtenerCategorias, type Producto, type Categoria } from "../api/productos";
import { API, mensajeError } from "../api/config";

function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cargar = () => {
    obtenerProductos().then(setProductos).catch(() => alert("Error cargando productos"));
    obtenerCategorias().then((cs) => {
      setCategorias(cs);
      if (cs.length > 0 && !categoriaId) setCategoriaId(String(cs[0].id));
    }).catch(() => {});
  };

  useEffect(() => { cargar(); }, []);

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar producto?")) return;
    const r = await fetch(`${API}/productos/${id}`, { method: "DELETE" });
    if (r.ok) cargar(); else alert("No se pudo eliminar");
  };

  const agregar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descripcion.trim() || !precio || !stock || !imagen.trim() || !categoriaId) {
      alert("Completa todos los campos del producto");
      return;
    }
    setGuardando(true);
    try {
      const r = await fetch(`${API}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          precio: Number(precio),
          stock: Number(stock),
          imagen: imagen.trim(),
          categoria: { id: Number(categoriaId) },
          activo: true,
        }),
      });
      if (!r.ok) throw new Error("No se pudo crear el producto");
      setTitulo("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setImagen("");
      cargar();
      alert("Producto agregado correctamente");
    } catch (error) {
      alert(mensajeError(error, "No se pudo agregar el producto"));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="pagina pagina-admin">
      <div className="panel-sonido mb-4">
        <h2 className="titulo-panel">Agregar producto</h2>
        <form onSubmit={agregar} className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label">Título</label>
            <input className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Categoría</label>
            <select className="form-select" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Descripción</label>
            <input className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Precio</label>
            <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Ruta de imagen</label>
            <input className="form-control" value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="/img/Instrumentos/..." />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-sonido" disabled={guardando}>
              {guardando ? "Guardando..." : "Agregar producto"}
            </button>
          </div>
        </form>
      </div>

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