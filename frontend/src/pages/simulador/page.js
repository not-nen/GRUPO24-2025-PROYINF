import { Route, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { defaultData, filterData } from "./store/simuladorStore";
import { rutSchema, creditoSchema } from "./schemas/simuladorSchema";

import Rut from './Rut';
import Credito from './Credito';
import Simulacion from './Simulacion';

const MAIN_PATH = "/simulador"
const STEPS = ["", "credito-consumo","simulacion"];

const MainSimulador = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({...defaultData});

    const currentPath = window.location.pathname.replace(MAIN_PATH, "").replace(/^\//, "");
    const currentIndex = STEPS.indexOf(currentPath);

    const nextStep = () => currentIndex < STEPS.length -1 && navigate(`${MAIN_PATH}/${STEPS[currentIndex + 1]}`);
    const prevStep = () => currentIndex > 0 && navigate(`${MAIN_PATH}/${STEPS[currentIndex - 1]}`);

    const setField = (key, value) => setFormData(prev => ({...prev, [key]:value}));
    const setFields = (values) => setFormData(prev => ({ ...prev, ...values }));

    useEffect(() => {
        const stepValidation = async () => {
            const { rut, ...resto } = filterData(formData);

            if (currentIndex === 0) return;

            if (!(rut === "0" || rutSchema.safeParse({rut}).success)) {
                navigate(MAIN_PATH);
                return;
            }

            if (currentIndex === 2 && !(creditoSchema.safeParse(resto).success)) {
                navigate(MAIN_PATH + "/" + STEPS[1]);
                return;
            }
        }
        stepValidation();
    }, [location.pathname, formData, navigate, currentIndex]);

    return (
        <>
            <Outlet context={{ formData, setField, navigate, nextStep, prevStep, setFields, filterData }} />
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