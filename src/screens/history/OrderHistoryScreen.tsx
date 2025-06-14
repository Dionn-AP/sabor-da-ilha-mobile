import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { theme } from "../../constants/theme";
import { formatDateBR, formatCurrencyBR } from "../../utils/formatter";
import { Order } from "../../types/orders";

const STATUS_OPTIONS = [
  "Todos",
  "pendente",
  "preparando",
  "pronto",
  "entregue",
];

export const OrderHistoryScreen = () => {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      let response;
      const isAttendant = user?.role === "atendente";

      if (selectedStatus === "Todos") {
        response = isAttendant
          ? await api.get("/orders/orders", { params: { onlyMine: true } })
          : await api.get("/orders/orders");
      } else {
        response = isAttendant
          ? await api.get(`/orders/history?status=${selectedStatus}`, {
              params: { onlyMine: true },
            })
          : await api.get(`/orders/history?status=${selectedStatus}`);
      }

      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido #{item.id}</Text>
      <Text style={styles.text}>Cliente: {item.customerName}</Text>
      <Text style={styles.text}>Mesa: {item.tableNumber}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Text style={styles.text}>Total: {formatCurrencyBR(item.total)}</Text>
      <Text style={styles.text}>Atendente: {item.attendant?.name}</Text>
      <Text style={styles.text}>Cozinha: {item.kitchenUser?.name}</Text>
      {item.observations ? <Text>Obs: {item.observations}</Text> : null}
      <Text style={styles.date}>Criado em: {formatDateBR(item.createdAt)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.radioGroup}>
        {STATUS_OPTIONS.map((status) => (
          <TouchableOpacity
            key={status}
            style={styles.radioOption}
            onPress={() => setSelectedStatus(status)}
          >
            <View
              style={[
                styles.radioCircle,
                selectedStatus === status && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioLabel}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.filterButton} onPress={loadOrders}>
        <Text style={styles.filterButtonText}>Filtrar</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          color={theme.colors.primary}
          style={{ marginTop: 60 }}
          size={80}
        />
      ) : (
        <FlatList<Order>
          data={orders}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderOrder}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
          }
        />
      )}
    </View>
  );
};
