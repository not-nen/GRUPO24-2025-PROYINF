import { validarRut } from "../utils/validarInfo.js";
import { calcularRiesgoEstimado, calcularCAE, calcularTasaMensualFinal, calcularMensualAAnualNominal } from "../utils/calcularInfo.js";
import { obtenerTasaBase } from "../utils/obtenerInfo.js";

/**
 * simulador mas realista ahora :)
 * 
 * - rut - el rut de la persona, no se usa por ahora, pero puede utilizarse en un futuro, pero no es necesario para simular.
 * - renta - cuanto gana la persona mensualmente.
 * - monto - monto del credito.
 * - plazo - numero de cuotas.
 * - pago - fecha del primer pago.
 */
export const simulacionController = async (req,res) => {
    try {

        let { rut, renta, monto, plazo, pago } = req.body;

        rut = rut ? rut.trim() : "";
        renta = renta ? Number(renta.toString().trim()) : 0;
        monto = monto ? Number(monto.toString().trim()) : 0;
        plazo = plazo ? Number(plazo.toString().trim()) : 0;
        pago = pago ? pago.trim() : "";

        if (rut && !(await validarRut(rut))) return res.status(400).json({
            error: "Rut ingresado no pertenece a una persona real."
        });

        if (!renta || !monto || !plazo || !pago || renta <= 0 || monto <= 0 || plazo <= 0) return res.status(400).json({
            error: "Informacion entregada es erronea, no es posible procesarla."
        });

        const tasaBaseMensual = obtenerTasaBase("consumo", monto, plazo);
        if (tasaBaseMensual == null) return res.status(500).json({
            error: "No se encontro una tasa base."
        });

        const ajusteRiesgoMensual = calcularRiesgoEstimado(monto, plazo, renta);

        const tasaMensual = calcularTasaMensualFinal("consumo",tasaBaseMensual,ajusteRiesgoMensual);

        if (!tasaMensual && tasaMensual !== 0) return res.status(500).json({
            error: "No se pudo calcular la tasa mensual final."
        });

        const tasaAnual = calcularMensualAAnualNominal(tasaMensual);

        const cuota = monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo)));
        const CAE = calcularCAE(monto, plazo, cuota);
        const CTC = cuota * plazo;

        return res.json({
            monto: monto,
            cuotaMensual: Math.round(cuota),
            tasaMensual: (tasaMensual * 100).toFixed(3),
            tasaAnual: (tasaAnual * 100).toFixed(2),
            tasaBaseMensual: (tasaBaseMensual * 100).toFixed(3),
            ajusteRiesgoMensual: (ajusteRiesgoMensual * 100).toFixed(3),
            CAE: CAE.toFixed(2),
            CTC: Math.round(CTC),
            pago: pago,
            solicitud: { rut, renta, monto, plazo, pago }
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: `Error al simular credito de consumo: ${e.message}`
        });
    }
}