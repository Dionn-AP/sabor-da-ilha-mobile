// src/screens/styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  input: {
    backgroundColor: theme.colors.cardBackground,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radii.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    alignItems: "center",
    marginTop: theme.spacing.md,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.md,
    overflow: "hidden",
  },

  picker: {
    height: 48,
    backgroundColor: "#fff",
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.sm,
  },
});
