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
    user: req.user._id,
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
    let userLinked = await User.findByIdAndUpdate(req.user._id, {
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

// @desc    Auth user & get token
// @route   POST /api/wallet/editWallet
// @access  Private
const editWallet = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input or data missing in request body", 422)
    );
  }
  const {
    walletId,
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
  // update the wallet
  const wallet = await Wallet.findByIdAndUpdate(
    walletId,
    {
      user: req.user._id,
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
    },
    {
      new: true,
    }
  );
  if (!wallet) {
    return next(new HttpError("Wallet update failed", 400));
  }

  // update the user Model with wallet id
  if (isActiveWallet) {
    let userLinked = await User.findByIdAndUpdate(req.user._id, {
      activeWallet: wallet._id,
    });
    if (!userLinked) {
      return next(new HttpError("Linking the wallet with user failed", 400));
    }
  }
  res.status(201).send({
    success: true,
    data: { wallet },
    message: "Wallet Updated successfully",
  });
};

// @desc    Auth user & get token
// @route   POST /api/wallet/deleteWallet
// @access  Private
const deleteWallet = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input or data missing in request body", 422)
    );
  }
  const { walletId } = req.body;

  // delete the wallet
  const wallet = await Wallet.findByIdAndDelete(walletId);
  if (!wallet) {
    return next(new HttpError("Wallet delete failed", 400));
  }
  res.status(201).send({
    success: true,
    message: "Wallet deleted successfully",
  });
};

// @desc    Auth user & get token
// @route   POST /api/wallet/getWallets
// @access  Private
const getWalletsForUser = async (req, res, next) => {
  let limit = 10;
  const { _id: userId } = req.user;
  let { page, searchString } = req.query;
  if (!page || !page.trim()) {
    return next(new HttpError("Page missing in query params", 400));
  }
  if (searchString.trim()) {
    let toSkip = parseInt(page - 1) * limit;
    const wallets = await Wallet.find({
      user: userId,
      name: { $regex: searchString, $options: "i" },
    })
      .skip(toSkip)
      .limit(limit)
      .select("name");
    if (!wallets) {
      return next(
        new HttpError("An error occured while fetching wallets", 400)
      );
    }
    res.status(201).send({
      success: true,
      data: wallets,
      message: "Wallet fetched successfully",
    });
  } else {
    let toSkip = parseInt(page - 1) * limit;
    const wallets = await Wallet.find({ user: userId })
      .skip(toSkip)
      .limit(limit)
      .select("name");
    if (!wallets) {
      return next(
        new HttpError("An error occured while fetching wallets", 400)
      );
    }
    res.status(201).send({
      success: true,
      data: wallets,
      message: "Wallet fetched successfully",
    });
  }
};

export { addWallet, editWallet, deleteWallet, getWalletsForUser };
