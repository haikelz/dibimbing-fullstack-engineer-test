import Axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const axios = Axios.create(config);
