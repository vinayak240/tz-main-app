import { API_STATUS, API_TYPES } from "../enums/api_status";
import { setApiStatus, setSpecificLoading } from "../redux/actions/comman";
import store from "../redux/store";
import axiosClient from "./client";

const ordersApiClient = axiosClient("ORDER");

export const getAllOrdersApi = async () => {
  try {
    store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));

    store.dispatch(setSpecificLoading(API_TYPES.ORDERS, true));

    const res = await ordersApiClient.get("/orders");

    // store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));
    store.dispatch(setSpecificLoading(API_TYPES.ORDERS, false));

    return res.data;
  } catch (err) {
    store.dispatch(setSpecificLoading(API_TYPES.ORDERS, false));
    store.dispatch(setApiStatus(API_TYPES.ORDERS, API_STATUS.ERROR));
    return err.response?.data;
  }
};

export const placeOrderApi = async (order) => {
  try {
    store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));

    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, true));

    const res = await ordersApiClient.post(
      "/orders/order-requests/place",
      order
    );

    // store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));
    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, false));

    return res.data;
  } catch (err) {
    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, false));
    store.dispatch(setApiStatus(API_TYPES.ORDER_DETAILS, API_STATUS.ERROR));
    return err.response?.data;
  }
};

export const updateOrderApi = async (order) => {
  try {
    store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));

    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, true));

    const res = await ordersApiClient.post(
      "/orders/order-requests/update",
      order
    );

    // store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));
    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, false));

    return res.data;
  } catch (err) {
    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, false));
    store.dispatch(setApiStatus(API_TYPES.ORDER_DETAILS, API_STATUS.ERROR));
    return err.response?.data;
  }
};

export const cancelOrderApi = async (order) => {
  try {
    store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));

    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, true));

    const res = await ordersApiClient.post(
      "/orders/order-requests/cancel",
      order
    );

    // store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));
    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, false));

    return res.data;
  } catch (err) {
    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, false));
    store.dispatch(setApiStatus(API_TYPES.ORDER_DETAILS, API_STATUS.ERROR));
    return err.response?.data;
  }
};

export const refreshOrderApi = async (orderId) => {
  try {
    store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));

    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, true));

    const res = await ordersApiClient.get("/orders/" + orderId);

    // store.dispatch(setApiStatus(API_TYPES.NONE, API_STATUS.NONE));
    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, false));

    return res.data;
  } catch (err) {
    store.dispatch(setSpecificLoading(API_TYPES.ORDER_DETAILS, false));
    store.dispatch(setApiStatus(API_TYPES.ORDER_DETAILS, API_STATUS.ERROR));
    return err.response?.data;
  }
};
