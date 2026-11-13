import type { TarjetaInfo } from "../../tipos/nosotros";

function TarjetaContenido({ icono, titulo, texto }: TarjetaInfo) {
  return (
    <article className="nosotros-card">
      <span className="nosotros-icono" aria-hidden="true">
        {icono}
      </span>
      <h3 className="nosotros-card-titulo">{titulo}</h3>
      <p className="nosotros-card-texto">{texto}</p>
    </article>
  );
}

export default TarjetaContenido;
