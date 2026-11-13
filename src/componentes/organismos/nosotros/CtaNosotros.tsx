import { Link } from "react-router-dom";
import EncabezadoSeccion from "../../moleculas/EncabezadoSeccion";

function CtaNosotros() {
  return (
    <section className="nosotros-seccion pt-0">
      <div className="container">
        <div className="nosotros-cta-caja text-center">
          <EncabezadoSeccion
            subtitulo="Te esperamos"
            titulo="¿Listo para encontrar tu próximo sonido?"
            descripcion="Visítanos en Viña del Mar o escríbenos. Estamos aquí para ayudarte a elegir el instrumento, el equipo o el accesorio que necesitas."
            anchoDescripcion="40rem"
          />
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/productos" className="btn-sonido">
              Ver catálogo
            </Link>
            <Link to="/contacto" className="btn-sonido-outline">
              Contactarnos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaNosotros;
