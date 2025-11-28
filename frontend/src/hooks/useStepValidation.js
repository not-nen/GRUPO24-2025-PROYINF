import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleSchema, handleData } from "utils/handlers";

export const ADELANTE = "forward";
export const ATRAS = "backward";

/**
 * hook que valida los pasos previos de un wizard multistep form.
 * 
 * mas reutilizable :)
 * 
 * - `steps` - array con los paths de los steps.
 * - `formDataSteps` - array con los datos por step.
 * - `schema` - schema del formulario.
 * - `mainPath` - path base del formulario.
 */
const useStepValidation = ({ steps, formDataSteps, schema, mainPath }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [direction, setDirection] = useState(ADELANTE);
    const isManualNav = useRef(false);

    const currPath = location.pathname.replace(mainPath, "").replace(/^\//, "");
    const currIndex = steps.indexOf(currPath);

    const nextStep = () => {
        if (currIndex < steps.length - 1) {
            setDirection(ADELANTE);
            isManualNav.current = true;
            navigate(`${mainPath}/${steps[currIndex + 1]}`);
        }
    };

    const prevStep = () => {
        if (currIndex > 0) {
            setDirection(ATRAS);
            isManualNav.current = true;
            navigate(`${mainPath}/${steps[currIndex - 1]}`);
        }
    };

    useEffect(() => {
        if (isManualNav.current) {
            isManualNav.current = false;
            return;
        }

        const currPath = location.pathname.replace(mainPath, "").replace(/^\//, "");
        const currIndex = steps.indexOf(currPath);
        const nSteps = steps.length;

        if (currIndex === -1) {
            navigate(`${mainPath}/${steps[0]}`);
            return;
        }

        let newIndex = currIndex;
        for (let i = 0; i < nSteps; i++) {
            const stepData = handleData(formDataSteps[i]);
            const stepSchema = Array.isArray(schema) ? schema[i] : schema;

            if (stepSchema == null) continue; // Step sin validación

            const res = handleSchema(stepData, stepSchema).safeParse(stepData);

            if (!res.success) {
                newIndex = i;
                break;
            }
        }

        if (currIndex === newIndex) return;

        if (currIndex > newIndex) {
            setDirection(ATRAS);
            navigate(`${mainPath}/${steps[newIndex]}`);
        }

    }, [location.pathname, formDataSteps, steps, schema, navigate, mainPath]);

    return { nextStep, prevStep, currIndex, direction };
};

export default useStepValidation;