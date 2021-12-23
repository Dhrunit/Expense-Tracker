import express from "express";
import { body } from "express-validator";
import { addWallet } from "../controllers/walletController.js";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";

router.post(
  "/addWallet",
  body("user").isMongoId(),
  body("name").isLength({ min: 6 }),
  body("currency").notEmpty(),
  body("balance").notEmpty().isInt(),
  body("hasBudget").notEmpty().isBoolean(),
  body("budgetAmount").notEmpty().isInt(),
  body("resetBalance").notEmpty().isBoolean(),
  body("resetPeriod").notEmpty(),
  body("isActiveWallet").notEmpty().isBoolean(),
  protect,
  addWallet
);

export default router;
