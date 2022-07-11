import { API_STATUS, API_TYPES } from "../enums/api_status";
import { setApiStatus } from "../redux/actions/comman";
import store from "../redux/store";
import axiosClient from "./client";

const tableApiClient = axiosClient("ORDER");

export const requestTable = async (tableReq) => {
  try {
    const res = await tableApiClient.post(
      "/tables/table-requests/request/",
      tableReq
    );

    return res.data;
  } catch (err) {
    store.dispatch(setApiStatus(API_TYPES.TABLE, API_STATUS.ERROR));
    return err.response?.data;
  }
};

export const getTableSession = async () => {
  try {
    const res = await tableApiClient.get("/tables/session/");

    return res.data;
  } catch (err) {
    store.dispatch(setApiStatus(API_TYPES.TABLE, API_STATUS.ERROR));
    return err.response?.data;
  }
};

export const getTableSessionNoticationApi = async () => {
  try {
    const res = await tableApiClient.get("/tables/notifications/");

    return res.data;
  } catch (err) {
    store.dispatch(setApiStatus(API_TYPES.NOTIFICATION, API_STATUS.ERROR));
    return err.response?.data;
  }
};
