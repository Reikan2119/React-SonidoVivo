import { Link } from "react-router-dom";
function Navbar(){

    return(
        <nav className="navbar navbar-expand bg-dark">

            <div className="container">

                <span className="navbar-brand text-white">
                    SonidoVivo
                </span>

                <div className="navbar-nav">
    
                    <Link className="nav-link text-white" to="/">
                        Inicio
                    </Link>

                    <Link className="nav-link text-white" to="/instrumentos">
                        Instrumentos
                    </Link>

                    <Link className="nav-link text-white" to="/accesorios">
                        Accesorios
                    </Link>

                    <Link className="nav-link text-white" to="/ofertas">
                        Ofertas
                    </Link>

                    <Link className="nav-link text-white" to="carrito">
                        Carrito
                    </Link>


                </div>

            </div>

        </nav>
    )

}

export default Navbar