import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../utils/db.js";
import dotenv from "dotenv";
dotenv.config();

import { validarCliente, validarRut } from "../utils/validarInfo.js";

const SECRET = process.env.SECRET_KEY || 'clavesupersecretalolxd';

export const register = async (req,res) => {
    const client = await db.connect(); // Usamos cliente para transacción
    try {
        let { nombre, apellido, email, rut, password, confirmPassword } = req.body;

        
        nombre = nombre?.trim();
        apellido = apellido?.trim();
        email = email?.trim();
        rut = rut?.trim();
        
        
        if (!nombre || !apellido || !email || !rut || !password || !confirmPassword) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Las contraseñas no coinciden" });
        }

        if (await validarCliente(rut, email)) {
            return res.status(400).json({ error: "El RUT o Email ya están registrados." });
        }

        const hash = await bcrypt.hash(password, 12);

        
        await client.query('BEGIN');

        
        const insertClienteText = `
            INSERT INTO cliente (rut, nombres, apellidos, email, fecha_nacimiento, telefono, direccion)
            VALUES ($1, $2, $3, $4, '2000-01-01', '+56900000000', 'Sin direccion')
            RETURNING id;
        `;
        const resCliente = await client.query(insertClienteText, [rut, nombre, apellido, email]);
        const clienteId = resCliente.rows[0].id;

        
        const insertUsuarioText = `
            INSERT INTO usuario (cliente_id, username, password, estado)
            VALUES ($1, $2, $3, true)
            RETURNING id;
        `;
        
        await client.query(insertUsuarioText, [clienteId, rut, hash]);

        await client.query('COMMIT');

        res.json({ message: "Usuario registrado con éxito" });

    } catch (e) {
        await client.query('ROLLBACK');
        console.error(e);
        return res.status(500).json({
            error: `Error al registrar: ${e.message}`
        });
    } finally {
        client.release();
    }
}

export const login = async (req, res) => {
    try {
        let { rut, password } = req.body;
        rut = rut?.trim();

        if (!rut || !password) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }
    
        const query = `
            SELECT u.id, u.password, c.nombres, c.id as cliente_id 
            FROM usuario u
            JOIN cliente c ON u.cliente_id = c.id
            WHERE c.rut = $1
        `;
        
        const { rows } = await db.query(query, [rut]);
        
        if (!rows.length) return res.status(400).json({ error: "Usuario no encontrado." });

        const usuario = rows[0];
        
        
        const esValido = await bcrypt.compare(password, usuario.password.trim());
        
        if (!esValido) return res.status(401).json({ error: "Contraseña incorrecta." });

        const token = jwt.sign({
                id: usuario.id,
                clienteId: usuario.cliente_id,
                nombre: usuario.nombres
            },
            SECRET,
            { expiresIn: "1h" }
        );
        return res.json({ token });

    } catch (e) {
        console.error("Error en login:", e);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}