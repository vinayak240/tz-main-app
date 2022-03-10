import { clone } from "ramda";
import ALERT_TYPES from "../../enums/alert_types";
import { setAlert } from "./alert";
import { INIT_CART, LOADED_REST } from "./types";
import restaurantData from "../../data/rest.json";
import { setUser } from "./comman";

export const loadRestaurant = () => async (dispatch) => {
  try {
    // [API CALL] This is to be updated..
    const restaurant = restaurantData;
    const iniCart = {
      items: [],
      offers: [],
      totalCost: 0,
    };
    dispatch(setUser(null));
    dispatch({
      type: LOADED_REST,
      payload: restaurant,
    });
    dispatch({
      type: INIT_CART,
      payload: iniCart,
    });
  } catch (err) {
    setAlert("Error loading restaurant..", ALERT_TYPES.ERROR);
  }
};
