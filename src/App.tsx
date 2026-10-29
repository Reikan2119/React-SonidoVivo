import { Routes, Route } from "react-router-dom";
import './App.css'
import PaginaInicio from "./paginas/paginaInicio";
import Productos from "./paginas/paginaProductos";
import Nosotros from "./paginas/paginaNosotros";
import Contacto from "./paginas/paginaContacto";
import DetalleProducto from "./paginas/paginaDetalleProducto";
import Carrito from "./paginas/paginaCarrito";
import Login from "./paginas/paginaLogin";
import Registro from "./paginas/paginaRegistro";
import Admin from "./paginas/paginaAdmin";
import Logout from "./paginas/paginaLogout";
import Perfil from "./paginas/paginaPerfil";
import Navbar from "./componentes/organismos/Navbar";
import Footer from "./componentes/organismos/Footer";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#1c1a17" }}>
      <Navbar/>

      <main className="flex-grow-1">
        <Routes>

          <Route path="/" element={<PaginaInicio/>} />

          <Route path="/productos" element={<Productos/>} />

          <Route path="/nosotros" element={<Nosotros/>} />

          <Route path="/contacto" element={<Contacto/>} />

          <Route path="/producto/:id" element={<DetalleProducto/>} />

          <Route path="/carrito" element={<Carrito/>} />

          <Route path="/login" element={<Login/>} />

          <Route path="/registro" element={<Registro/>} />

          <Route path="/admin" element={<Admin/>} />

          <Route path="/logout" element={<Logout/>} />

          <Route path="/perfil" element={<Perfil/>} />

        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
