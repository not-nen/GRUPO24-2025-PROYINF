import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useOutletContext } from "react-router-dom";

import { rutSchema } from "./schemas/simuladorSchema";

import Input from "../../components/form/components/Input";
import Typewriter from "typewriter-effect";

import { formatearRut } from "../../components/form/utils/formatoRut";

const Rut = () => {
    const { formData, setField, navigate, nextStep, setFields } = useOutletContext();

    const initialValues = { rut: formData.rut || "" };

    const handleSubmit = (values) => {
        setFields(values)
        nextStep();
    };
    const handleSubmitNoRut = () => {
        setField("rut", "0");
        nextStep();
    };

    const handleVolver = () => {
        navigate("/");
    }

    return (
        <div>
            <h1>
                Simular tu credito de consumo ahora es
                <Typewriter
                    options={{
                        strings: [" facil", " simple", " comodo", " seguro"],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        delay: 75,
                        cursor: "|",
                    }}
                />
            </h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
                validationSchema={toFormikValidationSchema(rutSchema)}
                validateOnBlur={true}
            >
                {
                    ({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => {
                        const handleRut = (e) => {
                            handleChange(e);
                            setFieldValue("rut", formatearRut(e.target.value));
                        }

                        return (
                            <div className="form-container">
                                <Form>
                                    <label htmlFor="rut">RUT</label>
                                    <Input
                                        id="rut"
                                        type="text"
                                        name="rut"
                                        placeholder="11.111.111-1"
                                        value={values.rut}
                                        textHelp="Ingresar tu Rut es opcional."
                                        onChange={handleRut}
                                        onBlur={handleBlur}
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <div className="form-btns-container d-flex gap-2">
                                        <button type="submit" className="btn btn-primary">
                                            Continuar →
                                        </button>
                                
                                        <button type="button" className="btn btn-outline-primary" onClick={handleSubmitNoRut}>
                                            Simular como invitado →
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary" onClick={handleVolver}>
                                            ← Volver al inicio
                                        </button>
                                    </div>
                                    {/* <pre>
                                        {JSON.stringify(values, null, 2)}
                                    </pre> */}
                                </Form>
                            </div>
                        )
                    }
                }
            </Formik>
        </div>
    );
};

export default Rut;