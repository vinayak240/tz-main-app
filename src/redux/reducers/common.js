import {
  SET_LOADING,
  SET_USER,
  UNSET_LOADING,
  UNSET_USER,
} from "../actions/types";

const initialState = {
  loading: false,
  user: null,
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

    case UNSET_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
