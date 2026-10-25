import { Routes, Route } from "react-router-dom"
import Navbar from "./componentes/organismos/NavBar"
import Inicio from "./componentes/paginas/inicio"


function App() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: "#1c1a17" }}>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={<Inicio/>}
        />{/* Ruta dinamica para mostrar el detalle segun el id del producto */}
      </Routes>
    </div>
  )
}

export default App
