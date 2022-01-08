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
        januray: { income: 0, expense: 0 },
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
    };
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
        if (transaction.type === "income") {
          dataToSend.chartData[transaction.month].income += transaction.amount;
        } else {
          dataToSend.chartData[transaction.month].expense += transaction.amount;
        }
      }
      if (
        transaction.type === "income" &&
        previousMonth === month.toLowerCase()
      ) {
        totalIncomeInPreviusMonth += transaction.amount;
      } else if (
        transaction.type === "expense" &&
        previousMonth === month.toLowerCase()
      ) {
        totalExpenseInPreviusMonth += transaction.amount;
      }
      if (dataToSend.income === totalIncomeInPreviusMonth) {
        dataToSend.percentageIncome = 0;
      } else {
        dataToSend.percentageIncome =
          ((dataToSend.income - totalIncomeInPreviusMonth) /
            totalIncomeInPreviusMonth) *
          100;
      }
      if (dataToSend.expense === totalExpenseInPreviusMonth) {
        dataToSend.percentageExpense = 0;
      } else {
        dataToSend.percentageExpense =
          ((dataToSend.income - totalExpenseInPreviusMonth) /
            totalExpenseInPreviusMonth) *
          100;
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
