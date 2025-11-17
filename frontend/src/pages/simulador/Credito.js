import { Formik, Form } from "formik";
import { useOutletContext } from "react-router-dom";

import Input from "components/inputs/Input";
import Select from "components/inputs/Select";
import { formatearDineroNumber, formatearDineroStr, formatearDineroStrBonito } from "utils/formatoDinero";
import { optionPlazo, optionsRenta } from "pages/simulador/fields/options";

import FormContainer from "components/containers/FormContainer";
import InputsContainer from "components/containers/InputsContainer";
import BtnsContainer from "components/containers/BtnsContainer";
import FillContainer from "components/containers/FillContainer";
import PrevStepBtn from "components/subComponents/PrevStepBtn";
import CreditInput from "components/inputs/CreditInput";

import { MAX_PRIMER_PAGO, MIN_PRIMER_PAGO, MIN_MONTO, MAX_MONTO, MAX_PLAZO } from "pages/simulador/schemas/simuladorSchema";

const Credito = () => {
    const { formDataSteps, currIndex, prevStep, handleSubmit, handleValidation, schema } = useOutletContext();

    return (
        <Formik
            initialValues={formDataSteps[currIndex]}
            onSubmit={handleSubmit}
            validate={(values) => handleValidation(values,schema)}
            validationOnBlur={true}
        >
            {
                ({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => {
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
                        <FormContainer>
                            <Form>
                                <PrevStepBtn onClick={prevStep}/>
                                <FillContainer/>
                                <InputsContainer>
                                    <CreditInput
                                        id="monto"
                                        name="monto"
                                        value={values.monto}
                                        onChange={(e) => handleDinero(e,"monto")}
                                        onBlur={handleBlur}
                                        textHelp={`Monto debe ser entre ${formatearDineroStrBonito(MIN_MONTO)} y ${formatearDineroStrBonito(MAX_MONTO)}`}
                                        errors={errors}
                                        touched={touched}
                                    />
                                    {/* <Input
                                        id="monto"
                                        name="monto"
                                        value={values.monto}
                                        onChange={(e) => handleDinero(e,"monto")}
                                        onBlur={handleBlur}
                                        label="Monto"
                                        textHelp={`Monto debe ser entre ${formatearDineroStrBonito(MIN_MONTO)} y ${formatearDineroStrBonito(MAX_MONTO)}`}
                                        errors={errors}
                                        touched={touched}
                                        required
                                    /> */}
                                </InputsContainer>
                                <InputsContainer>
                                    <Select
                                        id="renta"
                                        name="renta"
                                        value={values.renta}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Renta"
                                        options={optionsRenta}
                                        textHelp="Rango aproximado de tu renta liquida mensual."
                                        errors={errors}
                                        touched={touched}
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
                                            errors={errors}
                                            touched={touched}
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
                                        errors={errors}
                                        touched={touched}
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
                                            errors={errors}
                                            touched={touched}
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
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                </InputsContainer>
                                <BtnsContainer>
                                    <button type="submit" className="btn btn-primary">
                                        Simular credito de consumo →
                                    </button>
                                </BtnsContainer>
                                {/* <pre>
                                    {JSON.stringify(values, null, 2)}
                                </pre> */}
                            </Form>
                        </FormContainer>
                    )
                }
            }
        </Formik>
    );
}

export default Credito;