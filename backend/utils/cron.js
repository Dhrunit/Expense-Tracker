import moment from "moment";
import Wallet from "../models/walletModel.js";

export const resetBalance = async () => {
  //   Fetch wallets with refreshBalnce true
  let Wallets = await Wallet.find({ resetBalance: true, balance: { $ne: 0 } });
  let updateCount = 0;
  if (!Wallets) {
    console.log("Error while fetching wallets");
    return;
  }
  if (Wallets.length === 0) {
    console.log("No feeds found to reset balance");
    return;
  }
  for (const walletsToResetBalance of Wallets) {
    let currentDate = moment();
    let resetDate = moment(walletsToResetBalance.resetTime);
    let nextResetDate;
    if (walletsToResetBalance.resetPeriod.toLowerCase() === "monthly") {
      nextResetDate = moment().add(1, "months").format();
    } else if (walletsToResetBalance.resetPeriod.toLowerCase() === "weekly") {
      nextResetDate = moment().add(1, "weeks").format();
    } else {
      nextResetDate = moment().add(1, "years").format();
    }
    if (
      resetDate.diff(currentDate, "days") === 0 ||
      resetDate.diff(currentDate, "days") < 0
    ) {
      let updateWallet = await Wallet.findByIdAndUpdate(
        walletsToResetBalance._id,
        { balance: 0, resetTime: nextResetDate },
        { new: true }
      );
      if (!updateWallet) {
        console.log(
          `Updating wallet failed for wallet with id ${walletsToResetBalance._id}`
        );
        return;
      } else {
        updateCount++;
      }
    }
  }
  console.log(`${updateCount} Wallets Updated`);
};
