import RestApi from "../../api/restApi";
import url from "../../api/url";
import { LOGIN_SUCCESS } from "../constants/authConstants";
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

export const addWallet =
  (body, closeDialogAndEmptyData, page) => async (dispatch) => {
    dispatch({
      type: SET_WALLET_DIALOG_LOADER,
    });
    let result = await new RestApi().post(url.addWallet, body, true);
    if (result.status === 201) {
      let authDetails = JSON.parse(localStorage.getItem("ExpTrackerDetails"));
      dispatch(setAlert(result.data.message, "success"));
      dispatch({
        type: REMOVE_WALLET_DIALOG_LOADER,
      });
      if (result.data.walletId) {
        authDetails.activeWallet = result.data.walletId;
        localStorage.setItem("ExpTrackerDetails", JSON.stringify(authDetails));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: authDetails,
        });
      }
      dispatch(getWalletDetails(page));
      closeDialogAndEmptyData();
    } else {
      dispatch(setAlert(result.data.message, "error"));
      dispatch({
        type: REMOVE_WALLET_DIALOG_LOADER,
      });
    }
  };

export const deleteWallet = (id, setLoader, page) => async (dispatch) => {
  setLoader(true);
  let result = await new RestApi().delete(url.deleteWallet, true, id);
  if (result.status === 201) {
    dispatch(setAlert(result.data.message, "success"));
    dispatch(getWalletDetails(page));
    setLoader(false);
  } else {
    dispatch(setAlert(result.data.message, "error"));
    setLoader(false);
  }
};

export const getIndividualWallet =
  (id, setLoader, setEditMode, setDialogOpen) => async (dispatch) => {
    setLoader(true);
    let result = await new RestApi().get(url.getIndividualWallet, true, id);
    if (result.status === 200) {
      dispatch({
        type: SET_WALLETDETAILS_SUCCESS,
        payload: result.data.data,
      });
      setLoader(false);
      setEditMode(true);
      setDialogOpen(true);
    } else {
      dispatch({
        type: SET_WALLETDETAILS_FAIL,
      });
      setEditMode(false);
      setDialogOpen(false);
      dispatch(setAlert(result.data.message, "error"));
      setLoader(false);
    }
  };

export const editWallet =
  (body, closeDialogAndEmptyData, page, dispatchAuthDetails, authDetails) =>
  async (dispatch) => {
    dispatch({
      type: SET_WALLET_DIALOG_LOADER,
    });
    let result = await new RestApi().put(url.editWallet, body, true);
    if (result.status === 201) {
      if (dispatchAuthDetails) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: authDetails,
        });
      }
      dispatch({
        type: REMOVE_WALLET_DIALOG_LOADER,
      });
      dispatch(setAlert(result.data.message, "success"));
      closeDialogAndEmptyData();
      dispatch(getWalletDetails(page));
    } else {
      dispatch({
        type: SET_WALLETDETAILS_FAIL,
      });
      dispatch(setAlert(result.data.message, "error"));
    }
  };
