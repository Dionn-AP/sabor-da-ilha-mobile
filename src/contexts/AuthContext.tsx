import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, setAuthToken } from "../services/api";

// Tipos
type Role = "atendente" | "cozinha" | "gerente" | "master";

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

type AuthContextData = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  setLoading: (value: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      const { token: receivedToken, user: receivedUser } = response.data;

      setToken(receivedToken);
      setUser(receivedUser);
      setAuthToken(receivedToken);

      // (Opcional) salvar localmente
      await AsyncStorage.setItem("token", receivedToken);
      await AsyncStorage.setItem("user", JSON.stringify(receivedUser));
    } catch (error) {
      console.error("Erro ao logar:", error);
      Alert.alert("Erro", "Email ou senha inválidos.");
      throw error;
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    setAuthToken("");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
