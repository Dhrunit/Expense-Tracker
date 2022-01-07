import {
  GET_DASHBOARD_DETAILS_FAIL,
  GET_DASHBOARD_DETAILS_SUCCESS,
  NEW_USER_DASHBOARD,
  SET_LOADER_DASHBOARD,
} from "../constants/dashboardConstants";

const dashboardReducer = (
  state = { dashboardDetails: {}, loading: false, isNewUser: false },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DASHBOARD_DETAILS_SUCCESS:
      return { dashboardDetails: payload, loading: false, isNewUser: false };
    case NEW_USER_DASHBOARD:
      return { dashboardDetails: {}, loading: false, isNewUser: true };
    case GET_DASHBOARD_DETAILS_FAIL:
      return { dashboardDetails: {}, loading: false };
    case SET_LOADER_DASHBOARD:
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default dashboardReducer;
