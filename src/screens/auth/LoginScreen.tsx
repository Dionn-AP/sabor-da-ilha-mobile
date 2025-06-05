import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { theme } from "../../constants/theme";
import LogoBurger from "../../assets/images/burger.svg";
import { styles } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type AuthNav = NativeStackNavigationProp<RootStackParamList>;

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useAuth();
  const navigation = useNavigation<AuthNav>();

  const handleLogin = async () => {
    try {
      await login(email, password);

      if (!user) return;

      switch (user.role) {
        case "atendente":
          navigation.navigate("Orders");
          break;
        case "cozinha":
          navigation.navigate("Kitchen");
          break;
        case "gerente":
        case "master":
          navigation.navigate("Orders"); // ou outra tela padrão
          break;
        default:
          Alert.alert("Erro", "Tipo de usuário não reconhecido.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sabor da Ilha</Text>

      <LogoBurger style={styles.logo} width={100} height={100} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.text + "80"}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={theme.colors.text + "80"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};
