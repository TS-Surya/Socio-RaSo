import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const register = (values) => api.post("/auth/register", values);
export const login = (values) => api.post("/auth/login", values);
export const refreshToken = () => api.get("/auth/refresh");

const apis = {
  register,
  login,
  refreshToken,
};

export default apis;
