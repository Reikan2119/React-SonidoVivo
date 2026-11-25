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

  const activo = (ruta: string) => (ubicacion.pathname === ruta ? "activo" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-sonido">
      <div className="container">
        <Link className="navbar-brand" to="/">
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
          <ul className="navbar-nav links align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <Link className={`nav-link ${activo("/")}`} to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activo("/productos")}`} to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activo("/nosotros")}`} to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activo("/contacto")}`} to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activo("/carrito")}`} to="/carrito">
                Carrito {cantidad > 0 && (<span className="badge rounded-pill ms-1">{cantidad}</span>)}
              </Link>
            </li>
            {usuario && usuario.rol !== "ADMINISTRADOR" && (
              <li className="nav-item">
                <Link className={`nav-link ${activo("/mis-pedidos")}`} to="/mis-pedidos">Mis pedidos</Link>
              </li>
            )}
            {esAdmin && (
              <li className="nav-item">
                <Link className="nav-link nav-link-dorado" to="/admin">Panel admin</Link>
              </li>
            )}
            <li className="nav-item">
              {usuario ? (
                <a href="#logout" className="nav-link nav-link-salir" onClick={(e) => { e.preventDefault(); cerrar(); }}>
                  Cerrar Sesión ({usuario.nombre})
                </a>
              ) : (
                <Link className={`nav-link ${activo("/login")}`} to="/login">Iniciar Sesión</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;