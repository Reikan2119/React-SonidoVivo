import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardProducto from "../moleculas/CardProducto";

const img = (name: string) => encodeURI(`/img/Instrumentos/${name}`);

const guitarras = [
  { id: 101, titulo: "Affinity Stratocaster", descripcion: "Guitarra eléctrica estilo Stratocaster", precio: 399990, imagen: img("Affinity Stratocaster.png") },
  { id: 102, titulo: "Guitarra Acústica Folk", descripcion: "Guitarra acústica folk", precio: 199990, imagen: img("Guitarra Acústica Folk.jpg") },
  { id: 103, titulo: "Guitarra Dreadnought", descripcion: "Guitarra acústica dreadnought", precio: 229990, imagen: img("Guitarra_Dreadnought.png") },
  { id: 104, titulo: "Guitarra Eléctrica SG", descripcion: "Guitarra eléctrica de cuerpo sólido", precio: 299990, imagen: img("Guitarra_Eléctrica_SG.webp") },
  { id: 105, titulo: "Guitarra Eléctrica Telecaster", descripcion: "Guitarra eléctrica estilo Telecaster", precio: 329990, imagen: img("Guitarra_Eléctrica_Telecaster.webp") },
  { id: 106, titulo: "Les Paul", descripcion: "Guitarra eléctrica Les Paul", precio: 459990, imagen: img("Les Paul_1.webp") },
  { id: 107, titulo: "Takamine", descripcion: "Guitarra acústica Takamine", precio: 379990, imagen: img("Takamine .png") },
  { id: 108, titulo: "Yamaha C40", descripcion: "Guitarra clásica Yamaha", precio: 129990, imagen: img("yamaha-c40-guitarra-clasica.jpg") },
  { id: 109, titulo: "Yamaha JR1 3/4", descripcion: "Guitarra de tamaño 3/4", precio: 99990, imagen: img("Yamaha_JR1_3_4.png") },
];

const bajos = [
  { id: 201, titulo: "Bajo Eléctrico Jazz Bass", descripcion: "Bajo de 4 cuerdas estilo jazz", precio: 349990, imagen: img("BajoEléctricoJazzBass.webp") },
  { id: 202, titulo: "Bajo Eléctrico 4 Cuerdas", descripcion: "Bajo eléctrico de 4 cuerdas", precio: 299990, imagen: img("Bajo_Eléctrico_4_Cuerdas.webp") },
];

const baterias = [
  { id: 301, titulo: "Batería Acústica 5 piezas", descripcion: "Set completo para bateristas", precio: 599990, imagen: img("BateríaAcústica5piezas.webp") },
  { id: 302, titulo: "Caja Snare 14\"", descripcion: "Caja snare de 14 pulgadas", precio: 129990, imagen: img("CajaSnare14.webp") },
];

const teclados = [
  { id: 401, titulo: "Sintetizador 49 teclas", descripcion: "Sintetizador Arturia", precio: 279990, imagen: img("Sintetizador49teclasArturia.webp") },
  { id: 402, titulo: "Teclado Digital 61 teclas", descripcion: "Teclado con sonidos variados", precio: 249990, imagen: img("TecladoDigital61teclas.webp") },
];

const accesorios = [
  { id: 501, titulo: "Afinador de Clip", descripcion: "Afinador cromático de clip", precio: 14990, imagen: img("AfinadordeClip.webp") },
  { id: 502, titulo: "Cable de Instrumento", descripcion: "Cable para instrumento", precio: 9990, imagen: img("CableInstrumento.webp") },
  { id: 503, titulo: "Capotraste", descripcion: "Capotraste para guitarra", precio: 7990, imagen: img("CapotrasteGuitarra.webp") },
  { id: 504, titulo: "Cuerdas de Bajo", descripcion: "Set de cuerdas para bajo", precio: 12990, imagen: img("CuerdasBajo.webp") },
  { id: 505, titulo: "Cuerdas Guitarra Acústica", descripcion: "Set de cuerdas acústicas", precio: 9990, imagen: img("CuerdasGuitarraAcústica.webp") },
  { id: 506, titulo: "Cuerdas Guitarra Eléctrica", descripcion: "Set de cuerdas eléctricas", precio: 9990, imagen: img("CuerdasGuitarraEléctrica.webp") },
  { id: 507, titulo: "Púas de Guitarra", descripcion: "Set de púas", precio: 3990, imagen: img("PúasdeGuitarra.webp") },
  { id: 508, titulo: "Soporte de Guitarra", descripcion: "Soporte para guitarra", precio: 19990, imagen: img("SoporteGuitarra.webp") },
];

const secciones = [
  { titulo: "Guitarras", slug: "guitarras", items: guitarras },
  { titulo: "Bajos", slug: "bajos", items: bajos },
  { titulo: "Baterías", slug: "baterias", items: baterias },
  { titulo: "Teclados", slug: "teclados", items: teclados },
  { titulo: "Accesorios", slug: "accesorios", items: accesorios },
];

function Instrumentos() {
  const location = useLocation();
  const hash = location.hash.replace("#", "").toLowerCase();
  const visibles = hash ? secciones.filter((s) => s.slug === hash) : secciones;

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Instrumentos</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            Explora nuestra variedad de instrumentos y accesorios musicales.
          </p>
        </div>
      </section>

      {visibles.map((sec) => (
        <section className="py-4" id={sec.slug} key={sec.titulo}>
          <div className="container">
            <h2 className="fw-bold mb-3" style={{ color: "#d98e2f" }}>{sec.titulo}</h2>
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

export default Instrumentos;