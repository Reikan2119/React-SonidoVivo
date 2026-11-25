function Nosotros() {
  return (
    <div className="pagina pagina-nosotros">
      <header className="encabezado-pagina">
        <div className="container">
          <h1>Nosotros</h1>
        </div>
      </header>

      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <div className="panel-sonido">
              <h2 className="titulo-panel">Nuestra historia</h2>
              <p className="texto-destacado">
                Sonido Vivo nació hace más de 11 años en Viña del Mar, Región de Valparaíso,
                como un pequeño local atendido por su dueño y dos vendedores. Lo que comenzó
                como una pasión por los instrumentos musicales se convirtió en un punto de
                encuentro para músicos de toda la región.
              </p>
              <p className="texto-suave">
                Hoy contamos con un catálogo de más de 340 referencias distintas: guitarras,
                bajos, baterías, teclados, amplificadores, micrófonos, pedales de efectos y
                accesorios. Además, ofrecemos servicio de reparación de instrumentos de cuerda,
                realizado por nuestro equipo técnico especializado.
              </p>
              <p className="texto-suave">
                Durante años atendimos principalmente de forma presencial. Con el tiempo,
                comenzamos a recibir pedidos por WhatsApp e Instagram de clientes de otras
                ciudades, lo que nos motivó a crear esta tienda online para ofrecer un
                catálogo actualizado, stock en tiempo real y un flujo de compra claro y seguro.
              </p>
            </div>

            <div className="panel-sonido mt-4">
              <h2 className="titulo-panel">Misión y visión</h2>
              <p className="texto-suave mb-2">
                <strong className="text-light">Misión:</strong> acercar la música a todas las
                personas, entregando instrumentos y equipos de calidad con un servicio cercano y
                profesional.
              </p>
              <p className="texto-suave mb-0">
                <strong className="text-light">Visión:</strong> ser la tienda de referencia en
                la región para músicos de todos los niveles, combinando la atención personalizada
                de nuestra tienda física con la comodidad de la compra en línea.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="panel-sonido h-100">
              <h2 className="titulo-panel">Dónde estamos</h2>
              <p className="texto-suave">
                Visítanos en nuestra tienda física en Viña del Mar. También puedes retirar
                tus compras online en el punto de retiro disponible.
              </p>
              <div className="ratio ratio-4x3 rounded overflow-hidden border border-warning-subtle">
                <iframe
                  title="Ubicación Sonido Vivo"
                  src="https://www.google.com/maps?q=Vi%C3%B1a+del+Mar,+Chile&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="texto-tenue small mt-3 mb-0">
                Viña del Mar, Región de Valparaíso, Chile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;