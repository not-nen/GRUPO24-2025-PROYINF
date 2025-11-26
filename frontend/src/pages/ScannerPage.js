import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScannerCarnet from "components/ScannerCarnet"; // Asegúrate de haber creado este componente en el paso anterior
import FillContainer from "components/containers/FillContainer";
import BtnsContainer from "components/containers/BtnsContainer";

const ScannerPage = () => {
    const navigate = useNavigate();
    const [rutDetectado, setRutDetectado] = useState(null);

    const handleRutFound = (rut) => {
        setRutDetectado(rut);
    };

    const copiarRut = () => {
        navigator.clipboard.writeText(rutDetectado);
        alert("RUT copiado: " + rutDetectado);
    };

    return (
        <FillContainer>
            <div className="w-100" style={{ maxWidth: "800px" }}>
                <h2 className="text-center mb-4 krona-one-regular">Herramienta de Escaneo</h2>
                
                <ScannerCarnet 
                    onRutFound={handleRutFound}
                    onCancel={() => navigate("/")}
                />

                {rutDetectado && (
                    <div className="alert alert-success mt-3 text-center animate__animated animate__fadeIn">
                        <h4>¡RUT Detectado!</h4>
                        <p className="display-6 fw-bold">{rutDetectado}</p>
                        <div className="d-flex gap-2 justify-content-center">
                            <button className="btn btn-success" onClick={copiarRut}>
                                📋 Copiar
                            </button>
                            <button className="btn btn-outline-success" onClick={() => navigate("/simulador")}>
                                Ir al Simulador →
                            </button>
                        </div>
                    </div>
                )}

                <BtnsContainer>
                    <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
                        ← Volver al Inicio
                    </button>
                </BtnsContainer>
            </div>
        </FillContainer>
    );
};

export default ScannerPage;