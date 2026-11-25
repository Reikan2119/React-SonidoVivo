import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Productos from './paginas/Productos'
import DetalleProducto from './paginas/DetalleProducto'
import Admin from './paginas/Admin'
import Nosotros from './paginas/Nosotros'
import Footer from './componentes/organismos/Footer'
import Contacto from './paginas/Contacto'
import Carrito from './paginas/Carrito'
import ListadoContactos from './paginas/ListadoContactos'
import MisPedidos from './paginas/MisPedidos'
import AdminPedidos from './paginas/AdminPedidos'
import AdminUsuarios from './paginas/AdminUsuarios'
import AdminProductos from './paginas/AdminProductos'
import RutaProtegida from './componentes/organismos/RutaProtegida'
import LayoutAdmin from './componentes/organismos/LayoutAdmin'

function App() {
  const { pathname } = useLocation();
  const enPanelAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return(
    <div className="d-flex flex-column min-vh-100">
      {!enPanelAdmin && <Navbar />}

      <main className="flex-grow-1">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Requieren haber iniciado sesión */}
          <Route path="/mis-pedidos" element={<RutaProtegida><MisPedidos /></RutaProtegida>} />

          {/* Panel de administración: solo ADMIN */}
          <Route path="/admin" element={<RutaProtegida soloAdmin><LayoutAdmin /></RutaProtegida>}>
            <Route index element={<Admin />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route path="pedidos" element={<AdminPedidos />} />
            <Route path="mensajes" element={<ListadoContactos />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
          </Route>
        </Routes>
      </main>

      {!enPanelAdmin && <Footer />}
    </div>
  )
}

export default App;
