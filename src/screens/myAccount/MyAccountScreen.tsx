import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { api } from "../../services/api";
import { theme } from "../../constants/theme";

interface InactiveUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const MyAccountScreen = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [imageUri, setImageUri] = useState(user?.profileImageUrl || "");

  const [inactiveUsers, setInactiveUsers] = useState<InactiveUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const isManagerOrMaster = user?.role === "gerente" || user?.role === "master";

  useEffect(() => {
    if (isManagerOrMaster) {
      fetchInactiveUsers();
    }
  }, []);

  const fetchInactiveUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await api.get("/auth/users/inactive");
      setInactiveUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários inativos:", error);
      Alert.alert("Erro", "Não foi possível carregar usuários inativos.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const activateUser = async (userId: number) => {
    try {
      await api.patch(`/auth/users/${userId}/activate`);
      Alert.alert("Sucesso", "Usuário ativado com sucesso.");
      fetchInactiveUsers(); // atualiza lista
    } catch (error) {
      console.error("Erro ao ativar usuário:", error);
      Alert.alert("Erro", "Não foi possível ativar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <EvilIcons
        style={styles.changePhotoText}
        name="user"
        size={120}
        color="black"
      />

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, styles.disabled]}
        value={user?.email}
        editable={false}
      />

      {isManagerOrMaster && (
        <>
          <Text style={styles.subtitle}>Usuários Inativos</Text>

          {loadingUsers ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : inactiveUsers.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum usuário inativo.</Text>
          ) : (
            <FlatList
              data={inactiveUsers}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <View style={styles.userCard}>
                  <View>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                    <Text style={styles.userRole}>
                      Tipo: {item.role.toUpperCase()}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.activateButton}
                    onPress={() => activateUser(item.id)}
                  >
                    <Text style={styles.activateButtonText}>Ativar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
};
