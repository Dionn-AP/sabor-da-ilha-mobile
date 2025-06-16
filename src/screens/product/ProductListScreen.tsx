import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { api } from "../../services/api";
import ProductModal from "../../components/ui/ProductModal/ProductModal";
import { Product } from "../../types/product";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackParamList } from "../../navigation/types";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "History">;

export const ProductListScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { loading, setLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filterActive, setFilterActive] = useState<null | boolean>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const query = filterActive !== null ? `?isActive=${filterActive}` : "";
      const response = await api.get(`/products/products${query}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterActive]);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.containerLoadingIcon}>
          <ActivityIndicator color={theme.colors.primary} size={40} />
        </View>
      )}
      <Text style={styles.title}>
        Total de produtos (ativos):{" "}
        {products.filter((product) => product.isActive).length}
      </Text>

      <Text style={styles.title}>
        Total de produtos (inativos):{" "}
        {products.filter((product) => !product.isActive).length}
      </Text>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Mostrar apenas ativos</Text>
        <Switch
          value={filterActive === true}
          onValueChange={() =>
            setFilterActive((prev) =>
              prev === true ? false : prev === false ? null : true
            )
          }
        />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)} style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.status}>
              {item.isActive ? "Ativo" : "Inativo"}
            </Text>
          </TouchableOpacity>
        )}
      />

      <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        onSave={fetchProducts}
      />
      <TouchableOpacity
        style={styles.iconAddNewProduct}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("ProductsForm")}
      >
        <AntDesign name="pluscircle" size={50} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};
