import { Link } from "react-router-dom";

function Logout() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container text-center">
          <h1 className="fw-bold" style={{ color: "#d98e2f" }}>Sesión cerrada</h1>
          <p className="lead" style={{ color: "#f5f0e1" }}>
            Has cerrado sesión correctamente.
          </p>
          <Link to="/" className="btn mt-3" style={{ backgroundColor: "#d98e2f", color: "#1c1a17", fontWeight: "bold" }}>
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Logout;