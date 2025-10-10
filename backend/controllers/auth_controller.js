import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET_KEY || 'clavesupersecretalolxd';

export let register = async (req,res) => {
    const { nombre, apellido, email, rut, password, confirmPassword } = req.body;
    if (!nombre || !apellido || !email || !rut || !password || !confirmPassword) {
        return res.status(400).json({
            error: "Faltan datos obligatorios"
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            error: "Las contraseñas no coinciden"
        });
    }

    try {
        const { rows } = await db.query(`
            SELECT * FROM clientes WHERE rut = $1 OR email = $2
            `,
            [rut,email]
        );
        if (rows.length) return res.status(400).json({
            error: "Ya existe un usuario con ese RUT o email"
        });

        const hash = await bcrypt.hash(password,12);

        const result = await db.query(`
            INSERT INTO clientes (nombre, apellido, email, rut, password)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING id, nombre, email
            `,
            [nombre,apellido,email,rut,hash]
        );
        res.json(result.rows[0]);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: `Error al registrar usuario: ${e.message}`
        });
    }
}

export let login = async (req,res) => {
    const { rut, password } = req.body;
    if (!rut || !password) {
        return res.status(400).json({
            error: "Faltan datos obligatorios"
        });
    }

    try {
        const { rows } = await db.query(`
            SELECT * FROM clientes WHERE rut = $1
            `,
            [rut]
        );
        if (!rows.length) return res.status(400).json({
            error: "Usuario no encontrado."
        });

        const cliente = rows[0];
        const esValido = await bcrypt.compare(password, cliente.password);
        if (!esValido) return res.status(401).json({
            error: "Contraseña incorrecta."
        });

        const token = jwt.sign({
                id: cliente.id,
                nombre: cliente.nombre
            },
            SECRET,{
                expiresIn: "30m"
            }
        );
        res.json({ token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: `Error al iniciar sesión: ${e.message}`
        });
    }
}