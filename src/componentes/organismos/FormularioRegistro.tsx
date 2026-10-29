import { useState } from "react";
import { Link } from "react-router-dom";
import { registrarUsuario } from "../../paginas/paginaLogin";

function FormularioRegistro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.includes(".com");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValido(email)) {
      setError("El correo debe tener formato válido (ej: usuario@dominio.com).");
      return;
    }
    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    registrarUsuario({ nombre, apellido, email, password });
    alert("Usuario registrado correctamente.");
    window.location.href = "/login";
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4" style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Apellido</label>
        <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Repetir contraseña</label>
        <input type="password" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
      </div>
      {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
      <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
        Registrarse
      </button>
      <p className="text-center mt-3 mb-0">
        ¿Ya tienes cuenta? <Link to="/login" style={{ color: "#d98e2f" }}>Inicia sesión</Link>
      </p>
    </form>
  );
}

export default FormularioRegistro;