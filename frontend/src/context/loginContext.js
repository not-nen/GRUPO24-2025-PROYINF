import { createContext, useContext, useState } from "react";
import { backendUrl } from "utils/backend";
import { useAuth } from "context/authContext";

const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);

export function LoginProvider({ children }) {
    const { login: authLogin } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (rut, password) => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${backendUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rut, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");

            authLogin(data.token); // guarda token en AuthContext

            return { ok: true };

        } catch (err) {
            setError(err.message);
            return { ok: false };
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContext.Provider value={{ loading, error, handleLogin }}>
            {children}
        </LoginContext.Provider>
    );
}