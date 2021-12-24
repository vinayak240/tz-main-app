import { SET_LOADING, UNSET_LOADING } from "../actions/types";

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
