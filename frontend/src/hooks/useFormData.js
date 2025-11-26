import { useState } from "react";

/**
 * hook para manejar la data de un formulario.
 * 
 * - `defaultData` - la data que debe tener el form por defecto.
 */
export const useFormData = (defaultData = {}) => {
    const [formData, setFormData] = useState({ ...defaultData });

    const setField = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const setFields = (values) => {
        setFormData(prev => ({
            ...prev,
            ...values,
        }));
    };

    const resetField = (key) => {
        setFormData(prev => ({
            ...prev,
            [key]: defaultData[key],
        }));
    };

    const resetForm = () => {
        setFormData({ ...defaultData });
    };

    return {
        formData,
        setField,
        setFields,
        resetField,
        resetForm,
    };
};
