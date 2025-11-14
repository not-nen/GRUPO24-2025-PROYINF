import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleSchema, handleData } from "utils/handlers";

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

    useEffect(() => {
        const currPath = location.pathname.replace(mainPath, "").replace(/^\//, "");
        const currIndex = steps.indexOf(currPath);

        let firstInvalidIndex = -1;
        for (let i = 0; i < steps.length; i++) {
            const stepData = handleData(formDataSteps[i]);
            const stepSchema = Array.isArray(schema) ? schema[i] : schema;

            const ok = handleSchema(stepData, stepSchema).safeParse(stepData).success;

            if (!ok) {
                firstInvalidIndex = i;
                break;
            }
        }

        if (firstInvalidIndex === -1) return;
        if (currIndex === firstInvalidIndex) return;

        navigate(`${mainPath}/${steps[firstInvalidIndex]}`);
    }, [location.pathname, formDataSteps, steps, schema, navigate, mainPath]);
};

export default useStepValidation;