import {
  SET_TRANSACTION_LOADER,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
} from "../constants/transactionConstants";

const transactionReducer = (
  state = {
    transactions: [],
    selectedTransaction: {},
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSACTIONS_SUCCESS:
      return {
        selectedTransaction: state.selectedTransaction,
        transactions: payload,
        loading: false,
      };
    case GET_TRANSACTIONS_FAIL:
      return {
        selectedTransaction: state.selectedTransaction,
        transactions: [],
        loading: false,
      };
    case SET_TRANSACTION_LOADER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default transactionReducer;
