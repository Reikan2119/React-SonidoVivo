import { Routes, Route } from "react-router-dom";
import PaginaInicio from "./componentes/paginas/paginaInicio";
import Intrumentos from "./componentes/paginas/paginaInstrumentos";
import Accesorios from "./componentes/paginas/paginaAccesorios";
import Ofertas from "./componentes/paginas/paginaOfertas";
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

        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
