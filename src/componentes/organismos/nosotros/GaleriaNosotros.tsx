import EncabezadoSeccion from "../../moleculas/EncabezadoSeccion";
import ItemGaleria from "../../moleculas/ItemGaleria";
import { galeria } from "../../../datos/nosotros";

function GaleriaNosotros() {
  return (
    <section className="nosotros-seccion pt-0">
      <div className="container">
        <EncabezadoSeccion
          subtitulo="Nuestro catálogo"
          titulo="Un vistazo a lo que tenemos para ti"
        />

        <div className="nosotros-galeria">
          {galeria.map((item) => (
            <ItemGaleria key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GaleriaNosotros;
