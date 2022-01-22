import RestApi from "../../api/restApi";
import url from "../../api/url";
import {
  SET_USER_WALLETDETAILS_SUCCESS,
  SET_USER_WALLETDETAILS_FAIL,
  SET_WALLETDETAILS_SUCCESS,
  SET_WALLETDETAILS_FAIL,
  SET_WALLET_DIALOG_LOADER,
  SET_WALLET_LOADER,
  SET_COUNT_SUCCESS,
  REMOVE_WALLET_DIALOG_LOADER,
} from "../constants/walletConstants";
import { setAlert } from "./alertActions";

export const getWalletDetails = (page) => async (dispatch) => {
  dispatch({
    type: SET_WALLET_LOADER,
  });
  let result = await new RestApi().get(
    url.getWalletDetails,
    true,
    `?page=${page}&searchString=`
  );
  if (result.status === 201) {
    dispatch({
      type: SET_USER_WALLETDETAILS_SUCCESS,
      payload: result.data.data,
    });
    dispatch({
      type: SET_COUNT_SUCCESS,
      payload: result.data.lastPage,
    });
  } else {
    dispatch({
      type: SET_USER_WALLETDETAILS_FAIL,
    });
    dispatch(setAlert(result.data.message, "error"));
  }
};

export const addWallet = (body) => async (dispatch) => {
  dispatch({
    type: SET_WALLET_DIALOG_LOADER,
  });
  let result = await new RestApi().post(url.addWallet, body, true);
  if (result.status === 201) {
    dispatch(setAlert(result.data.message, "success"));
    dispatch({
      type: REMOVE_WALLET_DIALOG_LOADER,
    });
  } else {
    dispatch(setAlert(result.data.message, "error"));
    dispatch({
      type: REMOVE_WALLET_DIALOG_LOADER,
    });
  }
};
