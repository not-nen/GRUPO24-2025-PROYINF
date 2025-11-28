import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";

import useWizard, { WizardProvider } from "context/wizardContext";
import { handleInitialValues, handleValidation } from "utils/handlers";
import FormContainer from "components/containers/FormContainer";
import PrevStepBtn from "components/subComponents/PrevStepBtn";

export const WizardRenderer = () => {
    const { config, schema, formData, setFields, currIndex, direction, nextStep, prevStep, ADELANTE } =
        useWizard();

    const Step = config[currIndex].component;
    const initialValues = handleInitialValues(Step.data, formData);

    const StepProvider = Step.Provider || Fragment;

    if (!initialValues || Object.values(initialValues).some((v) => v === undefined)) return null;

    const duration = 0.15;

    const variants = {
        enter: (dir) => ({ x: dir === ADELANTE ? 100 : -100, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir === ADELANTE ? -100 : 100, opacity: 0 }),
    };

    return (
        <FormContainer>
            {currIndex !== 0 && <PrevStepBtn onClick={prevStep} />}

            <Formik
                key={currIndex}
                initialValues={initialValues}
                enableReinitialize={true}
                validate={(values) => handleValidation(values, schema)}
                validationOnBlur={true}
                onSubmit={(values) => {
                    setFields(values);
                    nextStep();
                }}
            >
                <Form>
                    <StepProvider>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration }}
                                className="d-flex flex-column fit-flex h-100"
                            >
                                <Step.Form />
                            </motion.div>
                        </AnimatePresence>
                        <Step.Buttons />
                    </StepProvider>
                </Form>
            </Formik>
        </FormContainer>
    );
};

export const WizardRouter = (mainPath, config) => {
    return (
        <Route
            path={mainPath}
            element={
                <WizardProvider
                    config={config}
                    mainPath={mainPath}
                >
                    <WizardRenderer />
                </WizardProvider>
            }
        >
            {config.map((step, i) => (
                <Route key={i} path={step.path} element={<div />} />
            ))}
        </Route>
    )
}