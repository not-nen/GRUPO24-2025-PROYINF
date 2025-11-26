import { useNavigate } from "react-router-dom";
import FillContainer from "components/containers/FillContainer";

const Index = () => {
    const navigate = useNavigate();

    return (
        <FillContainer>
            {/* Sección del Título */}
            <div className="text-center mb-5 animate__animated animate__fadeIn">
                <h1 className="display-2 krona-one-regular text-primary mb-3">
                    Prestamos🤑💸💳
                </h1>
                <p className="lead text-secondary fs-4 mx-auto" style={{ maxWidth: "600px" }}>
                    Toma el control de tu futuro financiero. Simula, evalúa y solicita tu crédito de consumo en minutos.
                </p>
            </div>

            {/* Contenedor de Botones */}
            <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: "500px" }}>
                
                {/*Botón Principal: Simulador */}
                <button 
                    className="btn btn-primary btn-lg p-3 rounded-4 shadow-sm d-flex justify-content-between align-items-center"
                    onClick={() => navigate("/simulador")}
                >
                    <span className="fs-5 fw-bold">Simular mi Crédito</span>
                    <span>→</span>
                </button>

                {/*Fila de Botones: Herramientas y Acceso */}
                <div className="row g-2">
                    <div className="col-6">
                        <button 
                            className="btn btn-light w-100 p-3 rounded-4 border h-100 d-flex flex-column align-items-center justify-content-center gap-2"
                            onClick={() => navigate("/escanear")}
                        >
                            <span style={{ fontSize: "1.5rem" }}>📷</span>
                            <span>Escanear Carnet</span>
                        </button>
                    </div>
                    <div className="col-6">
                        <button 
                            className="btn btn-light w-100 p-3 rounded-4 border h-100 d-flex flex-column align-items-center justify-content-center gap-2"
                            onClick={() => navigate("/login")}
                        >
                            <span style={{ fontSize: "1.5rem" }}>👤</span>
                            <span>Acceso Clientes</span>
                        </button>
                    </div>
                </div>

                {/* 3. Botón */}
                <button 
                    className="btn btn-outline-secondary w-100 p-2 rounded-4 border d-flex align-items-center justify-content-center gap-2"
                    onClick={() => navigate("/about")}
                >
                    <span>ℹ️</span>
                    <span>Sobre el Proyecto</span>
                </button>

                {/* Enlace de registro */}
                <div className="text-center mt-2">
                    <span className="text-muted small">¿No tienes cuenta? </span>
                    <span 
                        className="text-primary text-decoration-underline small" 
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/crear-cuenta")}
                    >
                        Regístrate aquí
                    </span>
                </div>
            </div>
        </FillContainer>
    )
}

export default Index;