import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { obtenerProductos, obtenerCategorias, type Producto, type Categoria } from "../api/productos";
import { cantidadesPorProducto, obtenerCarrito } from "../api/carrito";
import { obtenerUsuario } from "../api/sesion";

function Productos() {
  const location = useLocation();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [enCarrito, setEnCarrito] = useState<Record<number, number>>({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const usuario = obtenerUsuario();
  const usuarioId = usuario?.id;

  useEffect(() => {
    Promise.all([obtenerProductos(), obtenerCategorias()])
      .then(([ps, cs]) => {
        setProductos(ps);
        setCategorias(cs);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    if (!usuarioId) return;
    obtenerCarrito(usuarioId)
      .then((c) => setEnCarrito(cantidadesPorProducto(c)))
      .catch(() => {});
  }, [usuarioId]);

  const hash = location.hash.replace("#", "").toLowerCase();
  const visibles = hash
    ? categorias.filter((c) => c.slug === hash)
    : categorias;

  if (cargando) return <div className="container mt-5 text-center">Cargando...</div>;
  if (error) return <div className="container mt-5 text-center text-danger">{error}</div>;

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Productos</h1>
        </div>
      </section>

      {visibles.map((cat) => {
        const items = productos.filter((p) => p.categoria?.slug === cat.slug && p.activo);
        if (items.length === 0) return null;
        return (
          <div className="container mb-5" key={cat.slug} id={cat.slug}>
            <h2 className="fw-normal text-center" style={{ color: "#f5f0e1" }}>{cat.nombre}</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mt-2">
              {items.map((p) => {
                const stockDisponible = p.stock - (enCarrito[p.id] || 0);
                const precioMostrar = p.precioOferta ?? p.precio;
                return (
                  <div className="col" key={p.id}>
                    <div className="card h-100">
                      <img src={encodeURI(p.imagen)} className="card-img-top" alt={p.titulo} />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{p.titulo}</h5>
                        <p className="card-text small text-muted">{p.descripcion}</p>
                        <p className="card-text fw-bold mt-auto">
                          ${precioMostrar.toLocaleString("es-CL")}
                          {p.precioOferta && (
                            <span className="text-muted text-decoration-line-through ms-2 small">
                              ${p.precio.toLocaleString("es-CL")}
                            </span>
                          )}
                        </p>
                        <p className="card-text small">Stock: {stockDisponible}</p>
                        <a href={`/producto/${p.id}`} className="btn btn-sm btn-warning">Ver detalle</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Productos;
