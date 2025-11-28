// import { Route, Outlet } from "react-router-dom";

// import { defaultData } from "pages/simulador/store/simuladorStore";
// import { simuladorSchema as schema } from "pages/simulador/schemas/simuladorSchema";

// import { handleValidation } from "utils/handlers";
// import useStepValidation from "hooks/useStepValidation";
// import { useFormData } from "hooks/useFormData";

// import Rut from './Rut';
// import Credito from './Credito';
// import Simulacion from './Simulacion';

// const MainSimulador = () => {
//     const { formData, setField, setFields } = useFormData(defaultData);

//     const { rut, ...resto } = formData;
//     const formDataSteps = [
//         { rut },
//         resto,
//         {},
//     ];

//     const { nextStep, prevStep, currIndex } = useStepValidation({
//         steps: STEPS,
//         formDataSteps: formDataSteps,
//         schema: schema,
//         mainPath: MAIN_PATH
//     })

//     const handleSubmit = (values) => {
//         setFields(values);
//         nextStep();
//     }

//     return (
//         <>
//             <Outlet context={{ formData, formDataSteps, currIndex, setField, nextStep, prevStep, setFields, schema, handleSubmit, handleValidation }} />
//             {/* <pre>
//                 {JSON.stringify(formData, null, 2)}
//             </pre> */}
//         </>
//     );
// };


import { WizardRouter } from "components/renderers/wizardRenderer";

import Rut from "./Rut";
import Credito from "./Credito";
import Simulacion from "./Simulacion";

const MAIN_PATH = "/simulador"
const CONFIG = [
    {
        path: "",
        component: Rut
    },{
        path: "credito-consumo",
        component: Credito
    },{
        path: "simulacion",
        component: Simulacion
    }
]

const SimuladorRoutes = () => WizardRouter(MAIN_PATH, CONFIG);

export default SimuladorRoutes;