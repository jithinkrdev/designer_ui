import axios from "axios";

const api = axios.create({
  baseURL: "https://design-ai-804698015211.asia-south1.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
