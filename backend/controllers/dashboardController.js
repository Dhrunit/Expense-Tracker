import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import moment from "moment";
import Transaction from "../models/transactionModel.js";
import Wallet from "../models/walletModel.js";
import returnMonth from "../utils/returnMonth.js";

// @desc    Auth user & get token
// @route   POST /api/transaction/addTransaction
// @access  Private
const getDashboardDetails = async (req, res, next) => {
  const { _id: userId, activeWallet: userWalletId } = req.user;
  let dataToSend = {
    income: 0,
    expense: 0,
    balance: 0,
    chartData: {},
  };
  let walletDetails = await Wallet.findById(userWalletId);
  console.log(walletDetails);
};

export { getDashboardDetails };
