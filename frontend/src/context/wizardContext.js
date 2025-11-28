import { useFormData } from "hooks/useFormData";
import { createContext, useContext } from "react";
import useStepValidation, { ADELANTE, ATRAS } from "hooks/useStepValidation";

import { schema as ds, defaultData as dd } from "schemas/schema";
import { handleInitialValues } from "utils/handlers";

const wizardContext = createContext(null);

export const WizardProvider = ({ children, config, schema = ds, mainPath, defaultData = dd }) => {
    const keys = config.map(step => step.component.data).flat();
    const defaultDataFixed = handleInitialValues(keys, defaultData);
    
    const { formData, setField, setFields } = useFormData(defaultDataFixed);

    const steps = config.map(step => step.path);
    const formDataSteps = config.map(step => step.component.data ? handleInitialValues(step.component.data, formData) : {});

    const { nextStep, prevStep, currIndex, direction } = useStepValidation({
        steps,
        formDataSteps,
        schema,
        mainPath
    });

    return (
        <wizardContext.Provider value={{
            config,
            defaultData:defaultDataFixed,
            schema,
            formData,
            formDataSteps,
            setField,
            setFields,
            nextStep,
            prevStep,
            currIndex,
            direction,
            ADELANTE,
            ATRAS
        }}>
            {children}
        </wizardContext.Provider>
    );
};

const useWizard = () => useContext(wizardContext);
export default useWizard;