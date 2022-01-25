import RestApi from "../../api/restApi";
import url from "../../api/url";
import returnMonth from "../../utils/getCurrentMonth";
import {
  SET_TRANSACTION_LOADER,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  SET_TRANSACTION_INDIVIDUAL_FAIL,
  SET_TRANSACTION_INDIVIDUAL_SUCCESS,
} from "../constants/transactionConstants";
import { setAlert } from "./alertActions";

export const getTransactions = (page, walletId) => async (dispatch) => {
  dispatch({
    type: SET_TRANSACTION_LOADER,
  });
  let month = returnMonth(new Date().getMonth());
  let result = await new RestApi().get(
    url.getTransactions,
    true,
    `${walletId}?page=${page}&month=${month}`
  );
  if (result.status === 200) {
    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: result.data,
    });
  } else {
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
    });
    dispatch(setAlert(result.data.message, "error"));
  }
};

export const getIndividualTransaction =
  (transactionId, setIndividualLoader) => async (dispatch) => {
    setIndividualLoader(true);
    let result = await new RestApi().get(
      url.getTransaction,
      true,
      `${transactionId}`
    );
    if (result.status === 200) {
      setIndividualLoader(false);
      dispatch({
        type: SET_TRANSACTION_INDIVIDUAL_SUCCESS,
        payload: result.data.data,
      });
    } else {
      setIndividualLoader(false);
      dispatch({
        type: SET_TRANSACTION_INDIVIDUAL_FAIL,
      });
      dispatch(setAlert(result.data.message, "error"));
    }
  };
