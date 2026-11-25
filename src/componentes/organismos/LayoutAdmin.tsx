import { Outlet, useNavigate } from "react-router-dom";
import { obtenerUsuario, cerrarSesion } from "../../api/sesion";

function LayoutAdmin() {
  const usuario = obtenerUsuario();
  const navegacion = useNavigate();

  const salir = () => {
    cerrarSesion();
    navegacion("/");
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand fw-bold" style={{ color: "#d98e2f" }}>
          SonidoVivo — Panel Admin
        </span>
        <div className="d-flex gap-2">
          <span className="navbar-text text-light small">{usuario?.nombre}</span>
          <button className="btn btn-outline-light btn-sm" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      </nav>
      <div className="d-flex">
        <aside className="bg-light border-end" style={{ minWidth: 200, minHeight: "100vh" }}>
          <ul className="nav flex-column p-3">
            <li className="nav-item"><a className="nav-link" href="/admin">Resumen</a></li>
            <li className="nav-item"><a className="nav-link" href="/admin/productos">Productos</a></li>
            <li className="nav-item"><a className="nav-link" href="/admin/pedidos">Pedidos</a></li>
            <li className="nav-item"><a className="nav-link" href="/admin/mensajes">Mensajes</a></li>
            <li className="nav-item"><a className="nav-link" href="/admin/usuarios">Usuarios</a></li>
          </ul>
        </aside>
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LayoutAdmin;
