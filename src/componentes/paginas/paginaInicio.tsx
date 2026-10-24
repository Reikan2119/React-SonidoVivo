import CardProducto from "../moleculas/CardProducto";

const AMARILLO = "#b5731e";

const destacados = [
  { id: 1, titulo: "Guitarra Eléctrica SG", descripcion: "Guitarra eléctrica de cuerpo sólido", precio: 299990, imagen: "/img/Instrumentos/Guitarra_El%C3%A9ctrica_SG.webp" },
  { id: 2, titulo: "Bajo Eléctrico Jazz Bass", descripcion: "Bajo de 4 cuerdas estilo jazz", precio: 349990, imagen: "/img/Instrumentos/BajoEl%C3%A9ctricoJazzBass.webp" },
  { id: 3, titulo: "Batería Acústica 5 piezas", descripcion: "Set completo para bateristas", precio: 599990, imagen: "/img/Instrumentos/Bater%C3%ADaAc%C3%BAstica5piezas.webp" },
  { id: 4, titulo: "Teclado Digital 61 teclas", descripcion: "Teclado con sonidos variados", precio: 249990, imagen: "/img/Instrumentos/TecladoDigital61teclas.webp" },
];

function PaginaInicio() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center text-md-start">
              <h1 className="display-4 fw-bold">
                Sonido<span style={{ color: AMARILLO }}>Vivo</span>
              </h1>
              <p className="lead text-white">
                Tu tienda de instrumentos y accesorios musicales. Encuentra guitarras, bajos, baterías, teclados y más.
              </p>
              <a href="/instrumentos" className="btn btn-lg fw-bold" style={{ backgroundColor: AMARILLO, color: "#000" }}>
                Ver instrumentos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías (sobre el carrusel) */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" style={{ color: AMARILLO }}>Categorías</h2>
          <div className="row g-3">
            {["Guitarras", "Bajos", "Baterías", "Teclados", "Accesorios"].map((cat) => (
              <div className="col-6 col-md-4 col-lg-2" key={cat}>
                <div className="card text-center bg-black h-100" style={{ border: `1px solid ${AMARILLO}` }}>
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <h5 className="card-title m-0" style={{ color: AMARILLO }}>{cat}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrusel */}
      <section className="py-4" style={{ backgroundColor: AMARILLO }}>
        <div className="container">
          <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover">
            <div className="carousel-inner rounded">
              {destacados.slice(0, 3).map((p, i) => (
                <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={p.id}>
                  <div className="d-flex justify-content-center py-4" style={{ minHeight: 360 }}>
                    <CardProducto {...p} />
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" style={{ color: AMARILLO }}>Productos destacados</h2>
          <div className="row g-4 justify-content-center">
            {destacados.map((p) => (
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center" key={p.id}>
                <CardProducto {...p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4" style={{ backgroundColor: "#111" }}>
        <div className="container">
          <p className="mb-0 text-white">© 2026 SonidoVivo - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default PaginaInicio;