import CardOferta from "../moleculas/CardOferta";

const img = (name: string) => encodeURI(`/img/Instrumentos/${name}`);

const ofertas = [
  { id: 104, titulo: "Guitarra Eléctrica SG", descripcion: "Guitarra eléctrica de cuerpo sólido", precio: 249990, precioAnterior: 299990, stock: 6, imagen: img("Guitarra_Eléctrica_SG.webp") },
  { id: 201, titulo: "Bajo Eléctrico Jazz Bass", descripcion: "Bajo de 4 cuerdas estilo jazz", precio: 299990, precioAnterior: 349990, stock: 4, imagen: img("BajoEléctricoJazzBass.webp") },
  { id: 402, titulo: "Teclado Digital 61 teclas", descripcion: "Teclado con sonidos variados", precio: 199990, precioAnterior: 249990, stock: 5, imagen: img("TecladoDigital61teclas.webp") },
  { id: 301, titulo: "Batería Acústica 5 piezas", descripcion: "Set completo para bateristas", precio: 499990, precioAnterior: 599990, stock: 2, imagen: img("BateríaAcústica5piezas.webp") },
  { id: 501, titulo: "Afinador de Clip", descripcion: "Afinador cromático de clip", precio: 9990, precioAnterior: 14990, stock: 10, imagen: img("AfinadordeClip.webp") },
];

function Ofertas() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Ofertas</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            Aprovecha nuestros descuentos por tiempo limitado.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <h2 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Descuentos destacados</h2>
          <div className="row g-4 justify-content-center">
            {ofertas.map((p) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={p.id}>
                <CardOferta {...p} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Ofertas;