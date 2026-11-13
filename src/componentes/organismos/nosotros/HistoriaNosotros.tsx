import EncabezadoSeccion from "../../moleculas/EncabezadoSeccion";
import HitoTimeline from "../../moleculas/HitoTimeline";
import { hitos, parrafosHistoria } from "../../../datos/nosotros";

function HistoriaNosotros() {
  return (
    <section className="nosotros-seccion">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-7">
            <EncabezadoSeccion
              centrado={false}
              subtitulo="Nuestra historia"
              titulo="Más que una tienda, un punto de encuentro para músicos"
            />
            {parrafosHistoria.map((parrafo, indice) => (
              <p
                className={indice === parrafosHistoria.length - 1 ? "nosotros-texto mb-0" : "nosotros-texto"}
                key={parrafo}
              >
                {parrafo}
              </p>
            ))}
          </div>
          <div className="col-12 col-lg-5">
            <div className="nosotros-historia-caja">
              <p className="nosotros-subtitulo mb-3">Nuestro camino</p>
              <div className="nosotros-timeline">
                {hitos.map((hito) => (
                  <HitoTimeline key={hito.titulo} {...hito} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HistoriaNosotros;
