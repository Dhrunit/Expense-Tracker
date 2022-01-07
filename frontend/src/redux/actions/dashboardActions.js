import RestApi from "../../api/restApi";
import url from "../../api/url";
import {
  GET_DASHBOARD_DETAILS_SUCCESS,
  GET_DASHBOARD_DETAILS_FAIL,
  SET_LOADER_DASHBOARD,
  NEW_USER_DASHBOARD,
} from "../constants/dashboardConstants";
import { setAlert } from "./alertActions";
import returnMonth from "../../utils/getCurrentMonth";

export const getDashboardDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADER_DASHBOARD,
    });
    let month = returnMonth(new Date().getMonth());
    let result = await new RestApi().get(url.getDashboardDetails, true, month);
    if (result.status === 401) {
      dispatch(setAlert("You are not authorized, Please login again", "error"));
    }
    if (result.status === 200) {
      dispatch({
        type: GET_DASHBOARD_DETAILS_SUCCESS,
        payload: result.data.data,
      });
    }
    if (
      result.status === 400 &&
      result.data.message === "Failed to fetch the active wallet details"
    ) {
      dispatch({
        type: NEW_USER_DASHBOARD,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_DETAILS_FAIL,
    });
    dispatch(setAlert("Internal Server Error", "error"));
  }
};
