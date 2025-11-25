import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import { backendUrl } from "utils/backend";

import FormContainer from "components/containers/FormContainer";
import CardsContainer from "components/containers/CardsContainer";
import BtnsContainer from "components/containers/BtnsContainer";
import FillContainer from "components/containers/FillContainer";
import PrevStepBtn from "components/subComponents/PrevStepBtn";

import { formatearDineroNumber } from "utils/formatoDinero";
import { handleData } from "utils/handlers";
import CreditoSimulado from "components/CreditoSimulado";

const Simulacion = () => {
    const navigate = useNavigate();

    const { formData, prevStep } = useOutletContext();

    const [dataFetch, setDataFetch] = useState({});

    const getSimulacion = async (data) => {
        const res = await fetch(backendUrl + "/api/simulacion", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo: data.tipo,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = handleData(formData);
                if (data.rut === "0") data.rut = "";
                const res = await getSimulacion(data);
                setDataFetch(res);
                console.log(res);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [formData, navigate]);

    return (
        <FormContainer>
            <PrevStepBtn onClick={prevStep}/>
            <FillContainer/>

            {dataFetch ? (
                <CardsContainer>
                    <CreditoSimulado
                        monto={dataFetch.monto}
                        cuotaMensual={dataFetch.cuotaMensual}
                        pago={dataFetch.pago}
                        CAE={dataFetch.CAE}
                        interesAnual={dataFetch.tasaAnual}
                        interesMensual={dataFetch.tasaMensual}
                        CTC={dataFetch.CTC}
                    />
                </CardsContainer>
            ) : (
                <p>Cargando simulacion...</p>
            )}

            <BtnsContainer>
                <button className="btn btn-primary disabled">
                    Solicitar credito de consumo
                </button>
            </BtnsContainer>
            
            <BtnsContainer>
                <button className="btn btn-outline-primary disabled">
                    Guardar simulación
                </button>
                <button className="btn btn-outline-dark" onClick={() => {navigate("/")}}>
                    Volver al inicio
                </button>
            </BtnsContainer>
        </FormContainer>
    );
}

export default Simulacion;