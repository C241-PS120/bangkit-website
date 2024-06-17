import { BACKEND_BASE_URL } from "../contants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export default axiosInstance;