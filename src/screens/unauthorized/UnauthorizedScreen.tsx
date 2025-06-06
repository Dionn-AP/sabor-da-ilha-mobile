import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import ButtonLogout from "../../components/ui/ButtonLogout";
import { useAuth } from "../../contexts/AuthContext";

export const UnauthorizedScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso Negado</Text>
      <Text style={styles.message}>
        Você não tem permissão para acessar esta tela.
      </Text>

      <TouchableOpacity onPress={logout} style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      <ButtonLogout />
    </View>
  );
};
