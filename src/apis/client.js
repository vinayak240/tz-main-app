import axios from "axios";
import { BASE_URL } from "../constants/api";

const axiosClient = (apiType) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const instance = axios.create({
    baseURL: BASE_URL[apiType],
    headers,
    // withCredentials: true,
  });
  // Add response interceptor when routes are done!,To handle ERR Reponses

  return instance;
};

export default axiosClient;
