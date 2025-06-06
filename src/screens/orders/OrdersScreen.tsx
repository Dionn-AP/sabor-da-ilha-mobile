// src/screens/orders/OrdersScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useAuth } from "../../contexts/AuthContext";
import { api, setAuthToken } from "../../services/api";
import { styles } from "./styles";
import { theme } from "../../constants/theme";
import { Order } from "../../types/orders";
import { formatCurrencyBR } from "../../utils/formatter";
import AntDesign from "@expo/vector-icons/AntDesign";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Orders">;

export const OrdersScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/orders");

        const allOrders: Order[] = response.data;

        // Filtra apenas os pedidos do usuário logado (caso seja atendente)
        const filteredOrders =
          user?.role === "atendente"
            ? allOrders.filter((order) => order.attendantId === user.id)
            : allOrders;

        setOrders(filteredOrders);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Pedidos</Text>
      {orders.length === 0 ? (
        <Text style={styles.emptyText}>Não há pedidos feitos.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.orderCard}
              onPress={() =>
                navigation.navigate("OrderDetails", { order: item })
              }
            >
              <Text style={styles.orderText}>Cliente: {item.customerName}</Text>
              <Text style={styles.orderText}>Status: {item.status}</Text>
              <Text style={styles.orderText}>
                Total: {formatCurrencyBR(item.total)}
              </Text>
              <Text style={styles.orderText}>
                Mesa: {item.tableNumber ?? "—"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("NewOrders")}
      >
        <AntDesign
          style={styles.iconAddNewOrder}
          name="pluscircle"
          size={50}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
      <Text style={styles.orderTextNameUser}>{user?.name}</Text>
    </View>
  );
};
