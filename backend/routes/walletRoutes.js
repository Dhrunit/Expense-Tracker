import express from "express";
import { body } from "express-validator";
import {
  addWallet,
  deleteWallet,
  editWallet,
  getWalletById,
  getWalletsForUser,
} from "../controllers/walletController.js";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";

router.post(
  "/addWallet",
  body("name").isLength({ min: 6 }),
  body("currency").notEmpty(),
  body("balance").notEmpty().isInt(),
  body("hasBudget").notEmpty().isBoolean(),
  body("resetBalance").notEmpty().isBoolean(),
  body("isActiveWallet").notEmpty().isBoolean(),
  protect,
  addWallet
);

router.put(
  "/editWallet",
  body("walletId").isMongoId(),
  body("name").isLength({ min: 6 }),
  body("currency").notEmpty(),
  body("balance").notEmpty().isInt(),
  body("hasBudget").notEmpty().isBoolean(),
  body("budgetAmount").notEmpty().isInt(),
  body("resetBalance").notEmpty().isBoolean(),
  body("resetPeriod").notEmpty(),
  body("isActiveWallet").notEmpty().isBoolean(),
  protect,
  editWallet
);

router.get("/getWallet/:walletId", protect, getWalletById);

router.delete("/deleteWallet/:walletId", protect, deleteWallet);

router.get("/getWallets", protect, getWalletsForUser);

export default router;
