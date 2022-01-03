import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
});
