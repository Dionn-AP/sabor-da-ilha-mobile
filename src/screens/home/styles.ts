// src/screens/HomeScreen/styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "#fff",
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    textAlign: "center",
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    marginBottom: theme.spacing.md,
  },
});
