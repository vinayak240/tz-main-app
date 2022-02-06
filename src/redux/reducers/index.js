import { combineReducers } from "redux";
import common from "./common";
import cart from "./cart";
import alert from "./alert";
import restaurant from "./restaurant";

export default combineReducers({
  common,
  cart,
  restaurant,
  alert,
});
