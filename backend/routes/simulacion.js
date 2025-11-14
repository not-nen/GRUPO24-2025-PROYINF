import express from "express";
import { simulacionController } from "../controllers/simulacionController.js";

const router = express.Router();
router.post("/", simulacionController);

export { router };