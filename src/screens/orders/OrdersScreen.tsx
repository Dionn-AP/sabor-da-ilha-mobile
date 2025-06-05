// src/screens/orders/OrdersScreen.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const orders = [
  { id: 123, table: 5, status: "preparando" },
  { id: 124, table: 3, status: "pendente" },
  { id: 125, table: 7, status: "pronto" },
];

export const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos os Pedidos</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text>Pedido #{item.id}</Text>
            <Text>Mesa: {item.table}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
});
