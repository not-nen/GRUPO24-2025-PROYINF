import express from "express";
import { simulacionController, guardarSimulacion, obtenerHistorial } from "../controllers/simulacionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/", simulacionController);


router.post("/guardar", verifyToken, guardarSimulacion);
router.get("/historial", verifyToken, obtenerHistorial);

export { router };