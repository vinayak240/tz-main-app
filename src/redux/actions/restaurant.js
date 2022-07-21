import { clone } from "ramda";
import ALERT_TYPES from "../../enums/alert_types";
import { setAlert } from "./alert";
import { INIT_CART, LOADED_REST } from "./types";
import restaurantData from "../../data/rest.json";
import { loadRestaurant as laodRestApi } from "../../apis/restaurant_api";
import { setLoading, setUser, unSetLoading } from "./comman";

export const loadRestaurant = (restId) => async (dispatch) => {
  try {
    // [API CALL] This is to be updated..
    const payload = await laodRestApi(restId);

    dispatch({
      type: LOADED_REST,
      payload: payload?.restaurant,
    });
  } catch (err) {
    setAlert("Error loading restaurant..", ALERT_TYPES.ERROR);
  }
};
