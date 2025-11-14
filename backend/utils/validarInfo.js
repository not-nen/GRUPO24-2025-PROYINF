import { db } from "./db.js";

export const validarRut = async (rut) => {
    // SIMULACION DE VALIDACION DE RUT XD
    return true;
}

export const validarCliente = async (
    rut,
    email
) => {
    return false;
    // retorna directamente false ya que la bdd no esta implementada de momento.
    
    try {
        rut = rut ? rut.trim() : "";
        email = email ? email.trim() : "";
        if (!rut && !email) {
            return false;
        }

        // RUT CHECK
        if (rut) {
            const res = await db.query(
                "SELECT 1 FROM clientes WHERE rut = $1 LIMIT 1;",
                [rut]
            );
            if (res.rowCount > 0) return true;
        }

        // EMAIL CHECK
        if (email) {
            const res = await db.query(
                "SELECT 1 FROM clientes WHERE email = $1 LIMIT 1;",
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