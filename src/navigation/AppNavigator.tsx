// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import { LoginScreen } from "../screens/auth/LoginScreen";
import { KitchenScreen } from "../screens/kitchen/KitchenScreen";
import { OrderDetailsScreen } from "../screens/orderDetails/OrderDetailsScreen";
import { OrdersScreen } from "../screens/orders/OrdersScreen";
import { useAuth } from "../contexts/AuthContext";
import ButtonLogout from "../components/ui/ButtonLogout";
import { Order } from "../types/orders";
import { NewOrderScreen } from "../screens/newOrder/NewOrderScreen";

// Tipagem das rotas
export type RootStackParamList = {
  Login: undefined;
  Kitchen: undefined;
  OrderDetails: { order: Order };
  Orders: undefined;
  NewOrders: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

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
            name="Orders"
            component={OrdersScreen}
            options={{
              title: "Todos os Pedidos",
              headerRight: () => <ButtonLogout />,
            }}
          />
          <Stack.Screen
            name="Kitchen"
            component={KitchenScreen}
            options={{ title: "Cozinha", headerRight: () => <ButtonLogout /> }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetailsScreen}
            options={{
              title: "Detalhes do Pedido",
              headerRight: () => <ButtonLogout />,
            }}
          />
          <Stack.Screen
            name="NewOrders"
            component={NewOrderScreen}
            options={{
              title: "Novo Pedido",
              headerRight: () => <ButtonLogout />,
            }}
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
