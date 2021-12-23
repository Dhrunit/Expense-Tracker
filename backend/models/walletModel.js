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
      required: true,
      default: false,
    },
    budgetAmount: {
      type: Number,
      required: true,
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
      required: true,
      default: "",
    },
    activeDate: {
      type: String,
      required: true,
    },
    resetTime: {
      type: String,
      required: true,
      default: "",
    },
    incomes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Income",
    },
    expenses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Expense",
    },
  },
  {
    timestamps: true,
  }
);
walletSchema.set("collection", "Wallet");

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
