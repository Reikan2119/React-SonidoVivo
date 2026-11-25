import FormularioRegistro from "../componentes/organismos/FormularioRegistro";
import { Link } from "react-router-dom";

function Registro() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center">Registro</h2>
            <FormularioRegistro />
            <p className="text-center mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/login" style={{ color: "#d98e2f" }}>Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Registro;
