import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8000/api/auth/",
  headers: { "Content-Type": "application/json" },
});

export const register = (data) => authApi.post("/register", data);
export const login = (data) => authApi.post("/login", data);

const apis = {
  register,
  login,
};

export default apis;
