import { useEffect, useState } from "react";
import { mensajeError } from "../api/config";
import { useParams, Link } from "react-router-dom";
import { obtenerProducto, obtenerOfertas, type Producto } from "../api/productos";
import { agregarAlCarrito, obtenerCarrito, cantidadesPorProducto } from "../api/carrito";
import { obtenerUsuario } from "../api/sesion";

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [agregando, setAgregando] = useState(false);
  const [ofertaPrecio, setOfertaPrecio] = useState<number | null>(null);
  const [enCarrito, setEnCarrito] = useState<Record<number, number>>({});

  const usuario = obtenerUsuario();

  const cargar = () => {
    if (!id) return;
    obtenerProducto(Number(id))
      .then(setProducto)
      .catch((e) => setError(e.message));
    obtenerOfertas()
      .then((os) => {
        const o = os.find((x) => (x.producto?.id ?? x.idProducto ?? x.id_producto) === Number(id));
        setOfertaPrecio(o?.precioOferta ?? null);
      })
      .catch(() => {});
    if (usuario?.id) {
      obtenerCarrito(usuario.id)
        .then((c) => setEnCarrito(cantidadesPorProducto(c)))
        .catch(() => {});
    }
  };

  useEffect(() => {
    cargar();
    const handler = () => cargar();
    window.addEventListener("stockActualizado", handler);
    return () => window.removeEventListener("stockActualizado", handler);
  }, [id]);

  if (error) return <div className="pagina"><p className="estado-carga text-danger">{error}</p></div>;
  if (!producto) return <div className="pagina"><p className="estado-carga">Cargando...</p></div>;

  const precioOferta = ofertaPrecio ?? producto.precioOferta ?? null;
  const precioMostrar = precioOferta ?? producto.precio;
  const stockDisponible = producto.stock - (enCarrito[producto.id] || 0);

  const handleAgregar = async () => {
    if (!usuario) {
      alert("Inicia sesión para agregar al carrito");
      return;
    }
    setAgregando(true);
    try {
      await agregarAlCarrito(usuario.id, producto.id, 1);
      setEnCarrito((prev) => ({ ...prev, [producto.id]: (prev[producto.id] || 0) + 1 }));
      window.dispatchEvent(new Event("carritoActualizado"));
      alert("Agregado al carrito");
    } catch (e) {
      alert(mensajeError(e, "No se pudo agregar"));
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
                {precioOferta && (
                  <span className="precio-anterior">
                    ${producto.precio.toLocaleString("es-CL")}
                  </span>
                )}
              </p>
              <div className="detalle-meta">
                <span className={`stock-pill ${stockDisponible <= 0 ? "agotado" : ""}`}>
                  Stock: {stockDisponible}
                </span>
              </div>
              <div className="detalle-acciones">
                <button
                  className="btn btn-warning fw-bold px-4"
                  onClick={handleAgregar}
                  disabled={agregando || stockDisponible <= 0}
                >
                  {agregando ? "Agregando..." : stockDisponible <= 0 ? "Sin stock disponible" : "Agregar al carrito"}
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