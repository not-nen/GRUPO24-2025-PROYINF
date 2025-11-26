import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import { backendUrl } from "utils/backend";

import FormContainer from "components/containers/FormContainer";
import BtnsContainer from "components/containers/BtnsContainer";
import FillContainer from "components/containers/FillContainer";
import PrevStepBtn from "components/subComponents/PrevStepBtn";
import { useAuth } from "context/authContext";


import { formatearDineroNumber, formatearDineroStrBonito } from "utils/formatoDinero";
import { handleData } from "utils/handlers";

const Simulacion = () => {
    const navigate = useNavigate();
    const { formData, prevStep } = useOutletContext();
    const [dataFetch, setDataFetch] = useState(null);
    const [error, setError] = useState(null);
    const { user, isAuthenticated } = useAuth();

    const getSimulacion = async (data) => {
        try {
            const res = await fetch(backendUrl + "/api/simulacion", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rut: data.rut,
                    renta: formatearDineroNumber(data.renta),
                    monto: formatearDineroNumber(data.monto),
                    plazo: data.plazo,
                    pago: data.primerPago
                })
            });
            const dataRes = await res.json();
            if (!res.ok) throw new Error(dataRes.error || "Error al simular credito.");
            return dataRes;
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = handleData(formData);
                if (data.rut === "0") data.rut = "";
                const res = await getSimulacion(data);
                setDataFetch(res);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        }
        fetchData();
    }, [formData, navigate]);

    
    const InfoCard = ({ title, value, highlight = false }) => (
        <div className={`card mb-3 ${highlight ? 'border-primary' : ''} shadow-sm`}>
            <div className={`card-header ${highlight ? 'bg-primary text-white' : 'bg-light'}`}>
                {title}
            </div>
            <div className="card-body text-center">
                <h3 className="card-title mb-0">{value}</h3>
            </div>
        </div>
    );
    const handleGuardar = async () => {
        if (!dataFetch) return;
        try {
            const res = await fetch(backendUrl + "/api/simulacion/guardar", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // <--- Enviar Token
                },
                body: JSON.stringify({
                    monto: dataFetch.monto,
                    plazo: dataFetch.solicitud.plazo,
                    cuotaMensual: dataFetch.cuotaMensual,
                    cae: dataFetch.CAE
                })
            });
            if (res.ok) alert("¡Simulación guardada con éxito!");
            else alert("Error al guardar");
        } catch (err) {
            alert("Error de conexión");
        }
    }

    return (
        <FormContainer>
            <PrevStepBtn onClick={prevStep}/>
            
            <div className="d-flex flex-column px-4 h-100 fit-flex overflow-auto">
                <h2 className="mb-4 text-center krona-one-regular">Resultado de tu Simulación</h2>

                {error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : !dataFetch ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-2">Calculando la mejor oferta...</p>
                    </div>
                ) : (
                    <div className="animate__animated animate__fadeIn">
                        {/* Resumen Principal */}
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <InfoCard 
                                    title="Cuota Mensual" 
                                    value={formatearDineroStrBonito(dataFetch.cuotaMensual)} 
                                    highlight={true}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoCard 
                                    title="Monto Solicitado" 
                                    value={formatearDineroStrBonito(dataFetch.monto)} 
                                />
                            </div>
                        </div>

                        {/* Detalles Técnicos */}
                        <div className="card border-0 bg-light rounded-4 p-4 mt-2">
                            <h5 className="mb-3">Detalles del Crédito</h5>
                            <div className="row g-3">
                                <div className="col-6 col-md-4">
                                    <small className="text-muted d-block">Costo Total (CTC)</small>
                                    <strong>{formatearDineroStrBonito(dataFetch.CTC)}</strong>
                                </div>
                                <div className="col-6 col-md-4">
                                    <small className="text-muted d-block">CAE</small>
                                    <strong>{dataFetch.CAE}%</strong>
                                </div>
                                <div className="col-6 col-md-4">
                                    <small className="text-muted d-block">Tasa Mensual</small>
                                    <strong>{dataFetch.tasaMensual}%</strong>
                                </div>
                                <div className="col-6 col-md-4">
                                    <small className="text-muted d-block">Plazo</small>
                                    <strong>{dataFetch.solicitud.plazo} Meses</strong>
                                </div>
                                <div className="col-6 col-md-4">
                                    <small className="text-muted d-block">Primer Pago</small>
                                    <strong>{dataFetch.pago}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <BtnsContainer>
                {isAuthenticated && (
                    <button className="btn btn-success btn-top" onClick={handleGuardar}>
                        Guardar Simulación
                    </button>
                )}
                <button className="btn btn-primary btn-top">
                    Solicitar este crédito →
                </button>
                <button className="btn btn-outline-dark btn-bottom" onClick={() => navigate("/")}>
                    ← Volver al inicio
                </button>
            </BtnsContainer>
        </FormContainer>
    );
}

export default Simulacion;