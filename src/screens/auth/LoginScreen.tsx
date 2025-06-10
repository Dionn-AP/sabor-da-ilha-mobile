import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../constants/theme";
import LogoBurger from "../../assets/images/burger.svg";
import { styles } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthNav = NativeStackNavigationProp<RootStackParamList>;

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openEye, setOpenEye] = useState(true);

  const { login, loading, setLoading } = useAuth();
  const navigation = useNavigation<AuthNav>();

  const handleLogin = async () => {
    try {
      await login(email, password);

      const storedUser = await AsyncStorage.getItem("user");
      if (!storedUser) {
        throw new Error("Usuário não encontrado após login.");
      }

      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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
          placeholder="E-mail"
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
          secureTextEntry={openEye}
          value={password}
          onChangeText={setPassword}
        />
        <Entypo
          style={styles.inputIcon}
          onPress={() => setOpenEye(!openEye)}
          name={!openEye ? "eye" : "eye-with-line"}
          size={24}
          color={theme.colors.primary}
        />
      </View>

      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {loading ? (
            <ActivityIndicator color={theme.colors.divider} size="large" />
          ) : (
            "Entrar"
          )}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text
          style={{
            marginTop: 16,
            color: theme.colors.primary,
            fontWeight: "bold",
          }}
        >
          Criar uma conta
        </Text>
      </TouchableOpacity>
    </View>
  );
};
