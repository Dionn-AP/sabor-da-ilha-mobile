// src/screens/orders/styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  orderCard: {
    position: "relative",
    backgroundColor: theme.colors.cardBackground,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  orderText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  orderTextStatus: {
    fontSize: 12,
    fontWeight: "bold",
    color: theme.colors.text,
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: "center",
    marginTop: 32,
  },
  orderTextNameUser: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    color: theme.colors.secondary,
  },
  iconAddNewOrder: {
    position: "absolute",
    right: 20,
    bottom: 80,
  },
});
