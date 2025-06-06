import { Alert } from "react-native";
import { api } from "./api";

export interface Product {
  id: number;
  name: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/products/products");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    Alert.alert("Erro", "Não foi possível carregar os produtos.");
    return [];
  }
};
