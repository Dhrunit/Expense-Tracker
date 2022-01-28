import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import dashboardReducer from "./dashboardReducer";
import walletReducer from "./walletReducer";
import transactionReducer from "./transactionReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  dashboard: dashboardReducer,
  wallet: walletReducer,
  transaction: transactionReducer,
});
