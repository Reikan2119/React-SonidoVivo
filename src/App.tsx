import { Routes, Route } from "react-router-dom";
import PaginaInicio from "./componentes/paginas/paginaInicio";
import Intrumentos from "./componentes/paginas/paginaInstrumentos";
import Accesorios from "./componentes/paginas/paginaAccesorios";
import Navbar from "./componentes/organismos/Navbar";

function App() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: "#1c1a17" }}>
      <Navbar/>

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

      </Routes>
    </div>
  )
}

export default App
