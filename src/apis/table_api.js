import { API_STATUS, API_TYPES } from "../enums/api_status";
import { setApiStatus, setSpecificLoading } from "../redux/actions/comman";
import store from "../redux/store";
import axiosClient from "./client";

const tableApiClient = axiosClient("ORDER");

export const requestTable = async (tableReq) => {
  try {
    const res = await tableApiClient.post(
      "/tables/table-requests/request/",
      tableReq
    );

    store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));

    return res.data;
  } catch (err) {
    store.dispatch(setApiStatus(API_TYPES.TABLE, API_STATUS.ERROR));
    return err.response?.data;
  }
};

export const getTableSession = async () => {
  try {
    store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));

    store.dispatch(setSpecificLoading(API_TYPES.TABLE, true));

    const res = await tableApiClient.get("/tables/session/");

    store.dispatch(setSpecificLoading(API_TYPES.TABLE, false));

    return res.data;
  } catch (err) {
    store.dispatch(setSpecificLoading(API_TYPES.TABLE, false));
    store.dispatch(setApiStatus(API_TYPES.TABLE, API_STATUS.ERROR));
    return err.response?.data;
  }
};

export const getTableSessionNoticationApi = async () => {
  try {
    store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));

    store.dispatch(setSpecificLoading(API_TYPES.NOTIFICATION, true));

    const res = await tableApiClient.get("/tables/notifications/");

    store.dispatch(setSpecificLoading(API_TYPES.NOTIFICATION, false));

    return res.data;
  } catch (err) {
    store.dispatch(setSpecificLoading(API_TYPES.NOTIFICATION, false));
    store.dispatch(setApiStatus(API_TYPES.NOTIFICATION, API_STATUS.ERROR));
    return err.response?.data;
  }
};
