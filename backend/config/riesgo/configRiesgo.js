import { TABLA_RIESGO_ESTIMADO } from "./tablaRiesgoEstimado.js";

export const CONFIG_RIESGO = {
    usarTablaEstimado: false,                   // se ocupara el ajuste logistico si esta es false.
    tablaEstimado: TABLA_RIESGO_ESTIMADO,       // si usarTabla es true, se usa esta.
    
    // para el uso del ajuste logistico
    ajusteLogistico: {
        usarMaximoTabla: true,          // usar el ajuste maximo presente en la tabla. si es falso, se usa el maximo definido aqui.
        maximo: 0.180,
        pendiente: 30,
        ratio: 0.22,
    }
}