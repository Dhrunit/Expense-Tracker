import HttpError from "../models/http-error.js";
import Wallet from "../models/walletModel.js";

// @desc    Auth user & get token
// @route   GET /api/getDashboardDetails/:month
// @access  Private
const getDashboardDetails = async (req, res, next) => {
  try {
    const { activeWallet: userWalletId } = req.user;
    const { month, previousMonth } = req.params;
    let totalIncomeInPreviusMonth = 0;
    let totalExpenseInPreviusMonth = 0;
    let dataToSend = {
      income: 0,
      expense: 0,
      currency: "",
      percentageIncome: 0,
      percentageExpense: 0,
      balance: { remaining: 0, underBudget: null },
      chartData: {
        january: { income: 0, expense: 0 },
        february: { income: 0, expense: 0 },
        march: { income: 0, expense: 0 },
        april: { income: 0, expense: 0 },
        may: { income: 0, expense: 0 },
        june: { income: 0, expense: 0 },
        july: { income: 0, expense: 0 },
        august: { income: 0, expense: 0 },
        september: { income: 0, expense: 0 },
        october: { income: 0, expense: 0 },
        november: { income: 0, expense: 0 },
        december: { income: 0, expense: 0 },
      },
      categoryChartData: {
        bills: 0,
        car: 0,
        clothes: 0,
        communications: 0,
        eatingOut: 0,
        entertainment: 0,
        food: 0,
        gifts: 0,
        health: 0,
        house: 0,
        pets: 0,
        sports: 0,
        taxi: 0,
        toiletry: 0,
        transport: 0,
        other: 0,
      },
    };
    let date = new Date().getFullYear().toString();
    let walletDetails = await Wallet.findById(userWalletId).populate(
      "transactions"
    );
    if (!walletDetails) {
      return next(
        new HttpError("Failed to fetch the active wallet details", 400)
      );
    }
    dataToSend.currency = walletDetails.currency;
    dataToSend.balance.remaining = walletDetails.balance;
    if (walletDetails.hasBudget) {
      dataToSend.balance.underBudget =
        walletDetails.balance > walletDetails.budgetAmount;
    } else {
      dataToSend.balance.underBudget = null;
    }
    for (const transaction of walletDetails.transactions) {
      if (
        transaction.type === "income" &&
        transaction.month === month.toLowerCase()
      ) {
        dataToSend.income += transaction.amount;
      } else if (
        transaction.type === "expense" &&
        transaction.month === month.toLowerCase()
      ) {
        dataToSend.expense += transaction.amount;
      }
      if (dataToSend.chartData[transaction.month]) {
        if (
          transaction.type === "income" &&
          transaction.date.split("/")[2] === date
        ) {
          dataToSend.chartData[transaction.month].income += transaction.amount;
        } else if (
          transaction.type === "expense" &&
          transaction.date.split("/")[2] === date
        ) {
          dataToSend.chartData[transaction.month].expense += transaction.amount;
        }
      }
      if (
        transaction.type === "income" &&
        previousMonth === month.toLowerCase() &&
        transaction.date.split("/")[2] === date
      ) {
        totalIncomeInPreviusMonth += transaction.amount;
      } else if (
        transaction.type === "expense" &&
        previousMonth === month.toLowerCase() &&
        transaction.date.split("/")[2] === date
      ) {
        totalExpenseInPreviusMonth += transaction.amount;
      }
      if (dataToSend.income === totalIncomeInPreviusMonth) {
        dataToSend.percentageIncome = 0;
      } else if (totalIncomeInPreviusMonth === 0) {
        dataToSend.percentageIncome = null;
      } else {
        dataToSend.percentageIncome =
          ((dataToSend.income - totalIncomeInPreviusMonth) /
            totalIncomeInPreviusMonth) *
          100;
      }
      if (dataToSend.expense === totalExpenseInPreviusMonth) {
        dataToSend.percentageExpense = 0;
      } else if (totalExpenseInPreviusMonth === 0) {
        dataToSend.percentageExpense = null;
      } else {
        dataToSend.percentageExpense =
          ((dataToSend.income - totalExpenseInPreviusMonth) /
            totalExpenseInPreviusMonth) *
          100;
      }
      if (
        transaction.type === "expense" &&
        transaction.date.split("/")[2] === date
      ) {
        dataToSend.categoryChartData[transaction.category] +=
          transaction.amount;
      }
    }
    res.status(200).send({
      success: true,
      data: dataToSend,
      message: "Dashboard details fetched successfully",
    });
  } catch (error) {
    return next(new HttpError("Internal Server error", 500));
  }
};

export { getDashboardDetails };
