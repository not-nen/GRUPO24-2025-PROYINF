
// PARAMETROS SE MOVERAN A /config !!!

const TASA_BASE_MIN = 0.12;
const TASA_BASE_MAX = 0.36;

const MONTO_MIN = 500_000;
const MONTO_MAX = 30_000_000;

export const obtenerTasaBase = (monto, plazo) => {
    const monto_rango = MONTO_MAX - MONTO_MIN;
    const monto_escala = Math.min(Math.max((monto - MONTO_MIN) / monto_rango, 0), 1);
    
    let tasa_base = TASA_BASE_MAX - monto_escala * (TASA_BASE_MAX - TASA_BASE_MIN);

    // mas meses = mas riesgo (MOMENTANEO!!! o no?)
    if (plazo > 24) {
        const factor_plazo = Math.min((plazo - 24) / 36, 1);
        tasa_base += factor_plazo * 0.03;
    }

    tasa_base = Math.min(Math.max(tasa_base, TASA_BASE_MIN), TASA_BASE_MAX);

    return tasa_base;
};

export const obtenerScore = (rut) => {
    return 800;
}

export const obtenerCapacidadPago = (renta,monto,plazo) => {
    return 0;
}