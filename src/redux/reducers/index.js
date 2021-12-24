import { combineReducers } from "redux";
import common from "./common";
import cart from "./cart";
import alert from "./alert";

export default combineReducers({
  common,
  cart,
  alert,
});
