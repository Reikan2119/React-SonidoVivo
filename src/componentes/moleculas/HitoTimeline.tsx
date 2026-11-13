import type { Hito } from "../../tipos/nosotros";

function HitoTimeline({ titulo, texto }: Hito) {
  return (
    <div className="nosotros-hito">
      <h3 className="nosotros-hito-titulo">{titulo}</h3>
      <p className="nosotros-hito-texto">{texto}</p>
    </div>
  );
}

export default HitoTimeline;
