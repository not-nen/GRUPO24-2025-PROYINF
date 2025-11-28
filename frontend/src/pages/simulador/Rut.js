// import { Formik, Form } from "formik";
// import { toFormikValidationSchema } from "zod-formik-adapter";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import Typewriter from "typewriter-effect";

// import FormContainer from "components/containers/FormContainer";


// TODO: continuar como invitado no funciona de momento por el hook useStepValidation.js :v ahi lo arreglo
// const Rut = () => {
//     const navigate = useNavigate();
//     const { formDataSteps, currIndex, handleSubmit, handleValidation, schema } = useOutletContext();

//     return (
//         <Formik
//             initialValues={formDataSteps[currIndex]}
//             onSubmit={(values) => {
//                 handleSubmit(values);
//             }}
//             validate={(values) => handleValidation(values,schema)}
//             validateOnBlur={true}
//         >
//             {
//                 ({ values, handleChange, handleBlur, setFieldValue, errors, touched, submitForm }) => {
//                     const handleRut = (e) => {
//                         handleChange(e);
//                         setFieldValue("rut", formatearRut(e.target.value));
//                     }

//                     return (
//                         <FormContainer>
//                             <FillContainer>
//                                 <h1 className="display-1 krona-one-regular">
//                                     Simula tu credito de consumo
//                                     {/* <Typewriter
//                                         options={{
//                                             strings: [" facil", " simple", " comodo", " seguro"],
//                                             autoStart: true,
//                                             loop: true,
//                                             deleteSpeed: 50,
//                                             delay: 75,
//                                             cursor: "|",
//                                         }}
//                                     /> */}
//                                 </h1>
//                             </FillContainer>
//                             <Form>
//                                 
//                                 <BtnsContainer>
//                                     <button type="submit" onClick={submitForm} className="btn btn-primary btn-top">
//                                         Continuar →
//                                     </button>
                            
//                                     <button type="button" className="btn btn-outline-primary btn-bottom" onClick={() => {handleSubmit()}}>
//                                         Simular como invitado →
//                                     </button>
//                                 </BtnsContainer>
//                                 <BtnsContainer>
//                                     <button type="button" className="btn btn-outline-dark" onClick={() => {navigate("/")}}>
//                                         ← Volver al inicio
//                                     </button>
//                                 </BtnsContainer>
//                                 {/* <pre>
//                                     {JSON.stringify(values, null, 2)}
//                                 </pre> */}
//                             </Form>
//                         </FormContainer>
//                     )
//                 }
//             }
//         </Formik>
//     );
// };

import { useFormikContext } from "formik";
// import { useNavigate } from "react-router-dom";
import Input from "components/inputs/Input";

import InputsContainer from "components/containers/InputsContainer";
import BtnsContainer from "components/containers/BtnsContainer";
import FillContainer from "components/containers/FillContainer";

import { formatearRut } from "utils/formatoRut";

const Rut = () => null;

Rut.data = ["rut"];

Rut.Form = function RutForm() {
    const { values, errors, touched, handleBlur, handleChange, setFieldValue } = useFormikContext();

    const handleRut = (e) => {
        handleChange(e);
        setFieldValue("rut", formatearRut(e.target.value));
    };
    return (
        <>
            <FillContainer>
                <h1 className="display-1 krona-one-regular">
                    Simula tu credito de consumo
                    {/* <Typewriter
                        options={{
                            strings: [" facil", " simple", " comodo", " seguro"],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 50,
                            delay: 75,
                            cursor: "|",
                        }}
                    /> */}
                </h1>
            </FillContainer>
            <InputsContainer>
                <Input
                    id="rut"
                    type="text"
                    name="rut"
                    label="Rut"
                    placeholder="11.111.111-1"
                    value={values.rut}
                    textHelp="Ingresar tu Rut es opcional."
                    onChange={handleRut}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                />
            </InputsContainer>
        </>
    );
};

Rut.Buttons = function RutButtons() {
    // const { submitForm } = useFormikContext();
    // const navigate = useNavigate();

    return (
        <>
            <BtnsContainer>
                <button type="submit" className="btn btn-primary btn-top">
                    Continuar →
                </button>
                <button
                    type="button"
                    className="btn btn-outline-primary btn-bottom"
                >
                    Simular como invitado →
                </button>
            </BtnsContainer>
            <BtnsContainer>
                <button type="button" className="btn btn-outline-dark"
                // onClick={() => navigate("/")}
                >
                    ← Volver al inicio
                </button>
            </BtnsContainer>
        </>
    );
};

export default Rut;