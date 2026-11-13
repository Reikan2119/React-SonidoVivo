import FormularioPerfil from "../componentes/organismos/FormularioPerfil";

function Perfil() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
              <FormularioPerfil />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Perfil;
