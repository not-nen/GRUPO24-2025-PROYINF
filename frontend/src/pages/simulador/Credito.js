import { Formik, Form } from "formik";
import { useOutletContext } from "react-router-dom";

import Input from "../../components/form/components/Input";
import Select from "../../components/form/components/Select";
import { formatearDineroNumber, formatearDineroStr, formatearDineroStrBonito } from "../../components/form/utils/formatoDinero";
import { optionPlazo, optionsRenta } from "./fields/options";

import { creditoSchema, MAX_PRIMER_PAGO, MIN_PRIMER_PAGO, MIN_MONTO, MAX_MONTO, MAX_PLAZO } from "./schemas/simuladorSchema";

const Credito = () => {
    const { formData, nextStep, prevStep, setFields, filterData } = useOutletContext();

    const initialValues = {
        monto: formData.monto || "",
        renta: formData.renta || "",
        renta_otro: formData.renta_otro || "",
        plazo: formData.plazo || "",
        plazo_otro: formData.plazo_otro || "",
        primerPago: formData.primerPago || "",
    };
    
    const handleSubmit = (values) => {
        setFields(values);
        nextStep();
    }
    const handleVolver = () => {
        prevStep();
    };

    const handleValidation = (values) => {
        const res = creditoSchema.safeParse(filterData(values));

        if (res.success) return {};

        const errors = {};
        for (const i of res.error.issues) {
            const path = i.path[0];

            if (path === "monto" && values.monto === "0") errors.monto_otro = i.message;
            else if (path === "renta" && values.renta === "0") errors.renta_otro = i.message;
            else if (path === "plazo" && values.plazo === "0") errors.plazo_otro = i.message;
            else errors[path] = i.message;
        }
        return errors;
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={handleValidation}
            validationOnBlur={true}
        >
            {
                ({ values, handleChange, handleBlur, setFieldValue }) => {
                    const handleDinero = (e,field) => {
                        handleChange(e);
                        const input = e.target;
                        const selectionStart = input.selectionStart;
                        const value = formatearDineroNumber(input.value);
                        if (!value) {
                            setFieldValue(field, '');
                            return;
                        }

                        const newValue = formatearDineroStr(value);
                        let diff = newValue.length - values[field].length;

                        if (value > MAX_MONTO || value.length > MAX_MONTO.toString().length) {
                            setFieldValue(field, values[field]);
                            diff = 0;
                        }
                        else setFieldValue(field, newValue);

                        requestAnimationFrame(() => {
                            if (diff < 0) diff++;
                            if (diff > 0) diff--;
                            const newPos = Math.max(selectionStart + diff, 0);
                            input.setSelectionRange(newPos,newPos);
                        });
                    }

                    const handlePlazo = (e) => {
                        handleChange(e);
                        const value = e.target.value;
                        if (value > MAX_PLAZO || value.length > MAX_PLAZO.toString().length) setFieldValue("plazo_otro",values.plazo_otro);
                        else setFieldValue("plazo_otro",value);
                    }
                    
                    return (
                        <Form>
                            <div>
                                <Input
                                    id="monto"
                                    name="monto"
                                    value={values.monto}
                                    onChange={(e) => handleDinero(e,"monto")}
                                    onBlur={handleBlur}
                                    label="Monto"
                                    textHelp={`Monto debe ser entre ${formatearDineroStrBonito(MIN_MONTO)} y ${formatearDineroStrBonito(MAX_MONTO)}`}
                                    required
                                />
                            </div>
                            <div className="gap-2 mt-4">
                                <Select
                                    id="renta"
                                    name="renta"
                                    value={values.renta}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label="Renta"
                                    options={optionsRenta}
                                    textHelp="Rango aproximado de tu renta liquida mensual."
                                    required
                                />

                                { values.renta === '0' &&
                                    <Input
                                        id="renta_otro"
                                        name="renta_otro"
                                        value={values.renta_otro}
                                        onChange={(e) => handleDinero(e,"renta_otro")}
                                        onBlur={handleBlur}
                                        label="Renta (otro)"
                                        textHelp="Aproximado de tu renta liquida mensual."
                                        required
                                    />
                                }

                                <Select
                                    id="plazo"
                                    name="plazo"
                                    value={values.plazo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label="Plazo"
                                    options={optionPlazo}
                                    placeholder="Seleccione un plazo"
                                    required
                                />

                                { values.plazo === '0' &&
                                    <Input
                                        id="plazo_otro"
                                        name="plazo_otro"
                                        value={values.plazo_otro}
                                        onChange={handlePlazo}
                                        onBlur={handleBlur}
                                        label="Plazo (otro)"
                                        textHelp="Ingrese un plazo entre 6 y 60 meses"
                                        required
                                    />
                                }

                                <Input
                                    id="primerPago"
                                    name="primerPago"
                                    type="date"
                                    value={values.primerPago}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label="Primer pago"
                                    min={MIN_PRIMER_PAGO.toISOString().split("T")[0]}
                                    max={MAX_PRIMER_PAGO.toISOString().split("T")[0]}
                                    textHelp="Fecha en la que puedes realizar tu primer pago."
                                    required
                                />
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button type="button" className="btn btn-outline-secondary" onClick={handleVolver}>
                                    ← Volver
                                </button>

                                <button type="submit" className="btn btn-primary">
                                    Continuar →
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
}

export default Credito;