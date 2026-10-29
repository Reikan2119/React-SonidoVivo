import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSesion, actualizarUsuario } from "../../utils/auth";

function Perfil() {
  const navigate = useNavigate();
  const sesion = getSesion();
  const [nombre, setNombre] = useState(sesion?.nombre || "");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (!sesion) navigate("/login");
  }, [sesion, navigate]);

  if (!sesion) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== password2) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }
    const cambios: { nombre?: string; password?: string } = { nombre };
    if (password) cambios.password = password;
    actualizarUsuario(sesion.email, cambios);
    setMensaje("Perfil actualizado correctamente.");
    setPassword("");
    setPassword2("");
  };

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
              <form onSubmit={handleSubmit} className="card p-4" style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}>
                <h1 className="text-center fw-bold mb-3" style={{ color: "#d98e2f" }}>Mi Perfil</h1>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nueva contraseña (opcional)</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Repetir contraseña</label>
                  <input type="password" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                </div>
                {mensaje && <p style={{ color: "#d98e2f" }}>{mensaje}</p>}
                <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Perfil;