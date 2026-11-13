import type {
  Estadistica,
  Hito,
  ImagenInstrumento,
  ItemGaleria,
  MiembroEquipo,
  TarjetaInfo,
} from "../tipos/nosotros";

export const imagenesHero: ImagenInstrumento[] = [
  { src: encodeURI("/img/Instrumentos/Guitarra_Eléctrica_SG.webp"), alt: "Guitarra eléctrica SG" },
  { src: encodeURI("/img/Instrumentos/TecladoDigital61teclas.webp"), alt: "Teclado digital de 61 teclas" },
  { src: encodeURI("/img/Instrumentos/BajoEléctricoJazzBass.webp"), alt: "Bajo eléctrico Jazz Bass" },
];

export const estadisticas: Estadistica[] = [
  { numero: "+11", texto: "años de experiencia" },
  { numero: "340", texto: "referencias en catálogo" },
  { numero: "3", texto: "especialistas dedicados" },
  { numero: "100%", texto: "asesoría personalizada" },
];

export const hitos: Hito[] = [
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

export const pilares: TarjetaInfo[] = [
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

export const valores: TarjetaInfo[] = [
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

export const servicios: TarjetaInfo[] = [
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

export const equipo: MiembroEquipo[] = [
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

export const parrafosHistoria: string[] = [
  "SonidoVivo nació en Viña del Mar con una idea simple: que cada músico encuentre el instrumento y el sonido que está buscando, sin importar si está dando sus primeros acordes o si lleva años sobre el escenario.",
  "Durante más de una década hemos crecido junto a nuestros clientes. Hoy nuestro catálogo reúne 340 referencias entre guitarras, bajos, baterías, teclados, amplificadores, micrófonos, pedales de efectos y accesorios. También ofrecemos reparación de instrumentos de cuerda, porque sabemos que un instrumento bien cuidado suena mejor y dura más.",
  "En los últimos tres años empezamos a recibir pedidos por WhatsApp e Instagram de clientes de otras ciudades. Esa confianza nos impulsó a crear esta tienda en línea: un espacio para que puedas conocer el catálogo, revisar disponibilidad y contactarnos desde donde estés, con el mismo trato cercano de siempre.",
];

export const galeria: ItemGaleria[] = [
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
