import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardProducto from "../moleculas/CardProducto";
import CardOferta from "../moleculas/CardOferta";

export const guitarras = [
  { id: 101, titulo: "Affinity Stratocaster", descripcion: "Guitarra eléctrica estilo Stratocaster", precio: 399990, stock: 5, imagen: encodeURI("/img/Instrumentos/Affinity Stratocaster.png") },
  { id: 102, titulo: "Guitarra Acústica Folk", descripcion: "Guitarra acústica folk", precio: 199990, stock: 3, imagen: encodeURI("/img/Instrumentos/Guitarra Acústica Folk.jpg") },
  { id: 110, titulo: "Guitarra Acústica Folk II", descripcion: "Guitarra acústica folk (modelo 2)", precio: 209990, stock: 2, imagen: encodeURI("/img/Instrumentos/Guitarra Acústica Folk_2.jpg") },
  { id: 111, titulo: "Guitarra Acústica Folk III", descripcion: "Guitarra acústica folk (modelo 3)", precio: 219990, stock: 2, imagen: encodeURI("/img/Instrumentos/Guitarra Acústica Folk_3.jpg") },
  { id: 103, titulo: "Guitarra Dreadnought", descripcion: "Guitarra acústica dreadnought", precio: 229990, stock: 4, imagen: encodeURI("/img/Instrumentos/Guitarra_Dreadnought.png") },
  { id: 104, titulo: "Guitarra Eléctrica SG", descripcion: "Guitarra eléctrica de cuerpo sólido", precio: 299990, stock: 6, imagen: encodeURI("/img/Instrumentos/Guitarra_Eléctrica_SG.webp") },
  { id: 105, titulo: "Guitarra Eléctrica Telecaster", descripcion: "Guitarra eléctrica estilo Telecaster", precio: 329990, stock: 2, imagen: encodeURI("/img/Instrumentos/Guitarra_Eléctrica_Telecaster.webp") },
  { id: 106, titulo: "Les Paul", descripcion: "Guitarra eléctrica Les Paul", precio: 459990, stock: 1, imagen: encodeURI("/img/Instrumentos/Les Paul_1.webp") },
  { id: 107, titulo: "Takamine", descripcion: "Guitarra acústica Takamine", precio: 379990, stock: 3, imagen: encodeURI("/img/Instrumentos/Takamine .png") },
  { id: 108, titulo: "Yamaha C40", descripcion: "Guitarra clásica Yamaha", precio: 129990, stock: 8, imagen: encodeURI("/img/Instrumentos/yamaha-c40-guitarra-clasica.jpg") },
  { id: 109, titulo: "Yamaha JR1 3/4", descripcion: "Guitarra de tamaño 3/4", precio: 99990, stock: 5, imagen: encodeURI("/img/Instrumentos/Yamaha_JR1_3_4.png") },
];

export const bajos = [
  { id: 201, titulo: "Bajo Eléctrico Jazz Bass", descripcion: "Bajo de 4 cuerdas estilo jazz", precio: 349990, stock: 4, imagen: encodeURI("/img/Instrumentos/BajoEléctricoJazzBass.webp") },
  { id: 202, titulo: "Bajo Eléctrico 4 Cuerdas", descripcion: "Bajo eléctrico de 4 cuerdas", precio: 299990, stock: 3, imagen: encodeURI("/img/Instrumentos/Bajo_Eléctrico_4_Cuerdas.webp") },
];

export const baterias = [
  { id: 301, titulo: "Batería Acústica 5 piezas", descripcion: "Set completo para bateristas", precio: 599990, stock: 2, imagen: encodeURI("/img/Instrumentos/BateríaAcústica5piezas.webp") },
  { id: 302, titulo: "Caja Snare 14\"", descripcion: "Caja snare de 14 pulgadas", precio: 129990, stock: 6, imagen: encodeURI("/img/Instrumentos/CajaSnare14.webp") },
];

export const teclados = [
  { id: 401, titulo: "Sintetizador 49 teclas", descripcion: "Sintetizador Arturia", precio: 279990, stock: 3, imagen: encodeURI("/img/Instrumentos/Sintetizador49teclasArturia.webp") },
  { id: 402, titulo: "Teclado Digital 61 teclas", descripcion: "Teclado con sonidos variados", precio: 249990, stock: 5, imagen: encodeURI("/img/Instrumentos/TecladoDigital61teclas.webp") },
];

export const accesorios = [
  { id: 501, titulo: "Afinador de Clip", descripcion: "Afinador cromático de clip", precio: 14990, stock: 10, imagen: encodeURI("/img/Instrumentos/AfinadordeClip.webp") },
  { id: 502, titulo: "Cable de Instrumento", descripcion: "Cable para instrumento", precio: 9990, stock: 15, imagen: encodeURI("/img/Instrumentos/CableInstrumento.webp") },
  { id: 503, titulo: "Capotraste", descripcion: "Capotraste para guitarra", precio: 7990, stock: 12, imagen: encodeURI("/img/Instrumentos/CapotrasteGuitarra.webp") },
  { id: 504, titulo: "Cuerdas de Bajo", descripcion: "Set de cuerdas para bajo", precio: 12990, stock: 20, imagen: encodeURI("/img/Instrumentos/CuerdasBajo.webp") },
  { id: 505, titulo: "Cuerdas Guitarra Acústica", descripcion: "Set de cuerdas acústicas", precio: 9990, stock: 20, imagen: encodeURI("/img/Instrumentos/CuerdasGuitarraAcústica.webp") },
  { id: 506, titulo: "Cuerdas Guitarra Eléctrica", descripcion: "Set de cuerdas eléctricas", precio: 9990, stock: 20, imagen: encodeURI("/img/Instrumentos/CuerdasGuitarraEléctrica.webp") },
  { id: 507, titulo: "Púas de Guitarra", descripcion: "Set de púas", precio: 3990, stock: 30, imagen: encodeURI("/img/Instrumentos/PúasdeGuitarra.webp") },
  { id: 508, titulo: "Soporte de Guitarra", descripcion: "Soporte para guitarra", precio: 19990, stock: 7, imagen: encodeURI("/img/Instrumentos/SoporteGuitarra.webp") },
];

export const ofertas = [
  { id: 104, titulo: "Guitarra Eléctrica SG", descripcion: "Guitarra eléctrica de cuerpo sólido", precio: 249990, precioAnterior: 299990, stock: 6, imagen: encodeURI("/img/Instrumentos/Guitarra_Eléctrica_SG.webp") },
  { id: 201, titulo: "Bajo Eléctrico Jazz Bass", descripcion: "Bajo de 4 cuerdas estilo jazz", precio: 299990, precioAnterior: 349990, stock: 4, imagen: encodeURI("/img/Instrumentos/BajoEléctricoJazzBass.webp") },
  { id: 402, titulo: "Teclado Digital 61 teclas", descripcion: "Teclado con sonidos variados", precio: 199990, precioAnterior: 249990, stock: 5, imagen: encodeURI("/img/Instrumentos/TecladoDigital61teclas.webp") },
  { id: 301, titulo: "Batería Acústica 5 piezas", descripcion: "Set completo para bateristas", precio: 499990, precioAnterior: 599990, stock: 2, imagen: encodeURI("/img/Instrumentos/BateríaAcústica5piezas.webp") },
  { id: 501, titulo: "Afinador de Clip", descripcion: "Afinador cromático de clip", precio: 9990, precioAnterior: 14990, stock: 10, imagen: encodeURI("/img/Instrumentos/AfinadordeClip.webp") },
];

const secciones = [
  { titulo: "Guitarras", slug: "guitarras", items: guitarras, tipo: "producto" },
  { titulo: "Bajos", slug: "bajos", items: bajos, tipo: "producto" },
  { titulo: "Baterías", slug: "baterias", items: baterias, tipo: "producto" },
  { titulo: "Teclados", slug: "teclados", items: teclados, tipo: "producto" },
  { titulo: "Accesorios", slug: "accesorios", items: accesorios, tipo: "producto" },
  { titulo: "Ofertas", slug: "ofertas", items: ofertas, tipo: "oferta" },
];

function Productos() {
  const location = useLocation();
  const hash = location.hash.replace("#", "").toLowerCase();
  const visibles = hash ? secciones.filter((s) => s.slug === hash) : secciones;

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Productos</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            Explora nuestra variedad de instrumentos, accesorios y ofertas.
          </p>
        </div>
      </section>

      {visibles.map((sec) => (
        <section className="py-4" id={sec.slug} key={sec.titulo}>
          <div className="container">
            <h2 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>{sec.titulo}</h2>
            <div className="row g-4 justify-content-center">
              {sec.items.map((p: any) =>
                sec.tipo === "oferta" ? (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={p.id}>
                    <CardOferta {...p} />
                  </div>
                ) : (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={p.id}>
                    <CardProducto {...p} />
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default Productos;
