import { useState } from "react";

function FormularioContacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4" style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input type="email" className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Mensaje</label>
        <textarea className="form-control" rows={4} required />
      </div>
      <button type="submit" className="btn fw-bold" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
        Enviar
      </button>
      {enviado && (
        <p className="mt-3 mb-0" style={{ color: "#d98e2f" }}>
          Mensaje enviado correctamente.
        </p>
      )}
    </form>
  );
}

export default FormularioContacto;