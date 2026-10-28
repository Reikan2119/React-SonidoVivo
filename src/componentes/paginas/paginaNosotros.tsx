function Nosotros() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Nosotros</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            SonidoVivo nace con la idea de acercar la música a todos.
          </p>
          <div className="row g-4 mt-3">
            <div className="col-12 col-md-6">
              <div className="card h-100" style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}>
                <div className="card-body">
                  <h3 style={{ color: "#d98e2f" }}>Misión</h3>
                  <p>Ofrecer instrumentos y accesorios de calidad para músicos de todos los niveles.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card h-100" style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}>
                <div className="card-body">
                  <h3 style={{ color: "#d98e2f" }}>Visión</h3>
                  <p>Ser la tienda de referencia en instrumentos musicales de la región.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;