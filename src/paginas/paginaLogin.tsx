import { useLocation } from "react-router-dom";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

function Login() {
  const location = useLocation();
  const registrado = Boolean((location.state as { registrado?: boolean } | null)?.registrado);

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <h1 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Iniciar sesión</h1>
              {registrado && (
                <div
                  className="alert py-2 px-3 mb-3"
                  role="status"
                  style={{ backgroundColor: "#1f3d2b", border: "1px solid #4caf50", color: "#b9f6ca" }}
                >
                  Tu cuenta fue creada correctamente. Ya puedes iniciar sesión.
                </div>
              )}
              <FormularioLogin />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
