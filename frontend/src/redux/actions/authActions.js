import RestApi from "../../api/restApi";
import url from "../../api/url";
import getUserDetails from "../../utils/getUserDetails";
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
      localStorage.setItem(
        "ExpTrackerDetails",
        JSON.stringify(result.data.data)
      );
    }, 500);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data.data,
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
      localStorage.setItem("ExpTrackerToken", JSON.stringify(result.data.data));
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

export const isRegistered = () => async (dispatch) => {
  try {
    let userDetails = getUserDetails();
    if (!userDetails) {
      localStorage.clear();
      return;
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: userDetails,
    });
  } catch (error) {
    localStorage.clear();
    window.location.reload();
  }
};

export const changePasswordRequest =
  (password, setLoading) => async (dispatch) => {
    try {
      setLoading(true);
      let result = await new RestApi().post(
        url.changePassword,
        {
          password,
        },
        true
      );
      if (result.status === 401) {
        localStorage.clear();
        return;
      }
      setLoading(false);
      dispatch(
        setAlert(result.data.message, result.data.success ? "success" : "error")
      );
    } catch (error) {
      localStorage.clear();
      window.location.reload();
    }
  };
