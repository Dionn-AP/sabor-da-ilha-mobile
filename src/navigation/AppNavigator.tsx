// src/navigation/AppNavigator.tsx
import React from "react";

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
import { OrderHistoryScreen } from "../screens/history/OrderHistoryScreen";
import { ProductFormScreen } from "../screens/productForm/ProductFormScreen";
import { ProductListScreen } from "../screens/product/ProductListScreen";

import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { useAuth } from "../contexts/AuthContext";
import ButtonLogout from "../components/ui/ButtonLogout";
import { TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { userRole } from "../types/user";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
type NavigationProps = NativeStackNavigationProp<RootStackParamList, "History">;

export const AppNavigator = () => {
  const navigation = useNavigation<NavigationProps>();
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
              title: "Olá, bem vindo(a)!",
              headerRight: () => <ButtonLogout />,
            }}
          />
          {canAccess([
            userRole.ATTENDANT,
            userRole.MASTER,
            userRole.MANAGER,
          ]) ? (
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

          {canAccess([userRole.KITCHEN, userRole.MASTER, userRole.MANAGER]) ? (
            <Stack.Screen
              name="Kitchen"
              component={KitchenScreen}
              options={{
                title: "Cozinha",
                headerLeft: () => null,
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("History")}
                  >
                    <AntDesign
                      name="filetext1"
                      size={26}
                      color={theme.colors.background}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          ) : (
            <Stack.Screen name="Kitchen" component={UnauthorizedScreen} />
          )}

          {canAccess([
            userRole.ATTENDANT,
            userRole.MASTER,
            userRole.MANAGER,
          ]) ? (
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

          {canAccess([
            userRole.ATTENDANT,
            userRole.MASTER,
            userRole.MANAGER,
          ]) ? (
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

          {canAccess([userRole.MASTER, userRole.MANAGER]) ? (
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

          {canAccess([userRole.MASTER, userRole.MANAGER, userRole.STOCK]) ? (
            <Stack.Screen
              name="Products"
              component={ProductListScreen}
              options={{
                title: "Produtos",
              }}
            />
          ) : (
            <Stack.Screen name="Products" component={UnauthorizedScreen} />
          )}

          {canAccess([userRole.MASTER, userRole.MANAGER, userRole.STOCK]) ? (
            <Stack.Screen
              name="ProductsForm"
              component={ProductFormScreen}
              options={{
                title: "Cadastrar Produto",
                headerRight: () => <ButtonLogout />,
              }}
            />
          ) : (
            <Stack.Screen name="ProductsForm" component={UnauthorizedScreen} />
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
            name="History"
            component={OrderHistoryScreen}
            options={{
              title: "Histórico de Pedidos",
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
