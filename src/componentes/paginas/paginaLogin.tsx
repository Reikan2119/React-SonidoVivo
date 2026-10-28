import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario, setSesion } from "../../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = loginUsuario(email, password);
    if (u) {
      setSesion(u);
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <form onSubmit={handleSubmit} className="card p-4" style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}>
                <h1 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Iniciar sesión</h1>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
                <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
                  Entrar
                </button>
                <p className="text-center mt-3 mb-0">
                  ¿No tienes cuenta? <Link to="/registro" style={{ color: "#d98e2f" }}>Regístrate</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;