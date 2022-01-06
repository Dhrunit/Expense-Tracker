import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_LOADER,
  REMOVE_LOADER,
} from "../constants/authConstants";

const authReducer = (
  state = { userDetails: {}, loading: false, isAuthenticated: false },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADER:
      return { ...state, loading: true };
    case REMOVE_LOADER:
      return { ...state, loading: false };
    case LOGIN_SUCCESS:
      return {
        userDetails: payload,
        loading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        userDetails: {},
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReducer;
