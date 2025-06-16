// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { ROUTES } from "../../navigation/routes";
import { useAuth } from "../../contexts/AuthContext";
import { userRole } from "../../types/user";

export const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const isMasterOrGerente = ["master", "gerente"].includes(user!.role);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a), {user?.name}</Text>

      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE)}>
        <Text style={styles.button}>Minha Conta</Text>
      </TouchableOpacity>

      {(user?.role === userRole.ATTENDANT || isMasterOrGerente) && (
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ORDERS)}>
          <Text style={styles.button}>Pedidos</Text>
        </TouchableOpacity>
      )}

      {(user?.role === userRole.KITCHEN || isMasterOrGerente) && (
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.KITCHEN)}>
          <Text style={styles.button}>Cozinha</Text>
        </TouchableOpacity>
      )}

      {(user?.role === userRole.STOCK || isMasterOrGerente) && (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.PRODUCTS)}
          >
            <Text style={styles.button}>Produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.PRODUCTS_FORM)}
          >
            <Text style={styles.button}>Cadastro de Produtos</Text>
          </TouchableOpacity>
        </>
      )}

      {isMasterOrGerente && (
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DASHBOARD)}>
          <Text style={styles.button}>Dashboard</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
