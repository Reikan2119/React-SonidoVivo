import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SeccionCatalogo from "../componentes/organismos/SeccionCatalogo";
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
        <SeccionCatalogo key={seccion.slug} seccion={seccion} />
      ))}
    </div>
  );
}

export default Productos;
