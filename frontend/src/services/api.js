import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// LOGIN - Backend expects: { email, password }
export const loginReq = (email, password) => {
  return api.post("/auth/login", {
    email,
    password,
  });
};

// GET all products
// Backend returns:
// { success: true, data: { products: [...] } }
export const getProductsReq = () => {
  return api.get("/products");
};

// GET single product
// Backend returns:
// { success: true, data: { product: {...} } }
export const getProductReq = (id) => {
  return api.get(`/products/${id}`);
};

export default api;
