import CardProducto from "../moleculas/CardProducto";

function Intrumentos(){

    return(
        <div>

            <h1>Instrumentos</h1>

            <div className="d-flex gap-3">

                <CardProducto
                    id={1}
                    titulo="Bajo fender"
                    descripcion="Bajo de 4 cuerdas fender"
                    precio={700000}
                    imagen="public\img\Instrumentos\BajoEléctricoJazzBass.webp"
                />

            </div>
        </div>
    )
}
export default Intrumentos;