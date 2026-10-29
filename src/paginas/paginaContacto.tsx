import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contacto() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Contacto</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            ¿Tienes dudas? Escríbenos.
          </p>
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-8 col-lg-6">
              <FormularioContacto />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacto;