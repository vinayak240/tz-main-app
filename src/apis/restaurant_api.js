import { API_STATUS, API_TYPES } from "../enums/api_status";
import { setApiStatus, setSpecificLoading } from "../redux/actions/comman";
import store from "../redux/store";
import axiosClient from "./client";

const restApiClient = axiosClient("ORDER");

export const loadRestaurant = async (restId) => {
  try {
    store.dispatch(setSpecificLoading(API_TYPES.MENU, true));

    const res = await restApiClient.get(`/restaurant/${restId}/`);

    if (!Boolean(res.data?.success)) {
      throw new Error("Error Loading Restarant : " + res.data?.msg);
    }

    // store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));
    store.dispatch(setSpecificLoading(API_TYPES.MENU, false));

    return res.data;
  } catch (err) {
    store.dispatch(setSpecificLoading(API_TYPES.MENU, false));
    store.dispatch(setApiStatus(API_TYPES.MENU, API_STATUS.ERROR));
    throw err;
  }
};
