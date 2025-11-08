import express from "express";
import cors from "cors";

import { router as authRouter } from "./routes/auth.js";
import { router as simulacionRouter } from "./routes/simulacion.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/simulacion", simulacionRouter);

app.get("/", (req, res) => {
    res.send("API funcionando.");
});

app.listen(PORT, (e) => {
    if (e) {
        console.error("Error iniciando servidor: ", e);
    } else {
        console.log(`Servidor en: ${PORT}`);
    }
});