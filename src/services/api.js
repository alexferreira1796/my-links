import axios from "axios";

export const key = "4077f21f82d5bcc1df4d761893cbe5b105313908";

const api = axios.create({
  baseURL: "https://api-ssl.bitly.com/v4",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  },
});

export default api;
