// FormStyles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: theme.colors.primary,
    fontFamily: theme.fonts.bold,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    marginBottom: 20,
  },
  inputIcon: {
    padding: theme.spacing.md,
  },
  input: {
    width: "100%",
    height: 50,
    padding: theme.spacing.md,
    marginBottom: 20,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.cardBackground,
    color: theme.colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: theme.fonts.bold,
  },
});
