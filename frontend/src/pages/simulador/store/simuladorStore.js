// import { create } from "zustand";

import { formatearDineroNumber } from "../../../components/form/utils/formatoDinero";

const hoy = new Date();
const primerPagoDefault = new Date(hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate());

export const defaultData = {
    rut: "",
    monto: "",
    renta: "",
    renta_otro: "",
    plazo: "",
    plazo_otro: "",
    primerPago: primerPagoDefault.toISOString().split("T")[0],
};

export const filterData = (values) => {
    const data = { ...values };

    if (data.renta === "0") data.renta = data.renta_otro;
    delete data.renta_otro;

    if (data.plazo === "0") data.plazo = data.plazo_otro;
    delete data.plazo_otro;

    data.monto = formatearDineroNumber(data.monto);
    data.renta = formatearDineroNumber(data.renta);

    return data;
}

// const STORE_NAME = "simulator-store";

// export const simuladorStore = create((set) => ({
//     formData: JSON.parse(sessionStorage.getItem(STORE_NAME)) || { ...defaultData },
//     setField: (field, value) => {
//         set((state) => {
//             const newData = { ...state.formData, [field]: value ?? "" };
//             sessionStorage.setItem(STORE_NAME, JSON.stringify(newData));
//             return { formData: newData };
//         });
//     },
//     reset: () => {
//         sessionStorage.removeItem(STORE_NAME);
//         set({ formData: { ...defaultData } });
//     },
// }));