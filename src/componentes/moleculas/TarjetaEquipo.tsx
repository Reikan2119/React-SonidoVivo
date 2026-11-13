import type { MiembroEquipo } from "../../tipos/nosotros";

function TarjetaEquipo({ icono, nombre, rol, texto }: MiembroEquipo) {
  return (
    <article className="nosotros-equipo-card">
      <div className="nosotros-avatar" aria-hidden="true">
        {icono}
      </div>
      <p className="nosotros-rol">{rol}</p>
      <h3 className="nosotros-card-titulo">{nombre}</h3>
      <p className="nosotros-card-texto">{texto}</p>
    </article>
  );
}

export default TarjetaEquipo;
