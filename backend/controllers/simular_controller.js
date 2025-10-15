import { checkRut } from "../utils/checkInfo.js";
import { getRiesgo, getEdad, getHistorial } from "../utils/getInfo.js";

const TASA_BASE = 0.12;
const TASA_MAX = 0.45;

const RIESGO_DEFAULT = 500;
const HISTORIAL_DEFAULT = 1;
const EDAD_DEFAULT = 30;

const calcularTasaAnual = (monto,renta,riesgo) => {
    let tasa = TASA_BASE;
    if (monto < 1_000_000) tasa += 0.03;
    else if (monto > 5_000_000 && monto <= 10_000_000) tasa += 0.06;
    else if (monto > 10_000_000) tasa += 0.10;

    const razon = monto / renta;
    if (razon > 6) tasa += 0.20;
    else if (razon > 4) tasa += 0.15;
    else if (razon > 2) tasa += 0.075;
    else if (razon < 0.5) tasa -= 0.025;

    if (riesgo < 400) tasa += 0.15;
    else if (riesgo < 550) tasa += 0.10;
    else if (riesgo < 700) tasa += 0.05;

    return Math.min(tasa, TASA_MAX);
}

export const creditoConsumo = async (req,res) => {
    try {

        let { rut, renta, monto, plazo, pago } = req.body;

        rut = rut ? rut.trim() : "";
        renta = renta ? Number(renta.toString().trim()) : 0;
        monto = monto ? Number(monto.toString().trim()) : 0;
        plazo = plazo ? Number(plazo.toString().trim()) : 0;
        pago = pago ? pago.trim() : "";

        if (rut && !(await checkRut(rut))) return res.status(400).json({
            error: "Rut ingresado no pertenece a una persona real."
        });

        const riesgo = rut ? await getRiesgo(rut) : RIESGO_DEFAULT; 
        const historial = rut ? await getHistorial(rut) : HISTORIAL_DEFAULT;
        let tasaAnual = calcularTasaAnual(monto,renta,riesgo);
        if (historial === 1) tasaAnual += 0.05;
        if (historial === 0) tasaAnual += 0.12;

        const edad = rut ? await getEdad(rut) : EDAD_DEFAULT;
        if (edad < 21) tasaAnual += 0.05;
        if (edad > 70) tasaAnual += 0.07;

        tasaAnual = Math.min(tasaAnual, TASA_MAX);
        const tasaMensual = tasaAnual / 12;
        const cuota = Math.round(monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo))));
        const CAE = ((Math.pow(1 + tasaMensual, 12) - 1) * 100).toFixed(2);
        const CTC = Math.round(cuota * plazo);

        return res.json({
            monto: monto,
            cuotaMensual: cuota,
            tasaMensual: (tasaMensual*100).toFixed(2),
            tasaAnual: (tasaAnual*100).toFixed(2),
            CAE: CAE,
            CTC: CTC,
            pago: pago
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: `Error al simular credito de consumo: ${e.message}`
        });
    }
}