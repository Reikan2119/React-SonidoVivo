import { useEffect, useState } from "react";
import Boton from "../atomos/Boton";
import BotonComprar from "../atomos/BotonComprar";
import { addToCarrito, getCarrito } from "../../utils/carrito";
import { getStock } from "../../utils/stock";

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
  const [stockEfectivo, setStockEfectivo] = useState(getStock(id, stock));
  useEffect(() => {
    const update = () => setStockEfectivo(getStock(id, stock));
    window.addEventListener("stock-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("stock-updated", update);
      window.removeEventListener("storage", update);
    };
  }, [id, stock]);
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
        <p className="mb-2 small" style={{ color: "#555" }}>
          Stock: {stockEfectivo}
        </p>
        <div className="mt-auto d-flex gap-2">
          <Boton id={id} />
          <BotonComprar
            disabled={stockEfectivo <= 0}
            onClick={() => {
              const actual = getCarrito().find((i) => i.id === id)?.cantidad || 0;
              if (actual >= stockEfectivo) {
                alert("No puedes agregar más, stock insuficiente.");
                return;
              }
              addToCarrito({ id, titulo, precio, imagen });
            }}
          >
            {stockEfectivo <= 0 ? "Sin stock" : "Comprar"}
          </BotonComprar>
        </div>
      </div>
    </div>
  );
}

export default CardOferta;