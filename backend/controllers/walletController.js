import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import moment from "moment";
import Wallet from "../models/walletModel.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/wallet/addWallet
// @access  Private
const addWallet = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input or data missing in request body", 422)
    );
  }
  const {
    user,
    name,
    currency,
    balance,
    hasBudget,
    budgetAmount,
    resetBalance,
    resetPeriod,
    isActiveWallet,
  } = req.body;

  //   Calculate reset time
  let resetTime;
  if (resetPeriod.toLowerCase() === "monthly") {
    resetTime = moment().add(1, "months").format();
  } else if (resetPeriod.toLowerCase() === "weekly") {
    resetTime = moment().add(1, "weeks").format();
  } else {
    resetTime = moment().add(1, "years").format();
  }
  // create a wallet
  const wallet = await Wallet.create({
    user,
    name,
    currency,
    balance,
    hasBudget,
    budgetAmount,
    resetBalance,
    resetPeriod,
    isActiveWallet,
    activeDate: moment().format(),
    resetTime,
  });
  if (!wallet) {
    return next(new HttpError("Wallet creation failed", 400));
  }

  // update the user Model with wallet id
  if (isActiveWallet) {
    let userLinked = await User.findByIdAndUpdate(user, {
      activeWallet: wallet._id,
    });
    if (!userLinked) {
      return next(new HttpError("Linking the wallet with user failed", 400));
    }
  }
  res.status(201).send({
    success: true,
    data: { wallet },
    message: "Wallet added successfully",
  });
};

export { addWallet };
