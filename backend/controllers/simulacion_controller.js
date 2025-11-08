import { checkRut } from "../utils/checkInfo.js";
import { obtenerScore, obtenerTasaBase, obtenerCapacidadPago } from "../utils/getInfo.js";


// const TASA_BASE = 0.12;
// const TASA_MAX = 0.45;

// const calcularTasaAnual = (monto,renta,riesgo) => {
//     let tasa = TASA_BASE;
//     if (monto < 1_000_000) tasa += 0.03;
//     else if (monto > 5_000_000 && monto <= 10_000_000) tasa += 0.06;
//     else if (monto > 10_000_000) tasa += 0.10;

//     const razon = monto / renta;
//     if (razon > 6) tasa += 0.20;
//     else if (razon > 4) tasa += 0.15;
//     else if (razon > 2) tasa += 0.075;
//     else if (razon < 0.5) tasa -= 0.025;

//     if (riesgo < 400) tasa += 0.15;
//     else if (riesgo < 550) tasa += 0.10;
//     else if (riesgo < 700) tasa += 0.05;

//     return Math.min(tasa, TASA_MAX);
// }

// PARAMETROS SE MOVERAN A /config !!!

const FACTOR_RIESGO = 0.25;
// const FACTOR_CAPACIDAD_PAGO = 0.3;

const TASA_ANUAL_MAXIMA = 0.45;
const TASA_ANUAL_MINIMA = 0.12;

export const simulacionCreditoConsumo = async (req,res) => {
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

        const tasaBase = obtenerTasaBase(monto,plazo);
        const score = obtenerScore(rut);

        const riesgo = (1 - score/1000)*FACTOR_RIESGO;

        let tasaAnual = tasaBase + riesgo;

        tasaAnual = Math.max(tasaAnual,TASA_ANUAL_MINIMA);
        tasaAnual = Math.min(tasaAnual,TASA_ANUAL_MAXIMA);
        const tasaMensual = tasaAnual / 12;
        const cuota = monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo)));
        const CAE = (Math.pow(1 + tasaMensual, 12) - 1) * 100;
        const CTC = cuota * plazo;

        return res.json({
            monto: monto,
            cuotaMensual: Math.round(cuota),
            tasaMensual: (tasaMensual*100).toFixed(2),
            tasaAnual: (tasaAnual*100).toFixed(2),
            CAE: (CAE).toFixed(2),
            CTC: Math.round(CTC),
            pago: pago,
            solicitud: {
                rut,
                renta,
                monto,
                plazo,
                pago
            },
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: `Error al simular credito de consumo: ${e.message}`
        });
    }
}