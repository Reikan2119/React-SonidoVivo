import Boton from "../atomos/Boton";
import { addToCarrito, getCarrito } from "../../utils/carrito";

interface CardProps{
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    stock?: number;
}

function CardProducto({id, titulo, descripcion, precio, imagen, stock = 0}: CardProps){

    return(
        <div className="card" style={{width: '100%', maxWidth: '21rem', backgroundColor: "#ffffff", border: '1px solid #b5731e', color: "#000000"}}>
            <img src={imagen} 
            className="card-img-top"
            alt={titulo}
            style={{height: '200px', objectFit: 'contain'}} />
            <div className="card-body d-flex flex-column">

                <h5 className="card-body">
                    {titulo}
                </h5>

                <p className="card-text">
                    {descripcion}
                </p>

                <p className="card-test" style={{ color: "#b5731e", fontWeight: "bold" }}>
                    ${precio.toLocaleString("es-CL")}
                </p>
                <p className="mb-2 small" style={{ color: "#555" }}>
                    Stock: {stock}
                </p>

                <div className="mt-auto d-flex gap-2">
                    <Boton id={id}/>
                    <button
                      className="btn btn-success"
                      disabled={stock <= 0}
                      onClick={() => {
                        const actual = getCarrito().find((i) => i.id === id)?.cantidad || 0;
                        if (actual >= stock) {
                          alert("No puedes agregar más, stock insuficiente.");
                          return;
                        }
                        addToCarrito({ id, titulo, precio, imagen });
                      }}
                    >
                      {stock <= 0 ? "Sin stock" : "Comprar"}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CardProducto;