import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerProducto, type Producto } from "../api/productos";
import { agregarAlCarrito } from "../api/carrito";
import { obtenerUsuario } from "../api/sesion";

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [agregando, setAgregando] = useState(false);

  const usuario = obtenerUsuario();

  useEffect(() => {
    if (!id) return;
    obtenerProducto(Number(id))
      .then(setProducto)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="container mt-5 text-center text-danger">{error}</div>;
  if (!producto) return <div className="container mt-5 text-center">Cargando...</div>;

  const precioMostrar = producto.precioOferta ?? producto.precio;

  const handleAgregar = async () => {
    if (!usuario) {
      alert("Inicia sesión para agregar al carrito");
      return;
    }
    setAgregando(true);
    try {
      await agregarAlCarrito(usuario.id, producto.id, 1);
      alert("Agregado al carrito");
    } catch (e) {
      alert(e instanceof Error ? e.message : "No se pudo agregar");
    } finally {
      setAgregando(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={encodeURI(producto.imagen)} className="img-fluid" alt={producto.titulo} />
        </div>
        <div className="col-md-6">
          <h2 style={{ color: "#d98e2f" }}>{producto.titulo}</h2>
          <p className="text-muted">{producto.descripcion}</p>
          <p className="fs-4 fw-bold">
            ${precioMostrar.toLocaleString("es-CL")}
            {producto.precioOferta && (
              <span className="text-muted text-decoration-line-through ms-2 fs-6">
                ${producto.precio.toLocaleString("es-CL")}
              </span>
            )}
          </p>
          <p>Stock: {producto.stock}</p>
          <p className="small text-muted">Categoría: {producto.categoria?.nombre}</p>
          <button className="btn btn-warning fw-bold" onClick={handleAgregar} disabled={agregando || producto.stock <= 0}>
            {agregando ? "Agregando..." : "Agregar al carrito"}
          </button>
          <Link to="/productos" className="btn btn-outline-secondary ms-2">Volver</Link>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
