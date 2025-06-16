// ProductModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { api } from "../../../services/api";
import { Product } from "../../../types/product";
import { useAuth } from "../../../contexts/AuthContext";
import { theme } from "../../../constants/theme";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  product: Product | null;
};

export default function ProductModal({
  visible,
  onClose,
  onSave,
  product,
}: Props) {
  const [form, setForm] = useState<
    (Omit<Product, "price"> & { price: string }) | null
  >(null);

  const { loading, setLoading } = useAuth();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        price: product.price.toString(),
      });
      setIsActive(product.isActive);
    }
  }, [product]);

  const handleSave = async () => {
    if (!form) return;

    try {
      setLoading(true);
      const payload = {
        ...form,
        price: parseFloat(form.price),
      };

      await api.put(`/products/${form.id}`, payload);
      setLoading(false);
      await onSave();

      onClose();
    } catch (error) {
      setLoading(false);
      console.error("Erro ao salvar produto:", error);
    }
  };

  const toggleStatus = async () => {
    if (!product) return;
    try {
      await api.patch(`/products/${product.id}/status`);
      setIsActive((prev) => !prev);
      await onSave();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  if (!form) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Editar Produto</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Preço"
          keyboardType="numeric"
          value={form.price}
          onChangeText={(text) => setForm({ ...form, price: text })}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Ativo</Text>
          <Switch value={isActive} onValueChange={toggleStatus} />
        </View>

        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <ActivityIndicator
            color={theme.colors.primary}
            size={80}
            style={{ marginTop: 100 }}
          />
        )}
      </View>
    </Modal>
  );
}
