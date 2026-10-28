import { useParams, Link } from "react-router-dom";
import { guitarras, bajos, baterias, teclados, accesorios } from "./paginaInstrumentos";
import { cuerdas, otros } from "./paginaAccesorios";

const todos = [
  ...guitarras, ...bajos, ...baterias, ...teclados, ...accesorios, ...cuerdas, ...otros,
];

function DetalleProducto() {
  const { id } = useParams();
  const producto = todos.find((p) => String(p.id) === String(id));

  if (!producto) {
    return (
      <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }} className="py-5 text-center">
        <h2 style={{ color: "#d98e2f" }}>Producto no encontrado</h2>
        <Link to="/instrumentos" style={{ color: "#f5f0e1" }}>Volver</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center">
              <img src={producto.imagen} alt={producto.titulo} className="img-fluid" style={{ maxHeight: 400, objectFit: "contain" }} />
            </div>
            <div className="col-12 col-md-6">
              <h1 className="fw-bold" style={{ color: "#d98e2f" }}>{producto.titulo}</h1>
              <p className="lead" style={{ color: "#f5f0e1" }}>{producto.descripcion}</p>
              <p className="fs-3 fw-bold" style={{ color: "#b5731e" }}>
                ${producto.precio.toLocaleString("es-CL")}
              </p>
              <Link to="/instrumentos" className="btn" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
                Volver
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetalleProducto;