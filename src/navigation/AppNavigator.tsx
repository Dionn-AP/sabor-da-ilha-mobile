// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Telas
import { LoginScreen } from "../screens/auth/LoginScreen";
import { KitchenScreen } from "../screens/kitchen/KitchenScreen";
import { OrderDetailsScreen } from "../screens/orderDetails/OrderDetailsScreen";
import { OrdersScreen } from "../screens/orders/OrdersScreen";

// Tipagem das rotas
export type RootStackParamList = {
  Login: undefined;
  Kitchen: undefined;
  OrderDetails: { orderId: number };
  Orders: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  // Em uma aplicação real, você teria um estado de autenticação aqui
  const isAuthenticated = false; // Substitua pela sua lógica de autenticação

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF6B00", // Cor primária do seu tema
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {isAuthenticated ? (
        // Rotas autenticadas
        <>
          <Stack.Screen
            name="Kitchen"
            component={KitchenScreen}
            options={{ title: "Cozinha" }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetailsScreen}
            options={{ title: "Detalhes do Pedido" }}
          />
          <Stack.Screen
            name="Orders"
            component={OrdersScreen}
            options={{ title: "Todos os Pedidos" }}
          />
        </>
      ) : (
        // Rotas não autenticadas
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
