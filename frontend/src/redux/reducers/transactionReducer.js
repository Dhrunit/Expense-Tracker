import {
  SET_TRANSACTION_LOADER,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  SET_TRANSACTION_INDIVIDUAL_FAIL,
  SET_TRANSACTION_INDIVIDUAL_SUCCESS,
} from "../constants/transactionConstants";

const transactionReducer = (
  state = {
    transactions: [],
    selectedTransaction: {},
    loading: false,
    currency: "",
    paginationCount: 0,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSACTIONS_SUCCESS:
      return {
        selectedTransaction: state.selectedTransaction,
        transactions: payload.data,
        currency: payload.currency.split(" ")[1],
        paginationCount: payload.lastPage,
        loading: false,
      };
    case GET_TRANSACTIONS_FAIL:
      return {
        selectedTransaction: state.selectedTransaction,
        currency: "",
        paginationCount: 0,
        transactions: [],
        loading: false,
      };
    case SET_TRANSACTION_LOADER:
      return {
        ...state,
        loading: true,
      };
    case SET_TRANSACTION_INDIVIDUAL_FAIL:
      return {
        ...state,
        selectedTransaction: {},
      };
    case SET_TRANSACTION_INDIVIDUAL_SUCCESS:
      return {
        ...state,
        selectedTransaction: payload,
      };
    default:
      return state;
  }
};
export default transactionReducer;
