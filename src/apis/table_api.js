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
    return err.response?.data;
  }
};
