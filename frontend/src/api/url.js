let baseUrl = "http://localhost:5000/";

let url = {
  login: baseUrl + "api/users/login",
  changePassword: baseUrl + "api/users/changePassword",
  register: baseUrl + "api/users/register",
  getDashboardDetails: baseUrl + "api/dashboard/getDashboardDetails/",
  getWalletDetails: baseUrl + "api/wallet/getWallets",
  addWallet: baseUrl + "api/wallet/addWallet",
  deleteWallet: baseUrl + "api/wallet/deleteWallet",
};

export default url;
