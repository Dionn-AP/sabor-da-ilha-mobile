import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { theme } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../services/api";

type AuthNav = NativeStackNavigationProp<RootStackParamList>;

export const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<
    "atendente" | "cozinha" | "gerente" | "master" | ""
  >("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<AuthNav>();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword || !role) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      Alert.alert("Sucesso", "Cadastro realizado! Aguarde aprovação.");
      navigation.goBack();
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor={theme.colors.text + "80"}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={theme.colors.text + "80"}
          keyboardType="email-address"
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor={theme.colors.text + "80"}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Text style={[styles.label, { marginTop: 10 }]}>Tipo de usuário:</Text>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
      >
        {["atendente", "cozinha", "gerente", "master"].map((r) => {
          const isActive = role === r;
          return (
            <TouchableOpacity
              key={r}
              style={[
                styles.roleOption,
                {
                  backgroundColor: isActive
                    ? theme.colors.primary
                    : theme.colors.cardBackground,
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
              onPress={() => setRole(r as any)}
            >
              <Text
                style={[
                  styles.roleText,
                  { color: isActive ? "#fff" : theme.colors.text },
                ]}
              >
                {r}
              </Text>
              {isActive && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#fff"
                  style={{ marginLeft: 6 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>
          {loading ? (
            <ActivityIndicator color={theme.colors.divider} size="large" />
          ) : (
            "Cadastrar"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
