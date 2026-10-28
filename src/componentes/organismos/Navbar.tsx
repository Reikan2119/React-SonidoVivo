import { Link, useNavigate, useLocation } from "react-router-dom";
import { getSesion, cerrarSesion } from "../../utils/auth";
import { useState, useEffect } from "react";

function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const [sesion, setSesion] = useState(getSesion());

    useEffect(() => {
        setSesion(getSesion());
    }, [location.pathname]);

    const linkStyle = { color: "#f5f0e1", fontSize: "1.15rem", fontWeight: 600, letterSpacing: "0.5px", marginRight: "1rem" };

    const handleLogout = () => {
        cerrarSesion();
        setSesion(null);
        navigate("/");
    };

    return(
        <nav className="navbar navbar-expand-md" style={{ backgroundColor: "#d98e2f" }}>

            <div className="container">

                <Link to="/" className="navbar-brand" style={{ ...linkStyle, fontSize: "1.4rem", textDecoration: "none" }}>
                    <span style={{ color: "#1c1a17" }}>Sonido</span>
                    <span style={{ color: "#f5f0e1" }}>Vivo</span>
                </Link>

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

                        <Link className="nav-link" style={linkStyle} to="/nosotros">
                            Nosotros
                        </Link>

                        <Link className="nav-link" style={linkStyle} to="/contacto">
                            Contacto
                        </Link>

                        <Link className="nav-link" style={linkStyle} to="carrito">
                            Carrito
                        </Link>

                        {sesion ? (
                            <button className="nav-link btn btn-link" style={{ ...linkStyle, textDecoration: "none", border: "none", background: "none", padding: 0 }} onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link className="nav-link" style={linkStyle} to="/login">
                                Iniciar Sesión
                            </Link>
                        )}

                    </div>
                </div>

            </div>

        </nav>
    )

}

export default Navbar


