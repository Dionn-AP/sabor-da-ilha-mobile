import { fetchProducts, Product } from "../../services/products";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext"; // ajustar conforme seu contexto
import { hasOrderPermission } from "../../utils/accessVerify";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { api } from "../../services/api";
import { styles } from "./styles";

interface OrderItem {
  productId: number;
  quantity: number;
  observations?: string;
}

export const NewOrderScreen = () => {
  const navigation = useNavigation();
  const { user, loading, setLoading } = useAuth(); // Assumindo que você tem isso configurado
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [observations, setObservations] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { productId: products[0]?.id ?? 0, quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover este item do pedido?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            const newItems = [...items];
            newItems.splice(index, 1);
            setItems(newItems);
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancelar pedido",
      "Tem certeza que deseja cancelar o cadastro deste pedido?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            navigation.goBack(); // ou navegue para a tela de pedidos
          },
        },
      ]
    );
  };

  const handleSubmit = async () => {
    if (!tableNumber || !customerName || items.length === 0) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos e adicione ao menos um item."
      );
      return;
    }

    setLoading(true);
    try {
      await api.post("/orders/order", {
        tableNumber: Number(tableNumber),
        customerName,
        observations,
        items,
      });

      Alert.alert("Sucesso", "Pedido cadastrado com sucesso.");
      navigation.navigate("Orders"); // Ajuste para o nome correto da tela
    } catch (error: any) {
      Alert.alert(
        "Erro ao cadastrar",
        error?.response?.data?.message || "Erro desconhecido"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateItem = <K extends keyof OrderItem>(
    index: number,
    key: K,
    value: OrderItem[K]
  ) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
      }}
    >
      <Text
        style={{
          fontFamily: theme.fonts.bold,
          fontSize: 20,
          color: theme.colors.primary,
          marginBottom: theme.spacing.md,
        }}
      >
        Novo Pedido
      </Text>

      <TextInput
        placeholder="Número da Mesa"
        keyboardType="numeric"
        value={tableNumber}
        onChangeText={setTableNumber}
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          fontFamily: theme.fonts.regular,
          color: theme.colors.text,
        }}
      />

      <TextInput
        placeholder="Nome do Cliente"
        value={customerName}
        onChangeText={setCustomerName}
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          fontFamily: theme.fonts.regular,
          color: theme.colors.text,
        }}
      />

      <TextInput
        placeholder="Observações gerais do pedido"
        value={observations}
        onChangeText={setObservations}
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.lg,
          fontFamily: theme.fonts.regular,
          color: theme.colors.text,
        }}
      />

      <Text
        style={{ fontFamily: theme.fonts.bold, marginBottom: theme.spacing.sm }}
      >
        Itens
      </Text>

      {items.map((item, index) => (
        <View key={index} style={{ marginBottom: theme.spacing.md }}>
          <Picker
            selectedValue={item.productId}
            onValueChange={(value: any) =>
              updateItem(index, "productId", value)
            }
            style={{ backgroundColor: theme.colors.cardBackground }}
          >
            {products.map((product) => (
              <Picker.Item
                key={product.id}
                label={product.name}
                value={product.id}
              />
            ))}
          </Picker>

          <TextInput
            placeholder="Quantidade"
            keyboardType="numeric"
            value={item.quantity.toString()}
            onChangeText={(value) =>
              updateItem(index, "quantity", parseInt(value))
            }
            style={{
              backgroundColor: theme.colors.cardBackground,
              borderRadius: theme.radii.sm,
              padding: theme.spacing.sm,
              marginTop: theme.spacing.sm,
              fontFamily: theme.fonts.regular,
              color: theme.colors.text,
            }}
          />

          <TextInput
            placeholder="Observações do item"
            value={item.observations || ""}
            onChangeText={(text) => updateItem(index, "observations", text)}
            style={{
              backgroundColor: theme.colors.cardBackground,
              borderRadius: theme.radii.sm,
              padding: theme.spacing.sm,
              marginTop: theme.spacing.sm,
              fontFamily: theme.fonts.regular,
              color: theme.colors.text,
            }}
          />

          <TouchableOpacity
            onPress={() => handleRemoveItem(index)}
            style={{ marginTop: theme.spacing.lg }}
          >
            <View style={styles.removeAndAddItems}>
              <AntDesign
                name="minuscircle"
                size={24}
                color={theme.colors.error}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color: theme.colors.error,
                  fontFamily: theme.fonts.bold,
                }}
              >
                Remover Item
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={handleAddItem}
        style={{ marginBottom: theme.spacing.lg }}
      >
        <View style={styles.removeAndAddItems}>
          <MaterialIcons
            name="add-circle"
            size={29}
            color={theme.colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{ color: theme.colors.accent, fontFamily: theme.fonts.bold }}
          >
            Adicionar Item
          </Text>
        </View>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator color={theme.colors.primary} size="large" />
      ) : (
        <>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: theme.colors.primary,
              padding: theme.spacing.md,
              borderRadius: theme.radii.md,
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: theme.fonts.bold,
              }}
            >
              Confirmar Pedido
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancel}
            style={{
              backgroundColor: theme.colors.divider,
              padding: theme.spacing.md,
              borderRadius: theme.radii.md,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: theme.fonts.bold,
                color: theme.colors.text,
              }}
            >
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Orders")}
            style={{ marginTop: theme.spacing.lg }}
          >
            <Text
              style={{
                color: theme.colors.secondary,
                fontFamily: theme.fonts.bold,
                textAlign: "center",
              }}
            >
              Ir para pedidos
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};
