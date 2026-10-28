import { useParams, Link } from "react-router-dom";
import { guitarras, bajos, baterias, teclados, accesorios } from "./paginaInstrumentos";
import { cuerdas, otros } from "./paginaAccesorios";

const todos = [
  ...guitarras, ...bajos, ...baterias, ...teclados, ...accesorios, ...cuerdas, ...otros,
];

function getCaracteristicas(titulo: string): string[] {
  const t = titulo.toLowerCase();
  if (t.includes("guitarra")) return ["Cuerpo de madera", "6 cuerdas", "Diapasón de palorrosa", "Incluye estuche básico"];
  if (t.includes("bajo")) return ["4 cuerdas", "Escala 34\"", "Pastillas de alto rendimiento", "Clavijas selladas"];
  if (t.includes("bater")) return ["Bombo, tarola y toms", "Platillos incluidos", "Pedal de bombo", "Baquetas incluidas"];
  if (t.includes("teclado") || t.includes("sintetizador")) return ["Teclas sensibles a la velocidad", "Sonidos variados", "Salida MIDI/USB", "Altavoces integrados"];
  if (t.includes("cuerda")) return ["Material de alta calidad", "Calibre estándar", "Larga duración", "Fácil instalación"];
  if (t.includes("afinador")) return ["Cromático", "Pantalla LCD", "Clip giratorio", "Alta precisión"];
  if (t.includes("cable")) return ["Conectores de 1/4\"", "Longitud 3 metros", "Blindaje contra interferencias", "Duradero"];
  if (t.includes("capotraste")) return ["Ajuste rápido", "Compatible con la mayoría de guitarras", "Material de acero", "Diseño ergonómico"];
  if (t.includes("púa") || t.includes("puas")) return ["Grosor medio", "Material de celuloide", "Pack de 12 unidades", "Agarre antideslizante"];
  if (t.includes("soporte")) return ["Altura ajustable", "Base antideslizante", "Plegable", "Soporta hasta 10 kg"];
  return ["Producto de calidad", "Garantía de 6 meses", "Envío disponible", "Soporte técnico"];
}

function DetalleProducto() {
  const { id } = useParams();
  const producto = todos.find((p) => String(p.id) === String(id));

  if (!producto) {
    return (
      <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }} className="py-5 text-center">
        <h2 style={{ color: "#d98e2f" }}>Producto no encontrado</h2>
        <Link to="/instrumentos" style={{ color: "#f5f0e1" }}>Volver</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#1c1a17", color: "#f5f0e1" }}>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center">
              <img src={producto.imagen} alt={producto.titulo} className="img-fluid" style={{ maxHeight: 400, objectFit: "contain" }} />
            </div>
            <div className="col-12 col-md-6">
              <div className="card p-4" style={{ backgroundColor: "#2a241c", border: "1px solid #d98e2f", color: "#f5f0e1" }}>
                <h1 className="fw-bold" style={{ color: "#d98e2f" }}>{producto.titulo}</h1>
                <p className="lead" style={{ color: "#f5f0e1" }}>{producto.descripcion}</p>
                <p className="fs-3 fw-bold" style={{ color: "#b5731e" }}>
                  ${producto.precio.toLocaleString("es-CL")}
                </p>
                <h5 className="mt-3" style={{ color: "#d98e2f" }}>Características</h5>
                <ul>
                  {getCaracteristicas(producto.titulo).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <Link to="/instrumentos" className="btn mt-2" style={{ backgroundColor: "#d98e2f", color: "#1c1a17" }}>
                  Volver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetalleProducto;