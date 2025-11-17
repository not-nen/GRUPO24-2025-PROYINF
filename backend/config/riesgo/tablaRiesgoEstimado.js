// EL AJUSTE DEBE SER PARA LA TNM BASE !!!!!
// ESTO ES SOLO PARA ESTIMACION (SIMULACION)
// NO DEBERIA USARSE PARA LA SOLICITUD, PARA
// ESO LA tablaRiesgo.js

const TABLA_RIESGO_ESTIMADO = [
    { maxRango: 0.07, ajuste: 0.0000 },         // muy bajo, perfecto!
    { maxRango: 0.10, ajuste: 0.0015 },         // bajo
    { maxRango: 0.15, ajuste: 0.0030 },         // medio bajo
    { maxRango: 0.20, ajuste: 0.0060 },         // medio
    { maxRango: 0.25, ajuste: 0.0100 },         // medio alto
    { maxRango: 0.30, ajuste: 0.0150 },         // alto
    { maxRango: 0.40, ajuste: 0.0200 },         // muy alto
    { maxRango: 0.50, ajuste: 0.0300 },         // critico
    { maxRango: Infinity, ajuste: 0.0400 },     // demasiado riesgo
];

// para ordenarla si es que esta desordenada.
TABLA_RIESGO_ESTIMADO.sort((a, b) => a.maxRango - b.maxRango);

export { TABLA_RIESGO_ESTIMADO };