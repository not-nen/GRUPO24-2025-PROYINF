import { useOutletContext } from "react-router-dom";

import { backendUrl } from "../../utils/backend";

import { formatearDineroNumber } from "../../components/form/utils/formatoDinero";
import { useEffect, useState } from "react";

const Simulacion = () => {
    const { formData, prevStep, filterData, navigate } = useOutletContext();

    const [dataFetch, setDataFetch] = useState({});

    const getSimulacion = async (data) => {
        const res = await fetch(backendUrl + "/api/simular/credito-consumo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rut: data.rut,
                renta: formatearDineroNumber(data.renta),
                monto: formatearDineroNumber(data.monto),
                plazo: data.plazo,
                pago: data.primerPago
            })
        });
        const dataRes = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al simular credito.");
        return dataRes;
    }

    const handleVolver = () => {
        navigate("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = filterData(formData);
                if (data.rut === "0") data.rut = "";
                const res = await getSimulacion(data);
                setDataFetch(res);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [filterData, formData, navigate]);

    return (
        <div>
            {dataFetch ? (
                <pre>
                    {JSON.stringify(dataFetch, null, 2)}
                </pre>
            ) : (
                <p>Cargando simulacion...</p>
            )}

            <div>
                <button className="btn btn-primary">
                    Solicitar credito de consumo →
                </button>
                <button className="btn btn-outline-secondary" onClick={prevStep}>
                    ← Volver
                </button>
            </div>
            
            <div>
                <button className="btn btn-outline-primary">
                    Guardar simulación
                </button>
                <button className="btn btn-outline-secondary" onClick={handleVolver}>
                    ← Volver al inicio
                </button>
            </div>
        </div>
    );
}

export default Simulacion;