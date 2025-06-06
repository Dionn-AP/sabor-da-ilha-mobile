// src/screens/orders/styles.ts

import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  listContainer: {
    paddingBottom: theme.spacing.lg,
  },
  orderCard: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  cardTime: {
    fontSize: 12,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  cardItem: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  cardObs: {
    fontStyle: "italic",
    color: theme.colors.warning,
    marginBottom: theme.spacing.sm,
  },
  statusButton: {
    marginTop: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.primary,
  },
  statusButtonText: {
    color: "#fff",
    fontFamily: theme.fonts.bold,
    fontSize: 14,
  },
  statusButtonTextReady: {
    color: "#727070",
    fontWeight: "bold",
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: theme.colors.divider,
  },
  logoutButton: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.error,
    borderRadius: theme.radii.sm,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontFamily: theme.fonts.bold,
  },
});
