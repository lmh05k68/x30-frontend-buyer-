import axios from "axios";
import Cookies from 'js-cookie'
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    "Content-Type": "application/json",
  }
});
const token = Cookies.get("token")
axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
export default axiosInstance;