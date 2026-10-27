import CardProducto from "../moleculas/CardProducto";

const img = (name: string) => encodeURI(`/img/Instrumentos/${name}`);

const cuerdas = [
  { id: 601, titulo: "Cuerdas de Bajo", descripcion: "Set de cuerdas para bajo", precio: 12990, imagen: img("CuerdasBajo.webp") },
  { id: 602, titulo: "Cuerdas Guitarra Acústica", descripcion: "Set de cuerdas acústicas", precio: 9990, imagen: img("CuerdasGuitarraAcústica.webp") },
  { id: 603, titulo: "Cuerdas Guitarra Eléctrica", descripcion: "Set de cuerdas eléctricas", precio: 9990, imagen: img("CuerdasGuitarraEléctrica.webp") },
];

const otros = [
  { id: 604, titulo: "Afinador de Clip", descripcion: "Afinador cromático de clip", precio: 14990, imagen: img("AfinadordeClip.webp") },
  { id: 605, titulo: "Cable de Instrumento", descripcion: "Cable para instrumento", precio: 9990, imagen: img("CableInstrumento.webp") },
  { id: 606, titulo: "Capotraste", descripcion: "Capotraste para guitarra", precio: 7990, imagen: img("CapotrasteGuitarra.webp") },
  { id: 607, titulo: "Púas de Guitarra", descripcion: "Set de púas", precio: 3990, imagen: img("PúasdeGuitarra.webp") },
  { id: 608, titulo: "Soporte de Guitarra", descripcion: "Soporte para guitarra", precio: 19990, imagen: img("SoporteGuitarra.webp") },
];

const secciones = [
  { titulo: "Cuerdas", slug: "cuerdas", items: cuerdas },
  { titulo: "Otros accesorios", slug: "otros", items: otros },
];

function Accesorios() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Accesorios</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            Todo lo que necesitas para tu instrumento.
          </p>
        </div>
      </section>

      {secciones.map((sec) => (
        <section className="py-4" key={sec.titulo}>
          <div className="container">
            <h2 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>{sec.titulo}</h2>
            <div className="row g-4 justify-content-center">
              {sec.items.map((p) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={p.id}>
                  <CardProducto {...p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <footer className="text-center py-4" style={{ backgroundColor: "#000000" }}>
        <div className="container">
          <p className="mb-0" style={{ color: "#f5f0e1" }}>© 2026 SonidoVivo - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default Accesorios;