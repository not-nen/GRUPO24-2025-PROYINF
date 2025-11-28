import { createContext, useContext, useState } from "react";
import { backendUrl } from "utils/backend";
import { handleData } from "utils/handlers";

const RegisterContext = createContext();
export const useRegister = () => useContext(RegisterContext);

export function RegisterProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (formData) => {
        setError(null);
        setLoading(true);

        try {
            const data = handleData(formData);

            const res = await fetch(backendUrl + "/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Error al registrar usuario");

            setLoading(false);
            return { ok: true };

        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { ok: false, error: err.message };
        }
    };

    return (
        <RegisterContext.Provider value={{ registerUser, loading, error }}>
            {children}
        </RegisterContext.Provider>
    );
}