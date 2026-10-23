import { Routes, Route } from "react-router-dom";
import PaginaInicio from "./componentes/paginas/paginaInicio";
import Intrumentos from "./componentes/paginas/paginaInstrumentos";
import Navbar from "./componentes/organismos/Navbar";

function App() {
  return (
    <>
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

      </Routes>
    </>
  )
}

export default App
