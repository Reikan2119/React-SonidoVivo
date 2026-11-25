import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { obtenerProductos, obtenerCategorias, obtenerOfertas, type Producto, type Categoria, type Oferta } from "../api/productos";
import { cantidadesPorProducto, obtenerCarrito } from "../api/carrito";
import { obtenerUsuario } from "../api/sesion";

function Productos() {
  const location = useLocation();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [enCarrito, setEnCarrito] = useState<Record<number, number>>({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const usuario = obtenerUsuario();
  const usuarioId = usuario?.id;

  const cargar = () => {
    Promise.all([obtenerProductos(), obtenerCategorias(), obtenerOfertas()])
      .then(([ps, cs, os]) => {
        setProductos(ps);
        setCategorias(cs);
        setOfertas(os);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargar();
    const handler = () => cargar();
    window.addEventListener("stockActualizado", handler);
    return () => window.removeEventListener("stockActualizado", handler);
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

  if (cargando) return <div className="pagina"><p className="estado-carga">Cargando catálogo...</p></div>;
  if (error) return <div className="pagina"><p className="estado-carga text-danger">{error}</p></div>;

  return (
    <div className="pagina pagina-productos">
      <header className="encabezado-pagina">
        <div className="container">
          <h1>Productos</h1>
        </div>
      </header>

      {visibles.map((cat) => {
        const items = productos.filter((p) => p.categoria?.slug === cat.slug && p.activo);
        if (items.length === 0) return null;
        return (
          <section className="seccion-sonido" key={cat.slug} id={cat.slug}>
            <div className="container">
              <div className="encabezado-categoria">
                <h2>{cat.nombre}</h2>
              </div>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {items.map((p) => {
                  const stockDisponible = p.stock - (enCarrito[p.id] || 0);
                  const oferta = ofertas.find((o) => (o.producto?.id ?? o.idProducto ?? o.id_producto) === p.id);
                  const precioOferta = p.precioOferta ?? oferta?.precioOferta ?? null;
                  const precioMostrar = precioOferta ?? p.precio;
                  return (
                    <div className="col" key={p.id}>
                      <article className="tarjeta-producto">
                        <div className="tarjeta-imagen">
                          <img src={encodeURI(p.imagen)} alt={p.titulo} />
                        </div>
                        <div className="tarjeta-cuerpo">
                          <h5 className="tarjeta-titulo">{p.titulo}</h5>
                          <p className="tarjeta-descripcion">{p.descripcion}</p>
                          <p className="tarjeta-precio">
                            ${precioMostrar.toLocaleString("es-CL")}
                            {precioOferta && (
                              <span className="tarjeta-precio-anterior">
                                ${p.precio.toLocaleString("es-CL")}
                              </span>
                            )}
                          </p>
                          <span className={`stock-pill ${stockDisponible <= 0 ? "agotado" : ""}`}>
                            Stock: {stockDisponible}
                          </span>
                          <div className="tarjeta-acciones">
                            <a href={`/producto/${p.id}`} className="btn btn-warning">
                              Ver detalle
                            </a>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Productos;