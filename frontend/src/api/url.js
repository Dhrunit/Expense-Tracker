let baseUrl = "http://localhost:80/";

let url = {
  login: baseUrl + "api/users/login",
  changePassword: baseUrl + "api/users/changePassword",
  register: baseUrl + "api/users/register",
  getDashboardDetails: baseUrl + "api/dashboard/getDashboardDetails/",
  getWalletDetails: baseUrl + "api/wallet/getWallets",
  addWallet: baseUrl + "api/wallet/addWallet",
  deleteWallet: baseUrl + "api/wallet/deleteWallet/",
  editWallet: baseUrl + "api/wallet/editWallet",
  getIndividualWallet: baseUrl + "api/wallet/getWallet/",
  getTransactions: baseUrl + "api/transaction/getTransactions/",
  getTransaction: baseUrl + "api/transaction/getTransaction/",
  deleteTransaction: baseUrl + "api/transaction/deleteTransaction/",
  addTransaction: baseUrl + "api/transaction/addTransaction",
  editTransaction: baseUrl + "api/transaction/editTransaction",
};

export default url;
