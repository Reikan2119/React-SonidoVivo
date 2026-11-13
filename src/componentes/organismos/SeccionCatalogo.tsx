import CardProducto from "../moleculas/CardProducto";
import CardOferta from "../moleculas/CardOferta";
import type { SeccionCatalogo as SeccionCatalogoTipo } from "../../tipos/producto";

interface SeccionCatalogoProps {
  seccion: SeccionCatalogoTipo;
}

function SeccionCatalogo({ seccion }: SeccionCatalogoProps) {
  return (
    <section className="py-4" id={seccion.slug}>
      <div className="container">
        <h2 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>
          {seccion.titulo}
        </h2>
        <div className="row g-4 justify-content-center">
          {seccion.tipo === "oferta"
            ? seccion.items.map((producto) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={producto.id}>
                  <CardOferta {...producto} />
                </div>
              ))
            : seccion.items.map((producto) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={producto.id}>
                  <CardProducto {...producto} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default SeccionCatalogo;
