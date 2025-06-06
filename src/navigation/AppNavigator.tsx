// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import { LoginScreen } from "../screens/auth/LoginScreen";
import { KitchenScreen } from "../screens/kitchen/KitchenScreen";
import { OrderDetailsScreen } from "../screens/orderDetails/OrderDetailsScreen";
import { OrdersScreen } from "../screens/orders/OrdersScreen";
import { NewOrderScreen } from "../screens/newOrder/NewOrderScreen";
import { UnauthorizedScreen } from "../screens/unauthorized/UnauthorizedScreen";

import { useAuth } from "../contexts/AuthContext";
import ButtonLogout from "../components/ui/ButtonLogout";
import { Order } from "../types/orders";

// Tipagem das rotas
export type RootStackParamList = {
  Login: undefined;
  Kitchen: undefined;
  OrderDetails: { order: Order };
  Orders: undefined;
  NewOrders: undefined;
  Unauthorized: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const canAccess = (roles: string[]) => roles.includes(user?.role || "");

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FF6B00" },
        headerTintColor: "#FFF",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          {canAccess(["atendente", "master", "gerente"]) ? (
            <Stack.Screen
              name="Orders"
              component={OrdersScreen}
              options={{
                title: "Todos os Pedidos",
                headerRight: () => <ButtonLogout />,
              }}
            />
          ) : (
            <Stack.Screen name="Orders" component={UnauthorizedScreen} />
          )}

          {canAccess(["cozinha", "master", "gerente"]) ? (
            <Stack.Screen
              name="Kitchen"
              component={KitchenScreen}
              options={{
                title: "Cozinha",
                headerLeft: () => null,
                headerRight: () => <ButtonLogout />,
              }}
            />
          ) : (
            <Stack.Screen name="Kitchen" component={UnauthorizedScreen} />
          )}

          {canAccess(["atendente", "master", "gerente"]) ? (
            <Stack.Screen
              name="NewOrders"
              component={NewOrderScreen}
              options={{
                title: "Novo Pedido",
                headerRight: () => <ButtonLogout />,
              }}
            />
          ) : (
            <Stack.Screen name="NewOrders" component={UnauthorizedScreen} />
          )}

          {canAccess(["atendente", "master", "gerente"]) ? (
            <Stack.Screen
              name="OrderDetails"
              component={OrderDetailsScreen}
              options={{
                title: "Detalhes do Pedido",
                headerRight: () => <ButtonLogout />,
              }}
            />
          ) : (
            <Stack.Screen name="OrderDetails" component={UnauthorizedScreen} />
          )}

          <Stack.Screen
            name="Unauthorized"
            component={UnauthorizedScreen}
            options={{
              headerRight: () => <ButtonLogout />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
