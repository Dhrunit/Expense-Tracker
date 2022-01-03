import RestApi from "../../api/restApi";
import url from "../../api/url";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADER,
} from "../constants/authConstants";
import { setAlert } from "./alertActions";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADER,
    });
    let result = await new RestApi().post(url.login, {
      email,
      password,
    });
    if (!result) {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch(setAlert("Invalid credentials", "error"));
      return;
    }
    setTimeout(() => {
      localStorage.setItem("ExpTrackerToken", result.data.data.token);
    }, 500);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
    dispatch(setAlert(result.data.message, "success"));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert("Internal Server Error", "error"));
  }
};

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADER,
    });
    let result = await new RestApi().post(url.register, {
      email,
      password,
    });
    if (!result) {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch(setAlert("Something went wrong", "error"));
      return;
    }
    setTimeout(() => {
      localStorage.setItem("ExpTrackerToken", result.data.data.token);
    }, 500);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
    dispatch(setAlert(result.data.message, "success"));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert("Internal Server Error", "error"));
  }
};
