import express from "express";
import { getDashboardDetails } from "../controllers/dashboardController.js";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";

router.get("/getDashboardDetails/:month", protect, getDashboardDetails);

export default router;
