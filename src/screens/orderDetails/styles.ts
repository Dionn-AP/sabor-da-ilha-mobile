// src/screens/orderDetails/styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.secondary,
    marginTop: 20,
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 6,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.cardBackground,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
