// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import { LoginScreen } from "../screens/auth/LoginScreen";
import { SignupScreen } from "../screens/signup/SignupScreen";
import { KitchenScreen } from "../screens/kitchen/KitchenScreen";
import { OrderDetailsScreen } from "../screens/orderDetails/OrderDetailsScreen";
import { OrdersScreen } from "../screens/orders/OrdersScreen";
import { NewOrderScreen } from "../screens/newOrder/NewOrderScreen";
import { UnauthorizedScreen } from "../screens/unauthorized/UnauthorizedScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { DashboardScreen } from "../screens/dashboard/DashboardScreen";
import { MyAccountScreen } from "../screens/myAccount/MyAccountScreen";

import { useAuth } from "../contexts/AuthContext";
import ButtonLogout from "../components/ui/ButtonLogout";
import { Order } from "../types/orders";

// Tipagem das rotas
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Kitchen: undefined;
  OrderDetails: { order: Order };
  Orders: undefined;
  NewOrders: undefined;
  Unauthorized: undefined;
  Profile: undefined;
  Dashboard: undefined;
  Home: undefined;
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
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: true, title: "Cadastro" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: `Bem vindo ${user.name}`,
              headerRight: () => <ButtonLogout />,
            }}
          />
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

          {canAccess(["master", "gerente"]) ? (
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                title: "Dashboard",
                headerRight: () => <ButtonLogout />,
              }}
            />
          ) : (
            <Stack.Screen name="Dashboard" component={UnauthorizedScreen} />
          )}

          <Stack.Screen
            name="Profile"
            component={MyAccountScreen}
            options={{
              title: "Perfil",
              headerRight: () => <ButtonLogout />,
            }}
          />

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
