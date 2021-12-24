import { v4 } from "uuid";
import store from "../store";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  (msg, type, timeout = 4000) =>
  (dispatch) => {
    const id = v4();
    const n_alerts = store.getState().alert?.length + 1 || 1;
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(
      () => dispatch({ type: REMOVE_ALERT, payload: id }),
      n_alerts * timeout
    );
  };
