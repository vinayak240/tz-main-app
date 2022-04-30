import { TABLE_STATUS } from "../../enums/table_status";
import {
  PLACE_ORDER,
  CHECKOUT,
  INIT_ORDERS,
  UPDATE_TABLE,
  INIT_TABLE,
  SET_TABLE_STATUS,
  CLEAR_SESSION,
} from "../actions/types";

const initialState = {
  table_id: "",
  status: TABLE_STATUS.TABLE_REQUEST,
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

    case SET_TABLE_STATUS:
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
    case CLEAR_SESSION:
      return {
        ...state,
        table_id: "",
        status: TABLE_STATUS.TABLE_REQUEST,
        session: null, //Contains all the order, table session
        orders: [],
        offers: [], // these offers will added when the final bill is paid...
        totalCost: 0,
        // user: null,
      };
    default:
      return state;
  }
}
