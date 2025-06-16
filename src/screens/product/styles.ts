import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    marginVertical: 8,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  category: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  status: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
    justifyContent: "space-between",
  },
  filterLabel: {
    color: theme.colors.text,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: theme.spacing.md,
  },
  switchLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.lg,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.md,
    borderRadius: theme.radii.sm,
    flex: 1,
    marginRight: theme.spacing.sm,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: theme.colors.success,
    padding: theme.spacing.md,
    borderRadius: theme.radii.sm,
    flex: 1,
    marginLeft: theme.spacing.sm,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  containerLoadingIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
