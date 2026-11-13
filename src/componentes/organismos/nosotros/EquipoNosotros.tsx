import EncabezadoSeccion from "../../moleculas/EncabezadoSeccion";
import TarjetaEquipo from "../../moleculas/TarjetaEquipo";
import { equipo } from "../../../datos/nosotros";

function EquipoNosotros() {
  return (
    <section className="nosotros-seccion pt-0">
      <div className="container">
        <EncabezadoSeccion
          subtitulo="Detrás del mesón"
          titulo="Las personas que te reciben"
          descripcion="Un equipo pequeño, cercano y con los pies en la tienda. El dueño y dos vendedores están aquí para escucharte y ayudarte a elegir."
        />

        <div className="row g-4 justify-content-center">
          {equipo.map((persona) => (
            <div className="col-12 col-md-4" key={`${persona.rol}-${persona.nombre}`}>
              <TarjetaEquipo {...persona} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EquipoNosotros;
