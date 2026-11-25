import Boton from "../atomos/Boton";
import { mensajeError } from "../../api/config";
import BotonComprar from "../atomos/BotonComprar";
import { agregarAlCarrito } from "../../api/carrito";
import { obtenerUsuario } from "../../api/sesion";

interface CardProps {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock?: number;
}

function CardProducto({ id, titulo, descripcion, precio, imagen, stock = 0 }: CardProps) {
  const usuario = obtenerUsuario();

  const handleComprar = async () => {
    if (!usuario) {
      alert("Inicia sesión para agregar al carrito");
      return;
    }
    try {
      await agregarAlCarrito(usuario.id, id, 1);
      window.dispatchEvent(new Event("carritoActualizado"));
      alert("Agregado al carrito");
    } catch (e) {
      alert(mensajeError(e, "No se pudo agregar"));
    }
  };

  return (
    <article className="tarjeta-producto" style={{ width: "100%", maxWidth: "21rem" }}>
      <div className="tarjeta-imagen">
        <img src={imagen} alt={titulo} />
      </div>
      <div className="tarjeta-cuerpo">
        <h5 className="tarjeta-titulo">{titulo}</h5>
        <p className="tarjeta-descripcion">{descripcion}</p>
        <p className="tarjeta-precio">${precio.toLocaleString("es-CL")}</p>
        <span className={`stock-pill ${stock <= 0 ? "agotado" : ""}`}>Stock: {stock}</span>
        <div className="tarjeta-acciones">
          <Boton id={id} />
          <BotonComprar
            disabled={stock <= 0}
            onClick={handleComprar}
          >
            {stock <= 0 ? "Sin stock" : "Comprar"}
          </BotonComprar>
        </div>
      </div>
    </article>
  );
}
export default CardProducto;