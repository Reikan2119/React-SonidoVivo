import EncabezadoSeccion from "../../moleculas/EncabezadoSeccion";
import TarjetaContenido from "../../moleculas/TarjetaContenido";
import { servicios } from "../../../datos/nosotros";

function ServiciosNosotros() {
  return (
    <section className="nosotros-seccion pt-0">
      <div className="container">
        <EncabezadoSeccion
          subtitulo="Lo que encontrarás"
          titulo="Todo para que tu música suene mejor"
        />

        <div className="row g-4">
          {servicios.map((servicio) => (
            <div className="col-12 col-md-6" key={servicio.titulo}>
              <TarjetaContenido {...servicio} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiciosNosotros;
