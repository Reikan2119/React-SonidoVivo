import { Routes, Route } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import PaginaInicio from "./componentes/paginas/paginaInicio";
import Intrumentos from "./componentes/paginas/paginaInstrumentos";

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
