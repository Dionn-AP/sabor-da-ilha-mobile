// src/screens/profile/MinhaContaScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export const MyAccountScreen = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [imageUri, setImageUri] = useState(user?.profileImageUrl || "");

  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     quality: 1,
  //   });

  //   if (!result.canceled && result.assets[0].uri) {
  //     setImageUri(result.assets[0].uri);
  //     // Aqui você pode integrar o envio para o backend ou Firebase Storage
  //   }
  // };

  return (
    <View style={styles.container}>
      <EvilIcons
        style={styles.changePhotoText}
        name="user"
        size={100}
        color="black"
      />
      {/* <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("../../../assets/default-avatar.png")
          }
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Alterar foto</Text>
      </TouchableOpacity> */}

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, styles.disabled]}
        value={user?.email}
        editable={false}
      />
    </View>
  );
};
