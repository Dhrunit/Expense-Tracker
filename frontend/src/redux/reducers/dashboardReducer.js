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
    categorySeries: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DASHBOARD_DETAILS_SUCCESS:
      let incomeSeries = [];
      let expenseSeries = [];
      let categorySeries = [];
      for (const months in payload.chartData) {
        incomeSeries.push(payload.chartData[months].income);
        expenseSeries.push(payload.chartData[months].expense);
      }
      for (const categoryData in payload.categoryChartData) {
        categorySeries.push(payload.categoryChartData[categoryData]);
      }
      return {
        dashboardDetails: payload,
        loading: false,
        isNewUser: false,
        incomeSeries: incomeSeries,
        expenseSeries: expenseSeries,
        categorySeries: categorySeries,
      };
    case NEW_USER_DASHBOARD:
      return {
        dashboardDetails: {},
        loading: false,
        isNewUser: true,
        incomeSeries: [],
        expenseSeries: [],
        categorySeries: [],
      };
    case GET_DASHBOARD_DETAILS_FAIL:
      return {
        dashboardDetails: {},
        loading: false,
        incomeSeries: [],
        expenseSeries: [],
        categorySeries: [],
      };
    case SET_LOADER_DASHBOARD:
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default dashboardReducer;
