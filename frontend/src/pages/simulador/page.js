import { Route, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import { defaultData } from "pages/simulador/store/simuladorStore";
import { simuladorSchema as schema } from "pages/simulador/schemas/simuladorSchema";

import { handleValidation } from "utils/handlers";
import useStepValidation from "hooks/useStepValidation";

import Rut from './Rut';
import Credito from './Credito';
import Simulacion from './Simulacion';

const MAIN_PATH = "/simulador"
const STEPS = ["", "credito-consumo","simulacion"];

const MainSimulador = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({...defaultData});

    const currPath = window.location.pathname.replace(MAIN_PATH, "").replace(/^\//, "");
    const currIndex = STEPS.indexOf(currPath);

    const nextStep = () => currIndex < STEPS.length -1 && navigate(`${MAIN_PATH}/${STEPS[currIndex + 1]}`);
    const prevStep = () => currIndex > 0 && navigate(`${MAIN_PATH}/${STEPS[currIndex - 1]}`);

    const setField = (key, value) => setFormData(prev => ({...prev, [key]:value}));
    const setFields = (values) => setFormData(prev => ({ ...prev, ...values }));

    const { rut, ...resto } = formData;

    const formDataSteps = [
        { rut },
        resto,
        {},
    ];

    useStepValidation({
        steps: STEPS,
        formDataSteps: formDataSteps,
        schema: schema,
        mainPath: MAIN_PATH
    })

    return (
        <>
            <Outlet context={{ formData, setField, navigate, nextStep, prevStep, setFields, schema, handleValidation }} />
            {/* <pre>
                {JSON.stringify(formData, null, 2)}
            </pre> */}
        </>
    );
};

const SimuladorRoutes = () => (
    <>
        <Route path={MAIN_PATH} element={<MainSimulador />}>
            <Route index element={<Rut />} />
            <Route path={STEPS[1]} element={<Credito />} />
            <Route path={STEPS[2]} element={<Simulacion />} />
        </Route>
    </>
);

export default SimuladorRoutes;