import { API_STATUS, API_TYPES } from "../../enums/api_status";
import {
  SET_API_STATUS,
  SET_LOADING,
  SET_SPECIFIC_LOADING,
  SET_USER,
  UNSET_LOADING,
  UNSET_USER,
} from "../actions/types";

const initialState = {
  loading: false,
  user: null,
  api_status: { status: API_STATUS.NONE, type: API_TYPES.NONE },
  loaders: {
    MENU: false,
    ORDERS: false,
    ORDER_DETAILS: false,
    CHECKOUT: false,
    TABLE: false,
    NOTIFICATION: false,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case UNSET_USER:
      return {
        ...state,
        user: null,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_SPECIFIC_LOADING:
      let loaders = { ...state.loaders, [payload.type]: payload.flag };
      return {
        ...state,
        loaders,
      };

    case UNSET_LOADING:
      return {
        ...state,
        loading: false,
      };

    case SET_API_STATUS:
      return {
        ...state,
        api_status: { ...payload },
      };

    default:
      return state;
  }
}
