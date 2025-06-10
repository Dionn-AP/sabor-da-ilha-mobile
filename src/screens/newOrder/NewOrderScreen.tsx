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
import { useAuth } from "../../contexts/AuthContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { api } from "../../services/api";
import { styles } from "./styles";
import { theme } from "../../constants/theme";

interface OrderItem {
  productId: number;
  quantity: string;
  observations?: string;
}

export const NewOrderScreen = () => {
  const navigation = useNavigation();
  const { user, loading, setLoading } = useAuth();
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
    setItems([...items, { productId: products[0]?.id ?? 0, quantity: "1" }]);
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
            navigation.goBack();
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

    const formattedItems = items.map((item) => ({
      ...item,
      quantity: parseInt(item.quantity),
    }));

    setLoading(true);
    try {
      await api.post("/orders/order", {
        tableNumber: Number(tableNumber),
        customerName,
        observations,
        items: formattedItems,
      });

      Alert.alert("Sucesso", "Pedido cadastrado com sucesso.");
      navigation.navigate("Orders");
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput
        placeholder="Número da Mesa"
        keyboardType="numeric"
        value={tableNumber}
        onChangeText={setTableNumber}
        style={styles.input}
      />

      <TextInput
        placeholder="Nome do Cliente"
        value={customerName}
        onChangeText={setCustomerName}
        style={styles.input}
      />

      <TextInput
        placeholder="Observações gerais do pedido"
        value={observations}
        onChangeText={setObservations}
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Itens</Text>

      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Picker
            selectedValue={item.productId}
            onValueChange={(value: any) =>
              updateItem(index, "productId", value)
            }
            style={styles.picker}
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
            value={item.quantity}
            onChangeText={(value) => updateItem(index, "quantity", value)}
            style={styles.inputSmall}
          />

          <TextInput
            placeholder="Observações do item"
            value={item.observations || ""}
            onChangeText={(text) => updateItem(index, "observations", text)}
            style={styles.inputSmall}
          />

          <TouchableOpacity
            onPress={() => handleRemoveItem(index)}
            style={styles.itemButton}
          >
            <View style={styles.removeAndAddItems}>
              <AntDesign
                name="minuscircle"
                size={24}
                color={theme.colors.error}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.removeText}>Remover Item</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={handleAddItem} style={styles.itemButton}>
        <View style={styles.removeAndAddItems}>
          <MaterialIcons
            name="add-circle"
            size={29}
            color={theme.colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addText}>Adicionar Item</Text>
        </View>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator color="#2196F3" size="large" />
      ) : (
        <>
          <TouchableOpacity onPress={handleSubmit} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Orders")}
            style={styles.link}
          >
            <Text style={styles.linkText}>Ir para pedidos</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};
