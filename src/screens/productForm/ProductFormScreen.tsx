// src/screens/ProductFormScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { api } from "../../services/api";
import { theme } from "../../constants/theme";
import { Picker } from "@react-native-picker/picker";
import { ProductCategory } from "../../types/product";

export const ProductFormScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<ProductCategory | "">("");
  const [preparationTime, setPreparationTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [initialStock, setInitialStock] = useState("");

  const categories: ProductCategory[] = [
    "comida",
    "bebida",
    "sobremesa",
    "outro",
  ];

  const validCategories: ProductCategory[] = [
    "comida",
    "bebida",
    "sobremesa",
    "outro",
  ];

  const handleSubmit = async () => {
    if (!name || !price || !category) {
      Alert.alert(
        "Atenção",
        "Preencha os campos obrigatórios: nome, preço e categoria."
      );
      return;
    }

    if (!validCategories.includes(category as ProductCategory)) {
      Alert.alert("Erro", "Selecione uma categoria válida.");
      return;
    }

    try {
      const payload = {
        name,
        description,
        price: parseFloat(price),
        category,
        preparationTime: parseInt(preparationTime),
        imageUrl,
        initialStock: parseInt(initialStock),
      };

      await api.post("/products", payload);
      Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o produto.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Produto</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor={theme.colors.textLight}
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Descrição"
        placeholderTextColor={theme.colors.textLight}
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Preço (ex: 12.50)"
        placeholderTextColor={theme.colors.textLight}
        keyboardType="decimal-pad"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) =>
            setCategory(itemValue as ProductCategory)
          }
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Tempo de Preparo (min)"
        placeholderTextColor={theme.colors.textLight}
        keyboardType="numeric"
        style={styles.input}
        value={preparationTime}
        onChangeText={setPreparationTime}
      />
      <TextInput
        placeholder="URL da Imagem"
        placeholderTextColor={theme.colors.textLight}
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        placeholder="Estoque Inicial"
        placeholderTextColor={theme.colors.textLight}
        keyboardType="numeric"
        style={styles.input}
        value={initialStock}
        onChangeText={setInitialStock}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductFormScreen;
