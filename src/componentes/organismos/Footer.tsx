function Footer() {
  return (
    <footer className="pie-sonido">
      <div className="container">
        <div className="pie-superior">
          <div>
            <h5 className="pie-marca">SonidoVivo</h5>
            <p className="pie-texto">Tu tienda de instrumentos y accesorios musicales.</p>
          </div>
          <nav className="pie-enlaces" aria-label="Enlaces del pie de página">
            <a href="/">Inicio</a>
            <a href="/productos">Productos</a>
            <a href="/nosotros">Nosotros</a>
            <a href="/contacto">Contacto</a>
          </nav>
        </div>
        <hr className="pie-divisor" />
        <p className="pie-copy">© 2026 SonidoVivo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;