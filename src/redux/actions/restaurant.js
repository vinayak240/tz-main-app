import { clone } from "ramda";
import ALERT_TYPES from "../../constants/alert_types";
import { setAlert } from "./alert";
import { INIT_CART, LOADED_REST } from "./types";
import restaurantData from "../../data/rest.json";

export const loadRestaurant = () => async (dispatch) => {
  try {
    // This is to be updated..
    const restaurant = restaurantData;
    const iniCart = {
      items: [],
      offers: restaurant.offers,
      totalCost: 0,
    };
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
