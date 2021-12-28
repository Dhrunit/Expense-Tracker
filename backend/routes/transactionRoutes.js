import express from "express";
import { body } from "express-validator";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";

export default router;
