import express from "express";
const router = express.Router();
import HttpError from "../models/http-error.js";
import { registerUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").post(registerUser);

export default router;
