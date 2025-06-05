// src/screens/orders/KitchenScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigation/routes";

export const KitchenScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos na Cozinha</Text>

      <Button
        title="Ver Detalhes do Pedido #123"
        onPress={() =>
          navigation.navigate(ROUTES.ORDER_DETAILS, { orderId: 123 })
        }
      />

      <Button
        title="Ver Todos os Pedidos"
        onPress={() => navigation.navigate(ROUTES.ORDERS)}
      />

      <Button
        title="Sair"
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
