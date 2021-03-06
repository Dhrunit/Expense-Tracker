import express from "express";
import { body } from "express-validator";
const router = express.Router();
import {
  authUser,
  registerUser,
  changePassword,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  registerUser
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  authUser
);

router.post(
  "/changePassword",
  body("password").isLength({ min: 6 }),
  protect,
  changePassword
);

export default router;
