import { Link } from "react-router-dom";
import { imagenesHero } from "../../../datos/nosotros";

function HeroNosotros() {
  return (
    <section className="nosotros-hero">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-7">
            <span className="nosotros-etiqueta">
              <span aria-hidden="true">🎵</span> Viña del Mar · Región de Valparaíso
            </span>
            <h1 className="nosotros-titulo">
              Más de una década <span className="texto-ambar">haciendo sonar</span> la música de nuestra ciudad.
            </h1>
            <p className="nosotros-lead">
              Somos SonidoVivo, una tienda especializada en instrumentos musicales, equipos de sonido y
              accesorios para músicos. Desde hace 11 años te acompañamos con asesoría cercana y un catálogo
              de 340 referencias.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/productos" className="btn-sonido">
                Explorar catálogo
              </Link>
              <Link to="/contacto" className="btn-sonido-outline">
                Hablar con nosotros
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="nosotros-collage" aria-label="Instrumentos destacados de SonidoVivo">
              {imagenesHero.map((imagen) => (
                <div className="collage-item" key={imagen.src}>
                  <img src={imagen.src} alt={imagen.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroNosotros;
