// src/screens/orderDetails/OrderDetailsScreen.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { styles } from "./styles";
import { Order } from "../../types/orders";
import { formatCurrencyBR, formatDateBR } from "../../utils/formatter";

type OrderDetailsRouteProp = RouteProp<RootStackParamList, "OrderDetails">;

export const OrderDetailsScreen = () => {
  const { params } = useRoute<OrderDetailsRouteProp>();
  const order: Order = params.order;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes do Pedido</Text>

      <Text style={styles.detail}>Cliente: {order.customerName}</Text>
      <Text style={styles.detail}>Mesa: {order.tableNumber}</Text>
      <Text style={styles.detail}>Status: {order.status}</Text>
      <Text style={styles.detail}>Total: {formatCurrencyBR(order.total)}</Text>
      <Text style={styles.detail}>
        Observações: {order.observations || "Nenhuma"}
      </Text>

      <Text style={styles.sectionTitle}>Itens do Pedido:</Text>
      {order.items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>
            {item.quantity}x {item.product.name!}
          </Text>
          <Text style={styles.itemPrice}>
            {formatCurrencyBR(item.itemTotal)}
          </Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Datas:</Text>
      <Text style={styles.detail}>Criado: {formatDateBR(order.createdAt)}</Text>
      <Text style={styles.detail}>
        Atualizado: {formatDateBR(order.updatedAt)}
      </Text>
      <Text style={styles.detail}>
        Iniciado: {formatDateBR(order.startedAt!) || "–"}
      </Text>
      <Text style={styles.detail}>
        Pronto: {formatDateBR(order.readyAt!) || "–"}
      </Text>
      <Text style={styles.detail}>
        Entregue: {formatDateBR(order.deliveredAt!) || "–"}
      </Text>
      <Text style={styles.detail}>
        Fechado: {formatDateBR(order.closedAt!) || "–"}
      </Text>
    </ScrollView>
  );
};
