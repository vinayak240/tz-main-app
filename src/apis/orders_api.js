import axiosClient from "./client";

const ordersApiClient = axiosClient("ORDER");

export const placeOrderApi = async (order) => {
  try {
    const res = await ordersApiClient.post(
      "/orders/order-requests/place",
      order
    );

    return res.data;
  } catch (err) {
    return err.response?.data;
  }
};

export const updateOrderApi = async (order) => {
  try {
    const res = await ordersApiClient.post(
      "/orders/order-requests/update",
      order
    );

    return res.data;
  } catch (err) {
    return err.response?.data;
  }
};

export const cancelOrderApi = async (order) => {
  try {
    const res = await ordersApiClient.post(
      "/orders/order-requests/cancel",
      order
    );

    return res.data;
  } catch (err) {
    return err.response?.data;
  }
};

export const refreshOrderApi = async (orderId) => {
  try {
    const res = await ordersApiClient.get("/orders/" + orderId);

    return res.data;
  } catch (err) {
    return err.response?.data;
  }
};
