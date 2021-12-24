import { CLEAR_CART, UPDATE_CART } from "../actions/types";

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
    default:
      return state;
  }
}
