export const BASE_URL = {
  REST:
    process.env.REACT_APP_START_MODE === "mobile"
      ? "http://192.168.1.35:5000/api/v1/"
      : "http://localhost:5000/api/v1/",
  ORDER:
    process.env.REACT_APP_START_MODE === "mobile"
      ? "http://192.168.1.35:5001/api/v1/"
      : "http://localhost:5001/api/v1/",
};

export const HOST = {
  ORDER:
    process.env.REACT_APP_START_MODE === "mobile"
      ? "http://192.168.1.35:5001"
      : "http://localhost:5001",
};

console.log(process.env.REACT_APP_START_MODE);
