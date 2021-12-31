import express from "express";
import { body } from "express-validator";
import { getDashboardDetails } from "../controllers/dashboardController.js";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";

router.get("/getDashboardDetails", protect, getDashboardDetails);

export default router;
