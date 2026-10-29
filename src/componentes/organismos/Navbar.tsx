import { Link, useNavigate, useLocation } from "react-router-dom";
import { getSesion, cerrarSesion } from "../../utils/auth";
import { getCarrito } from "../../utils/carrito";
import { useState, useEffect } from "react";

function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const [sesion, setSesion] = useState(getSesion());
    const [cartCount, setCartCount] = useState(getCarrito().reduce((a, i) => a + i.cantidad, 0));

    useEffect(() => {
        setSesion(getSesion());
        setCartCount(getCarrito().reduce((a, i) => a + i.cantidad, 0));
    }, [location.pathname]);

    useEffect(() => {
        const update = () => setCartCount(getCarrito().reduce((a, i) => a + i.cantidad, 0));
        window.addEventListener("carrito-updated", update);
        window.addEventListener("storage", update);
        return () => {
            window.removeEventListener("carrito-updated", update);
            window.removeEventListener("storage", update);
        };
    }, []);

    const linkStyle = { color: "#f5f0e1", fontSize: "1.15rem", fontWeight: 600, letterSpacing: "0.5px", marginRight: "1rem" };

    const handleLogout = () => {
        cerrarSesion();
        setSesion(null);
        navigate("/logout");
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

                        <Link className="nav-link d-flex align-items-center" style={linkStyle} to="/carrito">
                            Carrito
                            {cartCount > 0 && (
                                <span className="badge rounded-pill bg-danger ms-2" style={{ fontSize: "0.75rem" }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {sesion?.rol === "admin" && (
                            <Link className="nav-link" style={linkStyle} to="/admin">
                                Panel Admin
                            </Link>
                        )}

                        {sesion && (
                            <Link className="nav-link" style={linkStyle} to="/perfil">
                                Mi Perfil
                            </Link>
                        )}

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


