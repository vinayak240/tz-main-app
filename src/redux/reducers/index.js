import { combineReducers } from "redux";
import common from "./common";
import cart from "./cart";
import table from "./table";
import alert from "./alert";
import restaurant from "./restaurant";

export default combineReducers({
  common,
  cart,
  table,
  restaurant,
  alert,
});
