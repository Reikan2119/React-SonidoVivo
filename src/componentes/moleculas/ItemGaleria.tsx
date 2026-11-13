import { Link } from "react-router-dom";
import type { ItemGaleria as ItemGaleriaTipo } from "../../tipos/nosotros";

function ItemGaleria({ id, src, alt, etiqueta }: ItemGaleriaTipo) {
  return (
    <Link to={`/producto/${id}`} className="nosotros-galeria-item">
      <img src={src} alt={alt} />
      <span className="nosotros-galeria-etiqueta">{etiqueta}</span>
    </Link>
  );
}

export default ItemGaleria;
