import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import dashboardReducer from "./dashboardReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  dashboard: dashboardReducer,
});
