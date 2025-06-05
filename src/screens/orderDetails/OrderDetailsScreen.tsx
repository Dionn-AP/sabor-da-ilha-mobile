// src/screens/orders/OrderDetailsScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

type OrderDetailsRouteProp = RouteProp<RootStackParamList, "OrderDetails">;

export const OrderDetailsScreen = ({
  route,
}: {
  route: OrderDetailsRouteProp;
}) => {
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Pedido #{orderId}</Text>
      <Text style={styles.text}>• 2x X-Burger</Text>
      <Text style={styles.text}>• 1x Refri Lata</Text>
      <Text style={styles.text}>Status: Preparando</Text>
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
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});
