import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "History">;

export const ButtonOrderHistory = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      style={styles.iconOrderHistory}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("History")}
    >
      <AntDesign name="filetext1" size={30} color={theme.colors.background} />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  iconOrderHistory: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
    padding: 11,
    position: "absolute",
    right: 20,
    bottom: 150,
  },
});
