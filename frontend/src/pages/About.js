import { useNavigate } from "react-router-dom";
import FillContainer from "components/containers/FillContainer";
import BtnsContainer from "components/containers/BtnsContainer";

const About = () => {
    const navigate = useNavigate();

    return (
        <FillContainer>
            <div className="container py-4 animate__animated animate__fadeIn">
                <div className="text-center mb-5">
                    <h1 className="display-4 krona-one-regular text-primary">Sobre el Proyecto</h1>
                    <p className="lead text-muted">Gestión y Simulación de Créditos de Consumo</p>
                </div>

                <div className="row g-4">
                    {/* Tarjeta del Equipo */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <h3 className="card-title h4 mb-3">👥 Equipo de Desarrollo</h3>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Miguel Salamanca</li>
                                    <li className="list-group-item">Alejandro Caceres</li>
                                    <li className="list-group-item">Benjamin Caro</li>
                                    <li className="list-group-item">Cristobal Barahona</li>
                                </ul>
                                <div className="mt-3 text-muted small">
                                    <strong>Tutor:</strong> Benjamin Daza
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Tecnología */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <h3 className="card-title h4 mb-3">Tecnológias Usadas</h3>
                                <p>Esta aplicación fue construida utilizando una arquitectura moderna basada en contenedores.</p>
                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge bg-primary">React</span>
                                    <span className="badge bg-success">Node.js</span>
                                    <span className="badge bg-secondary">PostgreSQL</span>
                                    <span className="badge bg-info text-dark">Docker</span>
                                    <span className="badge bg-warning text-dark">Tesseract OCR</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <BtnsContainer>
                    <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
                        ← Volver al Inicio
                    </button>
                </BtnsContainer>
            </div>
        </FillContainer>
    );
};

export default About;