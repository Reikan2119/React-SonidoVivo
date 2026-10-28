import { Routes, Route } from "react-router-dom";
import PaginaInicio from "./componentes/paginas/paginaInicio";
import Intrumentos from "./componentes/paginas/paginaInstrumentos";
import Accesorios from "./componentes/paginas/paginaAccesorios";
import Ofertas from "./componentes/paginas/paginaOfertas";
import Nosotros from "./componentes/paginas/paginaNosotros";
import Contacto from "./componentes/paginas/paginaContacto";
import DetalleProducto from "./componentes/paginas/paginaDetalleProducto";
import Carrito from "./componentes/paginas/paginaCarrito";
import Login from "./componentes/paginas/paginaLogin";
import Registro from "./componentes/paginas/paginaRegistro";
import Navbar from "./componentes/organismos/Navbar";
import Footer from "./componentes/organismos/Footer";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#1c1a17" }}>
      <Navbar/>

      <main className="flex-grow-1">
        <Routes>

          <Route
          path="/"
          element={<PaginaInicio/>}
          />

          <Route
          path="/instrumentos"
          element={<Intrumentos/>}
          />

          <Route
          path="/accesorios"
          element={<Accesorios/>}
          />

          <Route
          path="/ofertas"
          element={<Ofertas/>}
          />

          <Route
          path="/nosotros"
          element={<Nosotros/>}
          />

          <Route
          path="/contacto"
          element={<Contacto/>}
          />

          <Route
          path="/producto/:id"
          element={<DetalleProducto/>}
          />

          <Route
          path="/carrito"
          element={<Carrito/>}
          />

          <Route
          path="/login"
          element={<Login/>}
          />

          <Route
          path="/registro"
          element={<Registro/>}
          />

        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
