import { z } from "zod";

import { formatearDineroStrBonito } from "utils/formatoDinero";

export const MIN_MONTO = 500_000;
export const MAX_MONTO = 100_000_000;

export const MIN_PLAZO = 6;
export const MAX_PLAZO = 60;

const MIN_MESES_PRIMER_PAGO = 1;
const MAX_MESES_PRIMER_PAGO = 3;

const hoy = new Date();
export const MIN_PRIMER_PAGO = new Date(hoy.getFullYear(),hoy.getMonth()+MIN_MESES_PRIMER_PAGO,hoy.getDate());
export const MAX_PRIMER_PAGO = new Date(hoy.getFullYear(),hoy.getMonth()+MAX_MESES_PRIMER_PAGO,hoy.getDate());
const MIN_PRIMER_PAGO_FIXED = new Date(MIN_PRIMER_PAGO);
MIN_PRIMER_PAGO_FIXED.setDate(MIN_PRIMER_PAGO.getDate()-1);

const montoValidation = z.coerce.number({
    required_error: "Debes ingresar un monto.",
    invalid_type_error: "El monto no es valido.",
})
    .min(MIN_MONTO, `Ingresa un monto superior a ${formatearDineroStrBonito(MIN_MONTO)}.`)
    .max(MAX_MONTO, `Ingresa un monto inferior a ${formatearDineroStrBonito(MAX_MONTO)}.`);

const rentaValidation = z.coerce.number({
    required_error: "Debes ingresar tu renta.",
    invalid_type_error: "La renta no es valida.",
}).min(1, "Debes ingresar tu renta.");

const plazoValidation = z.coerce.number({
    required_error: "Debes ingresar un plazo.",
    invalid_type_error: "El plazo no es valido.",
})
    .min(MIN_PLAZO, `Ingresa un plazo mayor a ${MIN_PLAZO} meses.`)
    .max(MAX_PLAZO, `Ingresa un plazo menor a ${MAX_PLAZO} meses.`);

export const simuladorSchema = z.object({
    rut: z.string()
        .regex(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]{1}$/, "Formato de Rut invalido."),
    monto: montoValidation,
    renta: rentaValidation,
    plazo: plazoValidation,
    primerPago: z.coerce.date({
        required_error: "Debes ingresar una fecha.",
        invalid_type_error: "La fecha no es valida.",
    })
    .min(MIN_PRIMER_PAGO_FIXED, `El primer pago debe ser desde ${MIN_PRIMER_PAGO.toLocaleDateString()}`)
    .max(MAX_PRIMER_PAGO, `El primer pago debe ser antes de ${MAX_PRIMER_PAGO.toLocaleDateString()}`),
});