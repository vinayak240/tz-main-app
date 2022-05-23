import axiosClient from "./client";

const tableApiClient = axiosClient("ORDER");

export const requestTable = async (tableReq) => {
  try {
    const res = await tableApiClient.post(
      "/tables/table-requests/request/",
      tableReq
    );

    if (!Boolean(res.data?.success)) {
      throw new Error("Error Requesting Table : " + res.data?.msg);
    }

    return res.data;
  } catch (err) {
    throw err;
  }
};
