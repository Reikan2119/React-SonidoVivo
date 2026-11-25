import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contacto() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">Contacto</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioContacto />
        </div>
      </div>
    </div>
  );
}

export default Contacto;
