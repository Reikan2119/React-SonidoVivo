function Footer() {
  return (
    <footer className="text-center py-4" style={{ backgroundColor: "#000000" }}>
      <div className="container">
        <h5 className="mb-2" style={{ color: "#d98e2f" }}>SonidoVivo</h5>
        <p className="mb-3" style={{ color: "#f5f0e1" }}>
          Tu tienda de instrumentos y accesorios musicales.
        </p>
        <div className="d-flex justify-content-center gap-3 small mb-3">
          <a href="/" style={{ color: "#f5f0e1", textDecoration: "underline" }}>Inicio</a>
          <a href="/instrumentos" style={{ color: "#f5f0e1", textDecoration: "underline" }}>Instrumentos</a>
          <a href="/accesorios" style={{ color: "#f5f0e1", textDecoration: "underline" }}>Accesorios</a>
          <a href="/ofertas" style={{ color: "#f5f0e1", textDecoration: "underline" }}>Ofertas</a>
          <a href="/nosotros" style={{ color: "#f5f0e1", textDecoration: "underline" }}>Nosotros</a>
          <a href="/contacto" style={{ color: "#f5f0e1", textDecoration: "underline" }}>Contacto</a>
        </div>
        <p className="mb-0 small" style={{ color: "#f5f0e1" }}>
          © 2026 SonidoVivo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;