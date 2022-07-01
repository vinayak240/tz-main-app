import { clone } from "ramda";
import CART_STATUS from "../../enums/cart_status";
import {
  CLEAR_CART,
  INIT_CART,
  SET_CART_STATUS,
  UPDATE_CART,
} from "../actions/types";

const initialState = {
  items: [],
  offers: [],
  totalCost: 0,
  status: CART_STATUS.NEW,
  placed_order_id: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CART:
      return {
        ...state,
        ...payload,
      };

    case SET_CART_STATUS:
      return {
        ...state,
        status: payload.status,
        placed_order_id: payload.order_id,
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
        offers: [],
        totalCost: 0,
        status: CART_STATUS.NEW,
        placed_order_id: "",
      };
    case INIT_CART:
      return {
        ...state,
        items: clone(payload.items),
        offers: clone(payload.offers),
        totalCost: clone(payload.totalCost),
        status: CART_STATUS.NEW,
        placed_order_id: "",
      };
    default:
      return state;
  }
}
