import { WindowSharp } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const axiosInterceptor = axios.create({
  baseURL: `http://localhost:5000`,
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // very important
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptor.interceptors.response.use(
  (res) => {
    return res;  //important
  },
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 400:
        toast.error(error?.response?.data?.message)
        break;
      case 401:
        toast.error(error?.response?.data?.message);
        localStorage.removeItem("token") // removing token when the token expired
        break;
      case 403:
        toast.error(error?.response?.data?.message)
        break;
      case 404:
        toast.error(error?.response?.data?.message)
        break;
      case 408:
        toast.error(error?.response?.data?.message)
        break;
      case 429:
        toast.warning("Too Many Requests: Please slow down.");
        break;
      case 500:
        toast.error(error?.response?.data?.message)
        break;
      default:
        toast.error(error?.response?.data?.message)
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
