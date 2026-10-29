import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

function Registro() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
              <h1 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Registro</h1>
              <FormularioRegistro />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registro;