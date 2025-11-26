// import { create } from "zustand";

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