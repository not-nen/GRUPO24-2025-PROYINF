import { Formik, ErrorMessage, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useOutletContext } from "react-router-dom";

import { rutSchema } from "./schemas/simuladorSchema";

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
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
            validationSchema={toFormikValidationSchema(rutSchema)}
            validateOnBlur={true}
        >
            {
                ({ values, handleChange, handleBlur, setFieldValue }) => {
                    const handleRut = (e) => {
                        handleChange(e);
                        setFieldValue("rut", formatearRut(e.target.value));
                    }

                    return (
                        <Form>
                            <label htmlFor="rut">RUT</label>
                            <input
                                id="rut"
                                type="text"
                                name="rut"
                                placeholder="11.111.111-1"
                                className="form-control"
                                value={values.rut}
                                onChange={handleRut}
                                onBlur={handleBlur}
                            />

                            <ErrorMessage name="rut" className="text-danger" component="div"/>

                            <div className="flex gap-2 mt-4">
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
                            <pre>
                                {JSON.stringify(values, null, 2)}
                            </pre>
                        </Form>
                    )
                }
            }
        </Formik>
    );
};

export default Rut;