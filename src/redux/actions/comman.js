import { clone } from "ramda";
import { v4 } from "uuid";
import { SET_LOADING, SET_USER, UNSET_LOADING, UNSET_USER } from "./types";
import { isObjEmpty } from "../../utils/helpers";
import { setAlert } from "./alert";
import ALERT_TYPES from "../../enums/alert_types";

export const setLoading = (delay) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

export const unSetLoading = () => (dispatch) => {
  dispatch({
    type: UNSET_LOADING,
  });
};

export const setUser = (curUser) => (dispatch) => {
  try {
    let user = clone(curUser);
    if (isObjEmpty(user)) {
      user = !isObjEmpty(JSON.parse(localStorage.getItem("user")))
        ? JSON.parse(localStorage.getItem("user"))
        : {
            user_name: v4(),
          };
    } else {
      user = { ...user, user_name: user.user_name || "Guest" };
    }
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: SET_USER,
      payload: user,
    });
  } catch (err) {
    setAlert("Error setting user..", ALERT_TYPES.ERROR);
  }
};

// Should be called when user checked off
export const unSetUser = () => (dispatch) => {
  try {
    localStorage.removeItem("user");

    dispatch({
      type: UNSET_USER,
    });
  } catch (err) {
    setAlert("Error un-setting order..", ALERT_TYPES.ERROR);
  }
};
