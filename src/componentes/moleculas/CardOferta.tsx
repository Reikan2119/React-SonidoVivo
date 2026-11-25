import Boton from "../atomos/Boton";
import BotonComprar from "../atomos/BotonComprar";
import { agregarAlCarrito } from "../../api/carrito";
import { obtenerUsuario } from "../../api/sesion";

interface CardOfertaProps {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  precioAnterior: number;
  imagen: string;
  stock?: number;
}

function CardOferta({ id, titulo, descripcion, precio, precioAnterior, imagen, stock = 0 }: CardOfertaProps) {
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
      alert(e instanceof Error ? e.message : "No se pudo agregar");
    }
  };

  return (
    <div className="card" style={{ width: "100%", maxWidth: "21rem", backgroundColor: "#ffffff", border: "1px solid #b5731e", color: "#000000" }}>
      <img src={imagen} className="card-img-top" alt={titulo} style={{ height: "200px", objectFit: "contain" }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descripcion}</p>
        <p className="mb-1" style={{ color: "#888", textDecoration: "line-through" }}>
          ${precioAnterior.toLocaleString("es-CL")}
        </p>
        <p className="card-test" style={{ color: "#b5731e", fontWeight: "bold" }}>
          ${precio.toLocaleString("es-CL")}
        </p>
        <p className="mb-2 small" style={{ color: "#555" }}>Stock: {stock}</p>
        <div className="mt-auto d-flex gap-2">
          <Boton id={id} />
          <BotonComprar disabled={stock <= 0} onClick={handleComprar}>
            {stock <= 0 ? "Sin stock" : "Comprar"}
          </BotonComprar>
        </div>
      </div>
    </div>
  );
}

export default CardOferta;
