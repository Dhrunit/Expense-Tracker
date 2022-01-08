import {
  GET_DASHBOARD_DETAILS_FAIL,
  GET_DASHBOARD_DETAILS_SUCCESS,
  NEW_USER_DASHBOARD,
  SET_LOADER_DASHBOARD,
} from "../constants/dashboardConstants";

const dashboardReducer = (
  state = {
    dashboardDetails: {},
    loading: false,
    isNewUser: false,
    incomeSeries: [],
    expenseSeries: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DASHBOARD_DETAILS_SUCCESS:
      let incomeSeries = [];
      let expenseSeries = [];
      for (const months in payload.chartData) {
        incomeSeries.push(payload.chartData[months].income);
        expenseSeries.push(payload.chartData[months].expense);
      }
      return {
        dashboardDetails: payload,
        loading: false,
        isNewUser: false,
        incomeSeries: incomeSeries,
        expenseSeries: expenseSeries,
      };
    case NEW_USER_DASHBOARD:
      return {
        dashboardDetails: {},
        loading: false,
        isNewUser: true,
        incomeSeries: [],
        expenseSeries: [],
      };
    case GET_DASHBOARD_DETAILS_FAIL:
      return {
        dashboardDetails: {},
        loading: false,
        incomeSeries: [],
        expenseSeries: [],
      };
    case SET_LOADER_DASHBOARD:
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default dashboardReducer;
