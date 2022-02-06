import { ERROR_ON_LOAD, LOADED_REST } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADED_REST:
      return {
        ...state,
        ...payload,
      };

    case ERROR_ON_LOAD:
      // handle auth here
      return state;
    default:
      return state;
  }
}
