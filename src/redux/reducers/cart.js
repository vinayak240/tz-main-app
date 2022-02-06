import { clone } from "ramda";
import { CLEAR_CART, INIT_CART, UPDATE_CART } from "../actions/types";

const initialState = {
  items: [],
  offers: [],
  totalCost: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CART:
      return {
        ...state,
        ...payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
        offers: [],
        totalCost: 0,
      };
    case INIT_CART:
      return {
        ...state,
        items: clone(payload.items),
        offers: clone(payload.offers),
        totalCost: clone(payload.totalCost),
      };
    default:
      return state;
  }
}
