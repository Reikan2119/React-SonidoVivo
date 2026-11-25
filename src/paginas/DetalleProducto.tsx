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

  if (error) return <div className="pagina"><p className="estado-carga text-danger">{error}</p></div>;
  if (!producto) return <div className="pagina"><p className="estado-carga">Cargando...</p></div>;

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
    <div className="pagina detalle-producto">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-md-6">
            <div className="detalle-media">
              <img src={encodeURI(producto.imagen)} alt={producto.titulo} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="detalle-info">
              <span className="detalle-etiqueta">{producto.categoria?.nombre}</span>
              <h1 className="detalle-titulo">{producto.titulo}</h1>
              <p className="detalle-descripcion">{producto.descripcion}</p>
              <p className="detalle-precio">
                ${precioMostrar.toLocaleString("es-CL")}
                {producto.precioOferta && (
                  <span className="precio-anterior">
                    ${producto.precio.toLocaleString("es-CL")}
                  </span>
                )}
              </p>
              <div className="detalle-meta">
                <span className={`stock-pill ${producto.stock <= 0 ? "agotado" : ""}`}>
                  Stock: {producto.stock}
                </span>
              </div>
              <div className="detalle-acciones">
                <button
                  className="btn btn-warning fw-bold px-4"
                  onClick={handleAgregar}
                  disabled={agregando || producto.stock <= 0}
                >
                  {agregando ? "Agregando..." : "Agregar al carrito"}
                </button>
                <Link to="/productos" className="btn-sonido-outline">
                  Volver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;