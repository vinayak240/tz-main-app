import {
  PLACE_ORDER,
  CHECKOUT,
  INIT_ORDERS,
  UPDATE_TABLE,
  INIT_TABLE,
} from "../actions/types";

const initialState = {
  table_id: "",
  session: null, //Contains all the order, table session
  orders: [],
  offers: [], // these offers will added when the final bill is paid...
  totalCost: 0,
  // user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case INIT_TABLE:
      return {
        ...state,
        ...payload,
      };
    case INIT_ORDERS:
      return {
        ...state,
        ...payload,
      };
    case PLACE_ORDER:
      return {
        ...state,
        ...payload,
      };
    case UPDATE_TABLE:
      return {
        ...state,
        ...payload,
      };
    case CHECKOUT:
      return state;
    default:
      return state;
  }
}
