import { Routes, Route } from "react-router-dom"
import Navbar from "./componentes/organismos/NavBar"
import Inicio from "./componentes/paginas/inicio"


function App() {
  return (
    <>
      
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={<Inicio/>}
        />{/* Ruta dinamica para mostrar el detalle segun el id del producto */}
      </Routes>
    </>
  )
}

export default App
