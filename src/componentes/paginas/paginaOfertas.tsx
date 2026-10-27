import CardOferta from "../moleculas/CardOferta";

function Ofertas() {
  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ color: "#d98e2f" }}>Ofertas</h1>
          <p className="text-center lead" style={{ color: "#f5f0e1" }}>
            Aprovecha nuestros descuentos por tiempo limitado.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Ofertas;