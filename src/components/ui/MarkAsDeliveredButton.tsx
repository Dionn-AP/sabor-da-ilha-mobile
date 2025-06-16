import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { api } from "../../services/api";
import { theme } from "../../constants/theme";
import { Order } from "../../types/orders";

type Props = {
  order: Order;
};

export const MarkAsDeliveredButton = ({ order }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = React.useState(false);

  const handleMarkAsDelivered = async () => {
    try {
      setLoading(true);
      await api.patch(`/orders/${order.id}/status`, {
        status: "entregue",
      });

      Alert.alert("Sucesso", "Pedido marcado como entregue.");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    } finally {
      setLoading(false);
    }
  };

  if (order.status !== "pronto") return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleMarkAsDelivered}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Marcar como Entregue</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    textAlign: "center",
  },
});
