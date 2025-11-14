import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../utils/db.js";

import dotenv from "dotenv";
dotenv.config();

import { validarCliente, validarRut } from "../utils/validarInfo.js";

const SECRET = process.env.SECRET_KEY || 'clavesupersecretalolxd';

export const register = async (req,res) => {
    try {
        let { nombre, apellido, email, rut, password, confirmPassword } = req.body;

        nombre = nombre ? nombre.trim() : "";
        apellido = apellido ? apellido.trim() : "";
        email = email ? email.trim() : "";
        rut = rut ? rut.trim() : "";
        password = password ? password.trim() : "";
        confirmPassword = confirmPassword ? confirmPassword.trim() : "";

        if (!nombre || !apellido || !email || !rut || !password || !confirmPassword) {
            return res.status(400).json({
                error: "Faltan datos obligatorios"
            });
        }

        if (!(await validarRut(rut))) {
            return res.status(400).json({
                error: "Rut no existe."
            });
        }
        if (await validarCliente(rut,email)) {
            return res.status(400).json({
                error: "Rut o correo ya pertenece a un cliente."
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Las contraseñas no coinciden"
            });
        }

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

export const login = async (req,res) => {
    try {
        let { rut, password } = req.body;
        rut = rut ? rut.trim() : "";
        password = password ? password.trim() : "";
        if (!rut || !password) {
            return res.status(400).json({
                error: "Faltan datos obligatorios"
            });
        }
    
        if (!(await validarCliente(rut,null))) {
            return res.status(400).json({
                error: "Rut no pertenece a un cliente."
            });
        }

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