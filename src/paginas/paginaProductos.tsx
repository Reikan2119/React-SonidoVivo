import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardProducto from "../componentes/moleculas/CardProducto";
import CardOferta from "../componentes/moleculas/CardOferta";
import { seccionesCatalogo } from "../datos/productos";

function Productos() {
  const location = useLocation();
  const hash = location.hash.replace("#", "").toLowerCase();
  const visibles = hash
    ? seccionesCatalogo.filter((seccion) => seccion.slug === hash)
    : seccionesCatalogo;

  useEffect(() => {
    if (hash) {
      const elemento = document.getElementById(hash);
      if (elemento) elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Productos</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            Explora nuestra variedad de instrumentos, accesorios y ofertas.
          </p>
        </div>
      </section>

      {visibles.map((seccion) => (
        <section className="py-4" id={seccion.slug} key={seccion.titulo}>
          <div className="container">
            <h2 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>{seccion.titulo}</h2>
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
      ))}
    </div>
  );
}

export default Productos;
