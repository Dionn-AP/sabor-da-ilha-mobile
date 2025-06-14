import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { api } from "../../services/api";
import { theme } from "../../constants/theme";
import { styles } from "./styles";
import AntDesign from "@expo/vector-icons/AntDesign";

type OrderItem = {
  name: string;
  quantity: number;
  observations?: string;
};

type Order = {
  id: number;
  items: OrderItem[];
  status: "pendente" | "preparando" | "pronto";
  tableNumber: number;
  observations: string;
  createdAt: string;
  attendantName: string;
};

export const KitchenScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Order[]>("/orders/list/kitchen/orders");
      setOrders(data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateOrderStatus = async (
    orderId: number,
    newStatus: "preparando" | "pronto"
  ) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const getButtonLabel = (status: Order["status"]) => {
    switch (status) {
      case "pendente":
        return "Iniciar";
      case "preparando":
        return "Pronto";
      case "pronto":
        return "Finalizado";
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const statusWeight = (status: string) => {
      if (status === "pendente") return 1;
      if (status === "preparando") return 2;
      if (status === "pronto") return 3;
      return 4;
    };

    const statusDiff = statusWeight(a.status) - statusWeight(b.status);
    if (statusDiff !== 0) return statusDiff;

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderItem = ({ item }: { item: Order }) => {
    const isDisabled = item.status === "pronto";
    const nextStatus = item.status === "pendente" ? "preparando" : "pronto";

    return (
      <View style={[styles.orderCard, isDisabled && { opacity: 0.5 }]}>
        <Text style={styles.cardTitle}>Mesa {item.tableNumber}</Text>
        <Text style={styles.cardSubtitle}>Atendente: {item.attendantName}</Text>
        <Text style={styles.cardTime}>
          Criado em: {new Date(item.createdAt).toLocaleString()}
        </Text>

        {item.items.map((product, index) => (
          <Text key={index} style={styles.cardItem}>
            - {product.quantity}x {product.name}
            {product.observations ? ` (${product.observations})` : ""}
          </Text>
        ))}

        {item.observations ? (
          <Text style={styles.cardObs}>Obs: {item.observations}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.statusButton, isDisabled && styles.disabledButton]}
          onPress={() => updateOrderStatus(item.id, nextStatus)}
          disabled={isDisabled}
        >
          <Text
            style={
              item.status === "pronto"
                ? styles.statusButtonTextReady
                : styles.statusButtonText
            }
          >
            {getButtonLabel(item.status)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos na Cozinha</Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={sortedOrders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchOrders();
              }}
            />
          }
        />
      )}
    </View>
  );
};
