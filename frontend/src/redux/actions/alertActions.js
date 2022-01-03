import { REMOVE_ALERT, SET_ALERT } from "../constants/alertConstants";

export const setAlert = (msg, alertType) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
};
