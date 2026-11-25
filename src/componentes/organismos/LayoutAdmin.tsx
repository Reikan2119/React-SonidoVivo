import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { obtenerUsuario, cerrarSesion } from "../../api/sesion";

function LayoutAdmin() {
  const usuario = obtenerUsuario();
  const navegacion = useNavigate();
  const { pathname } = useLocation();

  const salir = () => {
    cerrarSesion();
    navegacion("/");
  };

  const activo = (ruta: string) => (pathname === ruta ? "activo" : "");

  return (
    <div className="layout-admin">
      <header className="admin-barra">
        <span className="admin-marca">
          SonidoVivo <span className="admin-marca-sub">Panel Admin</span>
        </span>
        <div className="d-flex align-items-center gap-3">
          <span className="admin-usuario">{usuario?.nombre}</span>
          <button className="btn btn-sonido-outline btn-sm" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="admin-contenido">
        <aside className="admin-lateral">
          <ul className="nav flex-column gap-1">
            <li className="nav-item"><a className={`nav-link ${activo("/admin")}`} href="/admin">Resumen</a></li>
            <li className="nav-item"><a className={`nav-link ${activo("/admin/productos")}`} href="/admin/productos">Productos</a></li>
            <li className="nav-item"><a className={`nav-link ${activo("/admin/pedidos")}`} href="/admin/pedidos">Pedidos</a></li>
            <li className="nav-item"><a className={`nav-link ${activo("/admin/mensajes")}`} href="/admin/mensajes">Mensajes</a></li>
            <li className="nav-item"><a className={`nav-link ${activo("/admin/usuarios")}`} href="/admin/usuarios">Usuarios</a></li>
          </ul>
        </aside>
        <main className="admin-principal">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LayoutAdmin;