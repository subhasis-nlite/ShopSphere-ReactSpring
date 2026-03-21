import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/products";
// If your backend uses versioned API, change to:
// const API_BASE_URL = "http://localhost:8080/api/v1/products";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllProducts = async () => {
  const response = await api.get("");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await api.post("", product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(`/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
