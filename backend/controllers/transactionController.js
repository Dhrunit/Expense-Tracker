import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import moment from "moment";
import Transaction from "../models/transactionModel.js";
import Wallet from "../models/walletModel.js";
import returnMonth from "../utils/returnMonth.js";

// @desc    Auth user & get token
// @route   POST /api/transaction/addTransaction
// @access  Private
const addTransaction = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input or data missing in request body", 422)
    );
  }
  const { wallet, title, date, category, amount, type } = req.body;
  //   validate the wallet Id
  const walletDetails = await Wallet.findById(wallet);
  if (!walletDetails) {
    new HttpError("Wallet not found", 404);
  }
  if (type.toLowerCase() === "income") {
    walletDetails.balance += amount;
  } else {
    walletDetails.balance -= amount;
  }
  if (walletDetails.balance < 0) {
    new HttpError("Balance cannot be negative", 422);
  }
  //   create transaction
  const transaction = await Transaction.create({
    user: req.user._id,
    wallet,
    month: returnMonth(date.split("/")[1]),
    title,
    date,
    category,
    amount,
    type,
  });
  if (!transaction) {
    new HttpError("Transaction creation failed", 400);
  }
  //   Associate the transactionId
  walletDetails.transactions.push(transaction._id);
  const updatedWallet = await Wallet.findByIdAndUpdate(wallet, walletDetails, {
    new: true,
  });
  if (!updatedWallet) {
    new HttpError("Wallet linking failed", 400);
  }
  res.status(201).send({
    success: true,
    data: transaction,
    message: "Trasaction added successfully",
  });
};

// @desc    Auth user & get token
// @route   POST /api/transaction/editTransaction
// @access  Private
const editTransaction = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input or data missing in request body", 422)
    );
  }
};

// @desc    Auth user & get token
// @route   POST /api/transaction/deleteTransaction
// @access  Private
const deleteTransaction = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input or data missing in request body", 422)
    );
  }
};

// @desc    Auth user & get token
// @route   POST /api/transaction/getTransactions
// @access  Private
const getTransactionsForUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input or data missing in request body", 422)
    );
  }
};

export {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactionsForUser,
};
