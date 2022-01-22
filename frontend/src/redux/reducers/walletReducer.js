import {
  SET_USER_WALLETDETAILS_SUCCESS,
  SET_USER_WALLETDETAILS_FAIL,
  SET_WALLETDETAILS_SUCCESS,
  SET_WALLETDETAILS_FAIL,
  SET_WALLET_DIALOG_LOADER,
  SET_WALLET_LOADER,
  SET_COUNT_SUCCESS,
} from "../constants/walletConstants";

const dashboardReducer = (
  state = {
    walletDetails: [],
    selectedWalletDetails: {},
    loading: false,
    dialogLoader: false,
    paginationCount: 0,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WALLET_DIALOG_LOADER:
      return {
        ...state,
        dialogLoader: true,
      };
    case SET_WALLET_LOADER:
      return {
        ...state,
        loading: true,
      };
    case SET_COUNT_SUCCESS:
      return {
        ...state,
        paginationCount: payload,
      };
    case SET_USER_WALLETDETAILS_SUCCESS:
      return {
        ...state,
        walletDetails: payload,
        loading: false,
        dialogLoader: false,
      };

    case SET_USER_WALLETDETAILS_FAIL:
      return {
        ...state,
        walletDetails: [],
        loading: false,
        dialogLoader: false,
        paginationCount: 0,
      };
    case SET_WALLETDETAILS_SUCCESS:
      return {
        ...state,
        selectedWalletDetails: payload,
        loading: false,
        dialogLoader: false,
      };
    case SET_WALLETDETAILS_FAIL:
      return {
        ...state,
        selectedWalletDetails: {},
        loading: false,
        dialogLoader: false,
      };
    default:
      return state;
  }
};
export default dashboardReducer;
