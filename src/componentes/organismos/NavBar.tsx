import { Link } from "react-router-dom";
function Navbar(){

    const linkStyle = { color: "#f5f0e1", fontSize: "1.15rem", fontWeight: 600, letterSpacing: "0.5px" };

    return(
        <nav className="navbar navbar-expand-md" style={{ backgroundColor: "#d98e2f" }}>

            <div className="container">

                <span className="navbar-brand" style={{ ...linkStyle, fontSize: "1.4rem" }}>
                    <span style={{ color: "#1c1a17" }}>Sonido</span>
                    <span style={{ color: "#f5f0e1" }}>Vivo</span>
                </span>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{ borderColor: "#f5f0e1" }}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto">
    
                        <Link className="nav-link" style={linkStyle} to="/">
                            Inicio
                        </Link>

                        <Link className="nav-link" style={linkStyle} to="/instrumentos">
                            Instrumentos
                        </Link>

                        <Link className="nav-link" style={linkStyle} to="/accesorios">
                            Accesorios
                        </Link>

                        <Link className="nav-link" style={linkStyle} to="/ofertas">
                            Ofertas
                        </Link>

                        <Link className="nav-link" style={linkStyle} to="carrito">
                            Carrito
                        </Link>

                        <Link className="nav-link" style={linkStyle} to="carrito">
                            Iniciar Sesión
                        </Link>

                    </div>
                </div>

            </div>

        </nav>
    )

}

export default Navbar