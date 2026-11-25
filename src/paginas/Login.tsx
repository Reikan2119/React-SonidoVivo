import FormularioLogin from "../componentes/organismos/FormularioLogin";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="pagina pagina-auth">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="panel-formulario panel-auth">
              <h1 className="titulo-formulario">Inicio de sesión</h1>
              <p className="subtitulo-formulario">Accede a tu cuenta para comprar y revisar tus pedidos.</p>
              <FormularioLogin />
              <div className="separador-formulario">o</div>
              <div className="text-center">
                <p className="texto-suave mb-2">¿No tienes una cuenta?</p>
                <Link to="/registro" className="btn btn-sonido-outline w-100 fw-bold">Registrarse</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;