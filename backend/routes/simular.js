import express from "express";
import { creditoConsumo } from "../controllers/simular_controller.js";

const router = express.Router();

router.post("/credito-consumo", creditoConsumo);

export { router };