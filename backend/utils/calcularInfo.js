import { CONFIG_RIESGO } from "../config/riesgo/configRiesgo.js";
import { CONFIG_CREDITOS } from "../config/creditos/configCreditos.js";

/**
 * calcula el ajuste de riesgo estimado
 *
 * - monto - monto del credito.
 * - plazo - numero de cuotas.
 * - renta - renta mensual de la persona.
 */
export const calcularRiesgoEstimado = (monto, plazo, renta) => {
    const ratio = monto/(renta*plazo);
    if (!Number.isFinite(ratio) || ratio < 0) return 0;

    // USAMOS LA TABLA
    const tabla = [...CONFIG_RIESGO.tablaEstimado].sort((a,b) => a.maxRango - b.maxRango);
    if (CONFIG_RIESGO.usarTablaEstimado) {
        for (const r of tabla) if (ratio < r.maxRango) return r.ajuste;
        return 0; // por si acaso
    }

    // USAMOS EL AJUSTE LOGISTICO
    let {
        usarMaximoTabla: USAR_MAXIMO_TABLA,
        maximo: AJUSTE_MAX,
        pendiente: K,
        ratio: X0,
    } = CONFIG_RIESGO.ajusteLogisticoEstimado;

    if (USAR_MAXIMO_TABLA) {
        AJUSTE_MAX = tabla[tabla.length - 1].ajuste;
    }

    return AJUSTE_MAX / (1 + Math.exp(-K * (ratio - X0)));
};

/**
 * calcula la tasa interna de retorno (TIR), para calcular el CAE del credito.
 * 
 * - flujoCaja - arreglo con flujos de dinero del credito
 * - guess - valor inicial de aproximacion
 */
const calcularTIR = (flujoCaja, guess = 0.01) => {
    let rate = guess;
    for (let i = 0; i < 50; i++) {
        let f = 0;
        let df = 0;

        flujoCaja.forEach((v, t) => {
            const denom = Math.pow(1 + rate, t);
            f += v / denom;
            df -= (t * v) / (denom * (1 + rate));
        });

        const newRate = rate - f / df;
        if (Math.abs(newRate - rate) < 1e-10) return rate;
        rate = newRate;
    }
    return rate;
};

/**
 * calcula el cae, considerando costos unicos y mensuales tambien!!
 * 
 * - monto - monto del credito.
 * - plazo - numero de cuotas.
 * - cuota - cuanto pagara la persona mensualmente.
 * - costosUnicos - costos unicos del credito, como gasto de operaciones.
 * - costosMensuales - costos mensuales del credito, como seguros (desgravamen, cesantia, etc).
 */
export const calcularCAE = (
    monto,
    plazo,
    cuota,
    costosUnicos = 0,
    costosMensuales = 0
) => {
    const montoEntregado = monto - costosUnicos;

    const flujos = [montoEntregado];
    const cuotaReal = cuota + costosMensuales;

    for (let i = 1; i <= plazo; i++) flujos.push(-cuotaReal);

    const tirMensual = calcularTIR(flujos);
    return (Math.pow(1 + tirMensual, 12) - 1) * 100;
};

// pasa tasa mensual a anual
export const calcularMensualAAnual = (t) => Math.pow(1 + t, 12) - 1;

// pasa tasa anual a mensual
export const calcularAnualAMensual = (a) => Math.pow(1 + a, 1 / 12) - 1;

/**
 * calcula tasa mensual final aplicando ajustes de riesgo estimado y limites anuales
 * 
 * - tasaBaseMensual - TNM desde la tabla
 * - ajusteRiesgoMensual - ajuste
 */
export const calcularTasaMensualFinal = (
    tipo,
    tasaBaseMensual,
    ajusteRiesgoMensual,
) => {
    const CONFIG_CREDITO_TIPO = CONFIG_CREDITOS[tipo];
    if (!CONFIG_CREDITO_TIPO) return null;

    const TASA_ANUAL_MIN = CONFIG_CREDITO_TIPO.interesAnualMin;
    const TASA_ANUAL_MAX = CONFIG_CREDITO_TIPO.interesAnualMax;

    if (TASA_ANUAL_MIN == null || TASA_ANUAL_MAX == null) return null;

    const tasaMensualPre = tasaBaseMensual + ajusteRiesgoMensual;
    const tasaAnualPre = calcularMensualAAnual(tasaMensualPre);

    const tasaAnualAjustada = Math.min(Math.max(tasaAnualPre, TASA_ANUAL_MIN),TASA_ANUAL_MAX);
    return calcularAnualAMensual(tasaAnualAjustada);
};