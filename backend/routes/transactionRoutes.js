import express from "express";
import { body } from "express-validator";
import { addTransaction } from "../controllers/transactionController.js";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";

router.post(
  "/addTransaction",
  body("wallet").isMongoId(),
  body("title").notEmpty(),
  body("note").notEmpty(),
  body("date").notEmpty(),
  body("category").notEmpty(),
  body("amount").notEmpty().isInt(),
  body("type").notEmpty(),
  protect,
  addTransaction
);

export default router;
