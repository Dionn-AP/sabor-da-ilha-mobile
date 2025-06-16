import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { styles } from "./styles";
import { theme } from "../../constants/theme";
import { Order } from "../../types/orders";
import { formatCurrencyBR } from "../../utils/formatter";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getStatusColor } from "../../utils/statusColors";
import { ButtonOrderHistory } from "../../components/ui/ButtonOrderHistory";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Orders">;

export const OrdersScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/orders");
      const allOrders: Order[] = response.data;

      const filteredOrders =
        user?.role === "atendente"
          ? allOrders.filter((order) => order.attendantId === parseInt(user.id))
          : allOrders;

      const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (a.status === "pronto" && b.status !== "pronto") return -1;
        if (a.status !== "pronto" && b.status === "pronto") return 1;
        return 0;
      });

      setOrders(sortedOrders);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchOrders();
              }}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.orderCard,
                item.status === "pronto" && {
                  backgroundColor: theme.colors.cardReadyOrder,
                },
              ]}
              onPress={() =>
                navigation.navigate("OrderDetails", { orderId: item.id })
              }
            >
              <Text style={styles.orderText}>Cliente: {item.customerName}</Text>
              <Text
                style={[
                  styles.orderTextStatus,
                  { color: getStatusColor(item.status) },
                ]}
              >
                {item.status.toUpperCase()}
              </Text>
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

      <ButtonOrderHistory />

      <TouchableOpacity
        style={styles.iconAddNewOrder}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("NewOrders")}
      >
        <AntDesign name="pluscircle" size={50} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};
