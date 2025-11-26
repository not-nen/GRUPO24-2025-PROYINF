import { formatearDineroNumber } from "utils/formatoDinero";

/**
 * valida los `values` con el `schema` de zod, para retornar errores.
 * 
 * - `values` - valores del formulario.
 * - `schema` - schema Zod para validar los datos.
 * - retorna los errores para usar con Formik.
 */
export const handleValidation = (values, schema) => {
    let valuesFix = handleData(values);
    const res = handleSchema(valuesFix, schema).safeParse(valuesFix);

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
};

/**
 * retorna un schema, que solo validara los datos presentes en `values`, a partir de un `schema`.
 * 
 * - `values` - los valores que necesitas del schema, se pasan directo los values del formulario.
 * - `schema` - el schema a transformar
 * - retorna el schema modificado.
 */
export const handleSchema = (values,schema) => {
    const keys = Object.keys(values);
    const res = schema.pick(
        Object.fromEntries(keys.map((k) => [k,true]))
    );
    return res;
}


/**
 * transforma los `values` del formulario, usarlo antes de validar o enviar.
 * 
 * Lo principal es transformar los valores a los que corresponden y mueve
 * los keys tipo "key_otro", al "key" que corresponde, para que su validacion
 * y envio (a backend por ejemplo) funcione correctamente.
 * 
 * - values - los datos a transformar.
 * - retorna los valores ya transformados.
 */
export const handleData = (values) => {
    const data = { ...values };

    Object.keys(data).forEach((key) => {
        if (key.endsWith("_otro")) {
            const mainKey = key.replace("_otro", "");
            if (data[mainKey] === "0") data[mainKey] = data[key];
            delete data[key];
        }
    });

    if ("monto" in data) data.monto = formatearDineroNumber(data.monto);
    if ("renta" in data) data.renta = formatearDineroNumber(data.renta);

    return data;
};