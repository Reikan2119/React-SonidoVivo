import EncabezadoSeccion from "../../moleculas/EncabezadoSeccion";
import TarjetaContenido from "../../moleculas/TarjetaContenido";
import { pilares, valores } from "../../../datos/nosotros";

function PilaresNosotros() {
  return (
    <section className="nosotros-seccion pt-0">
      <div className="container">
        <EncabezadoSeccion
          subtitulo="Lo que nos mueve"
          titulo="Nuestra forma de entender la música"
        />

        <div className="row g-4">
          {pilares.map((pilar) => (
            <div className="col-12 col-md-4" key={pilar.titulo}>
              <TarjetaContenido {...pilar} />
            </div>
          ))}
        </div>

        <div className="row g-3 mt-1">
          {valores.map((valor) => (
            <div className="col-12 col-sm-6 col-xl-3" key={valor.titulo}>
              <TarjetaContenido {...valor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PilaresNosotros;
