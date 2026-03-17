import axios from "axios";
import AppError from '../../../server/utils/AppError'

// CRESTING BASE URL WITH AXIOS
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// CONNECTING API WITH PAGES
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getUserProfile = (username) => API.get(`/profile/${username}`);

// SAVE TOKEN IN LOCALSTORAGE AFTER POSTING REQUEST
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// MANAGING RESPONSE ERRORS
API.interceptors.response.use(
  res => res,
  err => {
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    const status = err.response?.status || 500;
    return Promise.reject(new AppError(message, status));
  }
);

export default API;