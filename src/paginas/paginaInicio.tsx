import CardProducto from "../componentes/moleculas/CardProducto";
import { categorias, destacados } from "./paginaProductos";

const AMARILLO = "#d98e2f";

function PaginaInicio() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold">
                Sonido<span style={{ color: AMARILLO }}>Vivo</span>
              </h1>
              <p className="lead" style={{ color: "#f5f0e1" }}>
                Tu tienda de instrumentos y accesorios musicales. Encuentra guitarras, bajos, baterías, teclados y más.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" style={{ color: AMARILLO }}>Categorías</h2>
          <div className="row g-3 justify-content-center">
            {categorias.map((cat) => (
              <div className="col-6 col-md-4 col-lg-2" key={cat.slug}>
                <a href={`/productos#${cat.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card text-center h-100" style={{ backgroundColor: "#2a241c", border: `1px solid ${AMARILLO}` }}>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <h5 className="card-title m-0" style={{ color: "#f5f0e1" }}>{cat.nombre}</h5>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" style={{ color: AMARILLO }}>Productos destacados</h2>
          <div className="row g-4 justify-content-center">
            {destacados.map((p) => (
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center" key={p.id}>
                <CardProducto {...p} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default PaginaInicio;

