import { Route, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { simuladorStore } from "./store/simuladorStore";
import { formatearDineroNumber } from "../../components/form/utils/formatoDinero";

import { rutSchema, creditoSchema } from "./schemas/simuladorSchema";

import Rut from './Rut';
import Credito from './Credito';
import Simulacion from './Simulacion';

const MAIN_PATH = "/simulador"
const STEPS = ["", "credito-consumo","simulacion"];

const MainSimulador = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData, setField, reset } = simuladorStore();

    const currentPath = window.location.pathname.replace(MAIN_PATH, "").replace(/^\//, "");
    const currentIndex = STEPS.indexOf(currentPath);

    const nextStep = () => {
        if (currentIndex < STEPS.length -1) navigate(`${MAIN_PATH}/${STEPS[currentIndex + 1]}`);
    }
    const prevStep = () => {
        if (currentIndex > 0) navigate(`${MAIN_PATH}/${STEPS[currentIndex - 1]}`);
    }

    const setFields = (values) => {
        Object.entries(values).forEach(([key,value]) => {
            setField(key,value);
        });
    }

    const filterData = (values) => {
        const data = { ...values };

        if (data.renta === "0") data.renta = data.renta_otro;
        delete data.renta_otro;

        if (data.plazo === "0") data.plazo = data.plazo_otro;
        delete data.plazo_otro;

        data.monto = formatearDineroNumber(data.monto);
        data.renta = formatearDineroNumber(data.renta);

        return data;
    }

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
            <pre>
                {JSON.stringify(formData, null, 2)}
            </pre>
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