import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos, obtenerOfertas, type Producto, type Oferta } from "../api/productos";

function Inicio() {
  const [destacados, setDestacados] = useState<Producto[]>([]);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);

  useEffect(() => {
    obtenerProductos().then((ps) => {

      const ids = [104, 201, 301, 402];
      setDestacados(ps.filter((p) => ids.includes(p.id)).slice(0, 4));
    }).catch(() => {});
    obtenerOfertas().then(setOfertas).catch(() => {});
  }, []);

  return (
    <div className="pagina pagina-inicio">
      <section className="hero-sonido">
        <div className="container hero-contenido">
          <h1 className="hero-titulo">SonidoVivo</h1>
          <p className="hero-lead">Tu tienda de instrumentos musicales</p>
          <Link to="/productos" className="btn-sonido">
            Ver productos
          </Link>
        </div>
      </section>

      {ofertas.length > 0 && (
        <section className="seccion-sonido">
          <div className="container">
            <div className="encabezado-seccion">
              <h2 className="titulo-seccion">Ofertas</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {ofertas.map((o) => (
                <div className="col" key={o.id}>
                  <article className="tarjeta-producto">
                    <div className="tarjeta-imagen">
                      <img src={encodeURI(o.producto?.imagen ?? o.imagen ?? "")} alt={o.producto?.titulo || o.tituloProducto || o.titulo} />
                    </div>
                    <div className="tarjeta-cuerpo">
                      <h5 className="tarjeta-titulo">{o.producto?.titulo || o.tituloProducto || o.titulo}</h5>
                      <p className="tarjeta-precio">
                        ${o.precioOferta.toLocaleString("es-CL")}
                        <span className="tarjeta-precio-anterior">
                          ${o.precioAnterior.toLocaleString("es-CL")}
                        </span>
                      </p>
                      <span className={`stock-pill ${(o.producto?.stock ?? 0) <= 0 ? "agotado" : ""}`}>
                        Stock: {o.producto?.stock ?? 0}
                      </span>
                      <div className="tarjeta-acciones">
                        <Link to={`/producto/${o.producto?.id ?? o.idProducto ?? o.id_producto}`} className="btn btn-warning">
                          Ver detalle
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {destacados.length > 0 && (
        <section className="seccion-sonido">
          <div className="container">
            <div className="encabezado-seccion">
              <h2 className="titulo-seccion">Destacados</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {destacados.map((p) => {
                const oferta = ofertas.find((o) => (o.producto?.id ?? o.idProducto ?? o.id_producto) === p.id);
                const precioMostrar = oferta?.precioOferta ?? p.precio;
                return (
                <div className="col" key={p.id}>
                  <article className="tarjeta-producto">
                    <div className="tarjeta-imagen">
                      <img src={encodeURI(p.imagen)} alt={p.titulo} />
                    </div>
                    <div className="tarjeta-cuerpo">
                      <h5 className="tarjeta-titulo">{p.titulo}</h5>
                      <p className="tarjeta-precio">
                        ${precioMostrar.toLocaleString("es-CL")}
                        {oferta && (
                          <span className="tarjeta-precio-anterior">
                            ${p.precio.toLocaleString("es-CL")}
                          </span>
                        )}
                      </p>
                      <div className="tarjeta-acciones">
                        <Link to={`/producto/${p.id}`} className="btn btn-warning">
                          Ver detalle
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Inicio;