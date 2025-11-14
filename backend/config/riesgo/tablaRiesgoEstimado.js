// EL AJUSTE DEBE SER PARA LA TNM BASE !!!!!
// ESTO ES SOLO PARA ESTIMACION (SIMULACION)
// NO DEBERIA USARSE PARA LA SOLICITUD, PARA
// ESO LA tablaRiesgo.js

const TABLA_RIESGO_ESTIMADO = [
    { maxRango: 0.07, ajuste: 0.000 },      // muy bajo, perfecto!
    { maxRango: 0.10, ajuste: 0.008 },      // bajo
    { maxRango: 0.13, ajuste: 0.015 },      // medio bajo
    { maxRango: 0.17, ajuste: 0.025 },      // medio
    { maxRango: 0.22, ajuste: 0.040 },      // medio alto
    { maxRango: 0.28, ajuste: 0.060 },      // alto
    { maxRango: 0.35, ajuste: 0.085 },      // muy alto
    { maxRango: 0.45, ajuste: 0.120 },      // critico
    { maxRango: Infinity, ajuste: 0.180 },  // demasiado riesgo
];

// para ordenarla si es que esta desordenada.
TABLA_RIESGO_ESTIMADO.sort((a, b) => a.maxRango - b.maxRango);

export { TABLA_RIESGO_ESTIMADO };