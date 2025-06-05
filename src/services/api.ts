import axios from "axios";
import { Alert } from "react-native";

const API_BASE_URL = "https://sabor-da-ilha-server.onrender.com/api";

export const headers = {
  "Content-Type": "application/json",
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorMessage =
      error.response?.data?.message || error.message || "Erro inesperado";
    console.log("Erro da API:", status, errorMessage, error.response?.data);
    return Promise.reject(error);
  }
);

// Adicione isso após login bem-sucedido:
export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common["Authorization"];
};
