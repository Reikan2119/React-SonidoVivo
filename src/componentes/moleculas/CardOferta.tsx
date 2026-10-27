import Boton from "../atomos/Boton";

interface CardOfertaProps {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  precioAnterior: number;
  imagen: string;
}

function CardOferta({ id, titulo, descripcion, precio, precioAnterior, imagen }: CardOfertaProps) {
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
        <div className="mt-auto">
          <Boton id={id} />
        </div>
      </div>
    </div>
  );
}

export default CardOferta;