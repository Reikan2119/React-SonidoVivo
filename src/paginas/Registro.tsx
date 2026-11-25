import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

function Registro() {
  return (
    <div className="pagina pagina-auth">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7">
            <div className="panel-formulario panel-auth">
              <h1 className="titulo-formulario">Crear cuenta</h1>
              <p className="subtitulo-formulario">Regístrate para comprar en SonidoVivo.</p>
              <FormularioRegistro />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Registro;