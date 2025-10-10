import express from "express";
import cors from "cors";

import router from "./routes/auth.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

app.use("/api/auth", router);

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