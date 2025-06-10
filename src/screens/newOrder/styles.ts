import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  inputSmall: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.radii.sm,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  sectionTitle: {
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.sm,
  },
  itemContainer: {
    marginBottom: theme.spacing.md,
  },
  picker: {
    backgroundColor: theme.colors.cardBackground,
  },
  itemButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  removeAndAddItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeText: {
    color: theme.colors.error,
    fontFamily: theme.fonts.bold,
  },
  addText: {
    color: theme.colors.accent,
    fontFamily: theme.fonts.bold,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.sm,
  },
  confirmButtonText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: theme.fonts.bold,
  },
  cancelButton: {
    backgroundColor: theme.colors.divider,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
  },
  cancelButtonText: {
    textAlign: "center",
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  link: {
    marginTop: theme.spacing.lg,
  },
  linkText: {
    color: theme.colors.secondary,
    fontFamily: theme.fonts.bold,
    textAlign: "center",
  },
});
