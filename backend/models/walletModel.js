import mongoose from "mongoose";

const walletSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    hasBudget: {
      type: Boolean,
      default: false,
    },
    budgetAmount: {
      type: Number,
      default: 0,
    },
    resetBalance: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActiveWallet: {
      type: Boolean,
      required: true,
      default: false,
    },
    resetPeriod: {
      type: String,
      default: "",
    },
    activeDate: {
      type: String,
      required: true,
    },
    resetTime: {
      type: String,
      default: "",
    },
    transactions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Transaction",
    },
  },
  {
    timestamps: true,
  }
);
walletSchema.set("collection", "Wallet");

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
