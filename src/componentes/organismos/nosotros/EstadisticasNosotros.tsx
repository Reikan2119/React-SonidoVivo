import Estadistica from "../../moleculas/Estadistica";
import { estadisticas } from "../../../datos/nosotros";

function EstadisticasNosotros() {
  return (
    <section className="nosotros-stats" aria-label="SonidoVivo en números">
      <div className="container">
        <div className="row g-0">
          {estadisticas.map((dato) => (
            <div className="col-6 col-lg-3" key={dato.texto}>
              <Estadistica {...dato} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EstadisticasNosotros;
