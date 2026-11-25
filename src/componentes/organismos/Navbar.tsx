import { Link, useNavigate, useLocation } from "react-router-dom";
import { obtenerUsuario, cerrarSesion as borrarSesion } from "../../api/sesion";
import { useEffect, useState } from "react";
import { obtenerCarrito } from "../../api/carrito";

function Navbar() {
  const ubicacion = useLocation();
  const navegacion = useNavigate();

  const usuario = obtenerUsuario();
  const esAdmin = usuario?.rol === "ADMINISTRADOR";
  const usuarioId = usuario?.id;
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    if (!usuarioId) {
      setCantidad(0);
      return;
    }
    const actualizar = () => {
      obtenerCarrito(usuarioId)
        .then((c) => setCantidad(c.items.reduce((sum, p) => sum + p.cantidad, 0)))
        .catch(() => setCantidad(0));
    };
    actualizar();
    window.addEventListener("carritoActualizado", actualizar);
    return () => window.removeEventListener("carritoActualizado", actualizar);
  }, [usuarioId, ubicacion.pathname]);

  const cerrar = () => {
    borrarSesion();
    navegacion("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-1 px-3">
      <Link className="navbar-brand logo" to="/" style={{ color: "#d98e2f", fontWeight: "bold" }}>
        SonidoVivo
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav links">
          <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          <li className="nav-item">
            <Link className="nav-link" to="/carrito">
              Carrito {cantidad > 0 && (<span className="badge rounded-pill bg-danger ms-1">{cantidad}</span>)}
            </Link>
          </li>
          {usuario && usuario.rol !== "ADMINISTRADOR" && (
            <li className="nav-item"><Link className="nav-link" to="/mis-pedidos">Mis pedidos</Link></li>
          )}
          {esAdmin && (
            <li className="nav-item"><Link className="nav-link fw-bold text-warning" to="/admin">Panel admin</Link></li>
          )}
          <li className="nav-item">
            {usuario ? (
              <a href="#logout" className="nav-link" onClick={(e) => { e.preventDefault(); cerrar(); }}>
                Cerrar Sesión ({usuario.nombre})
              </a>
            ) : (
              <Link className="nav-link" to="/login">Iniciar Sesión</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
