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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid input or data missing in request body", 422)
      );
    }
    const { wallet, title, date, category, amount, type, note } = req.body;
    //   validate the wallet Id
    const walletDetails = await Wallet.findById(wallet);
    if (!walletDetails) {
      return next(new HttpError("Wallet not found", 404));
    }
    if (type.toLowerCase() === "income") {
      walletDetails.balance += amount;
    } else {
      walletDetails.balance -= amount;
    }
    if (walletDetails.balance < 0) {
      return next(new HttpError("Balance cannot be negative", 422));
    }
    //   create transaction
    const transaction = await Transaction.create({
      user: req.user._id,
      wallet,
      note,
      month: returnMonth(date.split("/")[1]),
      title,
      date,
      category,
      amount,
      type: type.toLowerCase(),
    });
    if (!transaction) {
      return next(new HttpError("Transaction creation failed", 400));
    }
    //   Associate the transactionId
    walletDetails.transactions.push(transaction._id);
    const updatedWallet = await Wallet.findByIdAndUpdate(
      wallet,
      walletDetails,
      {
        new: true,
      }
    );
    if (!updatedWallet) {
      return next(new HttpError("Wallet linking failed", 400));
    }
    res.status(201).send({
      success: true,
      data: transaction,
      message: "Trasaction added successfully",
    });
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

// @desc    Auth user & get token
// @route   POST /api/transaction/editTransaction
// @access  Private
const editTransaction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid input or data missing in request body", 422)
      );
    }
    const { title, date, category, amount, type, note, transactionId } =
      req.body;

    const transactionDetails = await Transaction.findById(transactionId);
    if (!transactionDetails) {
      return next(new HttpError("Transaction Id incorrect", 404));
    }
    const walletDetails = await Wallet.findById(transactionDetails.wallet);
    if (!walletDetails) {
      return next(
        new HttpError("Fetching the linked wallet details failed", 400)
      );
    }
    if (
      transactionDetails.type === "income" &&
      type.toLowerCase() === "income"
    ) {
      console.log("1");
      walletDetails.balance -= transactionDetails.amount;
      walletDetails.balance += amount;
    }
    if (
      transactionDetails.type === "expense" &&
      type.toLowerCase() === "expense"
    ) {
      console.log("2");
      walletDetails.balance += transactionDetails.amount;
      walletDetails.balance -= amount;
    }
    if (
      transactionDetails.type === "income" &&
      type.toLowerCase() === "expense"
    ) {
      console.log("3");
      walletDetails.balance -= transactionDetails.amount;
      walletDetails.balance -= amount;
    }
    if (
      transactionDetails.type === "expense" &&
      type.toLowerCase() === "income"
    ) {
      walletDetails.balance += transactionDetails.amount;
      walletDetails.balance += amount;
    }
    transactionDetails.title = title;
    transactionDetails.date = date;
    transactionDetails.category = category;
    transactionDetails.amount = amount;
    transactionDetails.type = type;
    transactionDetails.note = note;
    const updatedWallet = await Wallet.findByIdAndUpdate(
      walletDetails._id,
      walletDetails
    );
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      transactionDetails
    );
    if (!updatedTransaction || !updatedWallet) {
      return next(new HttpError("Something went wrong", 400));
    }
    res.status(201).send({
      success: true,
      message: "Transaction Updated successfully",
    });
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

// @desc    Auth user & get token
// @route   POST /api/transaction/deleteTransaction
// @access  Private
const deleteTransaction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid input or data missing in request body", 422)
      );
    }
    const { transactionId } = req.params;
    const transactionDetails = await Transaction.findById(transactionId);
    if (!transactionDetails) {
      return next(new HttpError("Wrong transactionId", 400));
    }
    const walletDetails = await Wallet.findById(transactionDetails.wallet);
    if (transactionDetails.type === "income") {
      walletDetails.balance -= transactionDetails.amount;
    } else {
      walletDetails.balance += transactionDetails.amount;
    }
    walletDetails.transactions = walletDetails.transactions.filter(
      (transactionId) => transactionId.toString() !== req.params.transactionId
    );
    const walletUpdated = await Wallet.findByIdAndUpdate(
      walletDetails._id,
      walletDetails
    );
    if (!walletUpdated) {
      return next(new HttpError("Updating linked wallet failed", 400));
    }
    const transactionDeleted = await Transaction.findByIdAndDelete(
      transactionId
    );
    if (!transactionDeleted) {
      return next(new HttpError("Deleting transaction failed", 400));
    }
    res.status(201).send({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

// @desc    Auth user & get token
// @route   POST /api/transaction/getTransactions
// @access  Private
const getTransactionsForUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid input or data missing in request body", 422)
      );
    }
    const { walletId } = req.params;
    let { page, month } = req.query;
    if (!page || !page.trim()) {
      return next(new HttpError("Page missing in query params", 400));
    }
    let limit = 8;
    let toSkip = parseInt(page - 1) * limit;

    const walletDetails = await Wallet.findById(walletId);

    const transactionsCount = await Transaction.find({
      wallet: walletId,
      user: req.user.id,
      month: month.toLowerCase(),
    }).count();

    const transactions = await Transaction.find({
      wallet: walletId,
      user: req.user.id,
      month: month.toLowerCase(),
    })
      .skip(toSkip)
      .limit(limit)
      .select(["title", "category", "amount", "note", "type", "wallet"])
      .populate("wallet");
    if (!transactions) {
      return next(
        new HttpError("An error occured while fetching transactions", 400)
      );
    }
    let lastPage =
      Math.ceil(transactionsCount / parseInt(limit)) === 0
        ? 1
        : Math.ceil(transactionsCount / parseInt(limit));
    res.send({
      success: true,
      data: transactions,
      lastPage: lastPage,
      currency: walletDetails.currency,
      message: "Transaction fetched successfully",
    });
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

// @desc    Auth user & get token
// @route   POST /api/transaction/getChartDetails
// @access  Private
const getTransactionsForChart = async (req, res, next) => {
  try {
    const { month } = req.params;
    if (!month || !month.trim()) {
      return next(new HttpError("month missing in query params", 422));
    }
    const transactions = await Transaction.find({
      user: req.user.id,
      month: month.toLowerCase(),
    }).select(["title", "date", "amount"]);
    if (!transactions) {
      return next(
        new HttpError("An error occured while fetching transactions", 400)
      );
    }
    res.send({
      success: true,
      data: transactions,
      message: "Transaction fetched successfully",
    });
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

// @desc    Auth user & get token
// @route   POST /api/transaction/getTransaction
// @access  Private
const getTransactionById = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    if (!transactionId || !transactionId.trim()) {
      return next(new HttpError("transactionId missing in query params", 422));
    }
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return next(
        new HttpError("An error occured while fetching transactions", 400)
      );
    }
    res.send({
      success: true,
      data: transaction,
      message: "Transaction fetched successfully",
    });
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

export {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactionsForUser,
  getTransactionsForChart,
  getTransactionById,
};
