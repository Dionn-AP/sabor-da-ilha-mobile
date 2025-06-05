import { TouchableOpacity, Text } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

const ButtonLogout = () => {
  const { logout } = useAuth();
  return (
    <TouchableOpacity onPress={logout}>
      <Text style={{ color: "#FFF", marginRight: 6, fontWeight: "bold" }}>
        Sair
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonLogout;
