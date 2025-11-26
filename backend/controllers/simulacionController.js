import { db } from "../utils/db.js";
import { validarRut } from "../utils/validarInfo.js";
import { calcularRiesgoEstimado, calcularCAE, calcularTasaMensualFinal, calcularMensualAAnualNominal } from "../utils/calcularInfo.js";
import { obtenerTasaBase } from "../utils/obtenerInfo.js";


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
            error: "Información entregada es errónea, no es posible procesarla."
        });

        const tasaBaseMensual = obtenerTasaBase("consumo", monto, plazo);
        if (tasaBaseMensual == null) return res.status(500).json({
            error: "No se encontró una tasa base."
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
            error: `Error al simular crédito: ${e.message}`
        });
    }
}


export const guardarSimulacion = async (req, res) => {
    try {
        
        const { id: usuarioId, clienteId } = req.user; 
        
        
        if (!clienteId) {
            return res.status(400).json({ error: "Token incompleto (falta clienteId). Inicia sesión nuevamente." });
        }

        const { monto, plazo, cuotaMensual, cae } = req.body;

        await db.query(`
            INSERT INTO simulacion (cliente_id, monto, plazo, cuota_mensual, cae)
            VALUES ($1, $2, $3, $4, $5)
        `, [clienteId, monto, plazo, cuotaMensual, cae]);

        res.json({ message: "Simulación guardada correctamente" });
    } catch (e) {
        console.error("Error guardando:", e);
        res.status(500).json({ error: "Error al guardar la simulación" });
    }
};


export const obtenerHistorial = async (req, res) => {
    try {
        const { clienteId } = req.user;
        if (!clienteId) {
            return res.status(400).json({ error: "Usuario no asociado a un cliente." });
        }

        const { rows } = await db.query(`
            SELECT * FROM simulacion 
            WHERE cliente_id = $1 
            ORDER BY fecha_simulacion DESC
        `, [clienteId]);

        res.json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al obtener el historial" });
    }
};