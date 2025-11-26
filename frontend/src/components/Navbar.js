import { Link, useLocation } from "react-router-dom";
import { useAuth } from "context/authContext";

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    
    const isActive = (path) => location.pathname === path ? "active fw-bold" : "";

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid px-4">
                <Link className="navbar-brand krona-one-regular text-primary" to="/">
                    Test
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav gap-2">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/")}`} to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/simulador")}`} to="/simulador">Simulador</Link>
                        </li>
                        
                        {}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/historial")}`} to="/historial">Historial</Link>
                            </li>
                        )}
                        {/* ----------------------------------------------------------------- */}

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/escanear")}`} to="/escanear">Herramienta OCR</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/about")}`} to="/about">Sobre el Proyecto</Link>
                        </li>
                    </ul>
                    
                    <ul className="navbar-nav gap-2">
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <button 
                                    className="btn btn-outline-danger btn-sm rounded-pill px-3" 
                                    onClick={logout}
                                >
                                    Cerrar Sesión
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-primary btn-sm rounded-pill px-3" to="/login">
                                        Iniciar Sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary btn-sm rounded-pill px-3" to="/crear-cuenta">
                                        Crear Cuenta
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;