import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contacto() {
  return (
    <div className="pagina pagina-contacto">
      <header className="encabezado-pagina">
        <div className="container">
          <h1>Contacto</h1>
        </div>
      </header>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <FormularioContacto />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;