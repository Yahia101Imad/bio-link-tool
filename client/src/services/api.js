import axios from "axios";

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

export default API;