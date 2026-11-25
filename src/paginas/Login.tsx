import FormularioLogin from "../componentes/organismos/FormularioLogin";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center">Inicio De Sesion</h2>
            <FormularioLogin />
            <div className="text-center mt-3">
              <p className="mb-1 text-muted">¿No tienes una cuenta?</p>
              <Link to="/registro" className="btn btn-outline-secondary w-100 fw-bold">Registrarse</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
