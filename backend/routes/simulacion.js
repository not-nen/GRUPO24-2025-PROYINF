import express from "express";
import { simulacionCreditoConsumo } from "../controllers/simulacion_controller.js";

const router = express.Router();
router.post("/", simulacionCreditoConsumo);

export { router };