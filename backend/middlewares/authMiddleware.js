import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY || 'clavesupersecretalolxd';

export const verifyToken = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).json({ error: "No se proporcionó token de autenticación" });
        }

        
        const token = header.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Formato de token inválido" });
        }

        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; 
        next(); 
    } catch (e) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};