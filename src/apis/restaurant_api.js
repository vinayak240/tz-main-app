import axiosClient from "./client";

const restApiClient = axiosClient("ORDER");

export const loadRestaurant = async (restId) => {
  try {
    const res = await restApiClient.get(`/restaurant/${restId}/`);

    if (!Boolean(res.data?.success)) {
      throw new Error("Error Loading Restarant : " + res.data?.msg);
    }

    return res;
  } catch (err) {
    throw err;
  }
};
