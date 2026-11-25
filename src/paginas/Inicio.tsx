import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos, obtenerOfertas, type Producto, type Oferta } from "../api/productos";

function Inicio() {
  const [destacados, setDestacados] = useState<Producto[]>([]);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);

  useEffect(() => {
    obtenerProductos().then((ps) => {
      // destacados: los que tienen oferta o primeros 4
      const ids = [104, 201, 301, 402];
      setDestacados(ps.filter((p) => ids.includes(p.id)).slice(0, 4));
    }).catch(() => {});
    obtenerOfertas().then(setOfertas).catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5 text-center">
        <div className="container">
          <h1 className="fw-bold" style={{ color: "#d98e2f" }}>SonidoVivo</h1>
          <p className="lead">Tu tienda de instrumentos musicales</p>
          <Link to="/productos" className="btn" style={{ backgroundColor: "#d98e2f", color: "#1c1a17", fontWeight: "bold" }}>
            Ver productos
          </Link>
        </div>
      </section>

      {ofertas.length > 0 && (
        <section className="py-4">
          <div className="container">
            <h2 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Ofertas</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
              {ofertas.map((o) => (
                <div className="col" key={o.id}>
                  <div className="card h-100">
                    <img src={encodeURI(o.imagen)} className="card-img-top" alt={o.tituloProducto || o.titulo} />
                    <div className="card-body">
                      <h5 className="card-title">{o.tituloProducto || o.titulo}</h5>
                      <p className="card-text text-danger fw-bold">
                        ${o.precioOferta.toLocaleString("es-CL")}
                        <span className="text-muted text-decoration-line-through ms-2">
                          ${o.precioAnterior.toLocaleString("es-CL")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {destacados.length > 0 && (
        <section className="py-4">
          <div className="container">
            <h2 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Destacados</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
              {destacados.map((p) => (
                <div className="col" key={p.id}>
                  <div className="card h-100">
                    <img src={encodeURI(p.imagen)} className="card-img-top" alt={p.titulo} />
                    <div className="card-body">
                      <h5 className="card-title">{p.titulo}</h5>
                      <p className="card-text">${p.precio.toLocaleString("es-CL")}</p>
                      <Link to={`/producto/${p.id}`} className="btn btn-sm btn-warning">Ver detalle</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Inicio;
