import { useState } from "react";

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Contacto</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            ¿Tienes dudas? Escríbenos.
          </p>
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-8 col-lg-6">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacto;
