import type { Estadistica as EstadisticaTipo } from "../../tipos/nosotros";

function Estadistica({ numero, texto }: EstadisticaTipo) {
  return (
    <div className="nosotros-stat">
      <div className="nosotros-stat-numero">{numero}</div>
      <div className="nosotros-stat-texto">{texto}</div>
    </div>
  );
}

export default Estadistica;
