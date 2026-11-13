import { Link } from "react-router-dom";
import "./paginaNosotros.css";

const imagenesHero = [
  { src: encodeURI("/img/Instrumentos/Guitarra_Eléctrica_SG.webp"), alt: "Guitarra eléctrica SG" },
  { src: encodeURI("/img/Instrumentos/TecladoDigital61teclas.webp"), alt: "Teclado digital de 61 teclas" },
  { src: encodeURI("/img/Instrumentos/BajoEléctricoJazzBass.webp"), alt: "Bajo eléctrico Jazz Bass" },
];

const estadisticas = [
  { numero: "+11", texto: "años de experiencia" },
  { numero: "340", texto: "referencias en catálogo" },
  { numero: "3", texto: "especialistas dedicados" },
  { numero: "100%", texto: "asesoría personalizada" },
];

const hitos = [
  {
    titulo: "Hace 11 años",
    texto: "Comenzamos a acompañar a los músicos de Viña del Mar desde nuestra tienda en la Región de Valparaíso.",
  },
  {
    titulo: "Siempre creciendo",
    texto: "Hoy el catálogo reúne 340 referencias y sumamos la reparación de instrumentos de cuerda.",
  },
  {
    titulo: "Últimos 3 años",
    texto: "Los pedidos remotos por WhatsApp e Instagram nos mostraron que la música no tiene fronteras.",
  },
  {
    titulo: "Hoy",
    texto: "Damos el salto al mundo digital para que más músicos de Chile puedan conocernos y comprar en línea.",
  },
];

const pilares = [
  {
    icono: "🎯",
    titulo: "Misión",
    texto:
      "Ofrecer instrumentos, equipos de sonido y accesorios de calidad para músicos de todos los niveles, con asesoría cercana y precios justos.",
  },
  {
    icono: "🔭",
    titulo: "Visión",
    texto:
      "Ser la tienda de referencia en instrumentos musicales de la Región de Valparaíso y un puente entre los músicos de Chile y el instrumento que buscan.",
  },
  {
    icono: "🤝",
    titulo: "Nuestra promesa",
    texto:
      "Escucharte antes de recomendarte. Queremos que te lleves el instrumento correcto y que sigas contando con nosotros después de la compra.",
  },
];

const valores = [
  {
    icono: "🎸",
    titulo: "Pasión por la música",
    texto: "Nos mueve lo mismo que a ti: encontrar ese sonido que hace que todo encaje.",
  },
  {
    icono: "🗣️",
    titulo: "Asesoría cercana",
    texto: "Conversamos contigo, entendemos tu estilo y te mostramos alternativas sin apuro.",
  },
  {
    icono: "✅",
    titulo: "Calidad y confianza",
    texto: "Trabajamos con productos que conocemos y recomendamos solo lo que probaríamos nosotros.",
  },
  {
    icono: "🤟",
    titulo: "Compromiso con el músico",
    texto: "Desde tu primer acorde hasta tu próxima presentación, queremos acompañarte.",
  },
];

const servicios = [
  {
    icono: "🎼",
    titulo: "Instrumentos para cada nivel",
    texto:
      "Guitarras, bajos, baterías, teclados y accesorios para quienes están empezando o quieren dar el siguiente salto.",
  },
  {
    icono: "💬",
    titulo: "Asesoría personalizada",
    texto:
      "Te escuchamos, conocemos el estilo que buscas y te ayudamos a elegir lo que realmente necesitas.",
  },
  {
    icono: "🛠️",
    titulo: "Reparación de cuerdas",
    texto:
      "Dejamos tu guitarra, bajo o instrumento de cuerda en las mejores condiciones para que siga sonando como debe.",
  },
  {
    icono: "📦",
    titulo: "Pedidos y despachos",
    texto:
      "Atendemos pedidos remotos y coordinamos envíos por Starken o Chilexpress para que tu instrumento llegue seguro.",
  },
];

const equipo = [
  {
    icono: "🎸",
    nombre: "El dueño",
    rol: "Fundador · Gestión",
    texto:
      "Coordina las compras a proveedores, el inventario y cada detalle para que la tienda funcione como corresponde.",
  },
  {
    icono: "🎧",
    nombre: "Vendedor",
    rol: "Asesoría en instrumentos",
    texto:
      "Te escucha, te muestra alternativas y te ayuda a probar el instrumento antes de tomar una decisión.",
  },
  {
    icono: "📦",
    nombre: "Vendedor",
    rol: "Atención y pedidos",
    texto:
      "Responde consultas, gestiona los pedidos remotos y coordina el despacho de tu compra.",
  },
];

const galeria = [
  {
    id: 101,
    src: encodeURI("/img/Instrumentos/Affinity Stratocaster.png"),
    alt: "Guitarra eléctrica Affinity Stratocaster",
    etiqueta: "Guitarras",
  },
  {
    id: 201,
    src: encodeURI("/img/Instrumentos/BajoEléctricoJazzBass.webp"),
    alt: "Bajo eléctrico Jazz Bass",
    etiqueta: "Bajos",
  },
  {
    id: 301,
    src: encodeURI("/img/Instrumentos/BateríaAcústica5piezas.webp"),
    alt: "Batería acústica de 5 piezas",
    etiqueta: "Baterías",
  },
  {
    id: 402,
    src: encodeURI("/img/Instrumentos/TecladoDigital61teclas.webp"),
    alt: "Teclado digital de 61 teclas",
    etiqueta: "Teclados",
  },
];

function Nosotros() {
  return (
    <div className="nosotros-pagina">
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

      <section className="nosotros-stats" aria-label="SonidoVivo en números">
        <div className="container">
          <div className="row g-0">
            {estadisticas.map((dato) => (
              <div className="col-6 col-lg-3" key={dato.texto}>
                <div className="nosotros-stat">
                  <div className="nosotros-stat-numero">{dato.numero}</div>
                  <div className="nosotros-stat-texto">{dato.texto}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nosotros-seccion">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-7">
              <p className="nosotros-subtitulo mb-2">Nuestra historia</p>
              <h2 className="nosotros-titulo-seccion mb-4">
                Más que una tienda, un punto de encuentro para músicos
              </h2>
              <p className="nosotros-texto">
                SonidoVivo nació en Viña del Mar con una idea simple: que cada músico encuentre el instrumento
                y el sonido que está buscando, sin importar si está dando sus primeros acordes o si lleva años
                sobre el escenario.
              </p>
              <p className="nosotros-texto">
                Durante más de una década hemos crecido junto a nuestros clientes. Hoy nuestro catálogo reúne
                340 referencias entre guitarras, bajos, baterías, teclados, amplificadores, micrófonos, pedales
                de efectos y accesorios. También ofrecemos reparación de instrumentos de cuerda, porque sabemos
                que un instrumento bien cuidado suena mejor y dura más.
              </p>
              <p className="nosotros-texto mb-0">
                En los últimos tres años empezamos a recibir pedidos por WhatsApp e Instagram de clientes de
                otras ciudades. Esa confianza nos impulsó a crear esta tienda en línea: un espacio para que
                puedas conocer el catálogo, revisar disponibilidad y contactarnos desde donde estés, con el
                mismo trato cercano de siempre.
              </p>
            </div>
            <div className="col-12 col-lg-5">
              <div className="nosotros-historia-caja">
                <p className="nosotros-subtitulo mb-3">Nuestro camino</p>
                <div className="nosotros-timeline">
                  {hitos.map((hito) => (
                    <div className="nosotros-hito" key={hito.titulo}>
                      <h3 className="nosotros-hito-titulo">{hito.titulo}</h3>
                      <p className="nosotros-hito-texto">{hito.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nosotros-seccion pt-0">
        <div className="container">
          <div className="text-center mb-4">
            <p className="nosotros-subtitulo mb-2">Lo que nos mueve</p>
            <h2 className="nosotros-titulo-seccion">Nuestra forma de entender la música</h2>
          </div>
          <div className="row g-4">
            {pilares.map((pilar) => (
              <div className="col-12 col-md-4" key={pilar.titulo}>
                <article className="nosotros-card">
                  <span className="nosotros-icono" aria-hidden="true">
                    {pilar.icono}
                  </span>
                  <h3 className="nosotros-card-titulo">{pilar.titulo}</h3>
                  <p className="nosotros-card-texto">{pilar.texto}</p>
                </article>
              </div>
            ))}
          </div>

          <div className="row g-3 mt-1">
            {valores.map((valor) => (
              <div className="col-12 col-sm-6 col-xl-3" key={valor.titulo}>
                <div className="nosotros-card">
                  <span className="nosotros-icono" aria-hidden="true">
                    {valor.icono}
                  </span>
                  <h3 className="nosotros-card-titulo">{valor.titulo}</h3>
                  <p className="nosotros-card-texto">{valor.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nosotros-seccion pt-0">
        <div className="container">
          <div className="text-center mb-4">
            <p className="nosotros-subtitulo mb-2">Lo que encontrarás</p>
            <h2 className="nosotros-titulo-seccion">Todo para que tu música suene mejor</h2>
          </div>
          <div className="row g-4">
            {servicios.map((servicio) => (
              <div className="col-12 col-md-6" key={servicio.titulo}>
                <article className="nosotros-card">
                  <span className="nosotros-icono" aria-hidden="true">
                    {servicio.icono}
                  </span>
                  <h3 className="nosotros-card-titulo">{servicio.titulo}</h3>
                  <p className="nosotros-card-texto">{servicio.texto}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nosotros-seccion pt-0">
        <div className="container">
          <div className="text-center mb-4">
            <p className="nosotros-subtitulo mb-2">Detrás del mesón</p>
            <h2 className="nosotros-titulo-seccion">Las personas que te reciben</h2>
            <p className="nosotros-texto mx-auto" style={{ maxWidth: "42rem" }}>
              Un equipo pequeño, cercano y con los pies en la tienda. El dueño y dos vendedores están aquí
              para escucharte y ayudarte a elegir.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {equipo.map((persona) => (
              <div className="col-12 col-md-4" key={`${persona.rol}-${persona.nombre}`}>
                <article className="nosotros-equipo-card">
                  <div className="nosotros-avatar" aria-hidden="true">
                    {persona.icono}
                  </div>
                  <p className="nosotros-rol">{persona.rol}</p>
                  <h3 className="nosotros-card-titulo">{persona.nombre}</h3>
                  <p className="nosotros-card-texto">{persona.texto}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nosotros-seccion pt-0">
        <div className="container">
          <div className="text-center mb-4">
            <p className="nosotros-subtitulo mb-2">Nuestro catálogo</p>
            <h2 className="nosotros-titulo-seccion">Un vistazo a lo que tenemos para ti</h2>
          </div>
          <div className="nosotros-galeria">
            {galeria.map((item) => (
              <Link to={`/producto/${item.id}`} className="nosotros-galeria-item" key={item.id}>
                <img src={item.src} alt={item.alt} />
                <span className="nosotros-galeria-etiqueta">{item.etiqueta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="nosotros-seccion pt-0">
        <div className="container">
          <div className="nosotros-cta-caja text-center">
            <p className="nosotros-subtitulo mb-2">Te esperamos</p>
            <h2 className="nosotros-titulo-seccion mb-3">¿Listo para encontrar tu próximo sonido?</h2>
            <p className="nosotros-texto mx-auto mb-4" style={{ maxWidth: "40rem" }}>
              Visítanos en Viña del Mar o escríbenos. Estamos aquí para ayudarte a elegir el instrumento, el
              equipo o el accesorio que necesitas.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/productos" className="btn-sonido">
                Ver catálogo
              </Link>
              <Link to="/contacto" className="btn-sonido-outline">
                Contactarnos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;
