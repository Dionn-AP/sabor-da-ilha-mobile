// src/screens/orders/styles.ts
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
  emptyText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: "center",
    marginTop: 32,
  },
  orderTextNameUser: {
    fontSize: 16,
    marginBottom: 28,
    textAlign: "center",
    color: theme.colors.secondary,
  },
  iconAddNewOrder: {
    position: "absolute",
    right: 0,
    bottom: 10,
  },
});
