import { db } from "./db.js";


export const validarRut = async (rut) => {
    return true; 
}

export const validarCliente = async (rut, email) => {
    try {
        rut = rut ? rut.trim() : "";
        email = email ? email.trim() : "";
        
        if (!rut && !email) return false;

        
        if (rut) {
            const res = await db.query(
                "SELECT 1 FROM cliente WHERE rut = $1 LIMIT 1;", 
                [rut]
            );
            if (res.rowCount > 0) return true;
        }

        
        if (email) {
            const res = await db.query(
                "SELECT 1 FROM cliente WHERE email = $1 LIMIT 1;", 
                [email]
            );
            if (res.rowCount > 0) return true;
        }

        return false;

    } catch (err) {
        console.error("Error verificando cliente: ", err);
        
        return true; 
    }
};