// src/screens/profile/styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  profileImage: {
    marginBottom: theme.spacing.md,
  },
  changePhotoText: {
    textAlign: "center",
    color: theme.colors.primary,
    fontFamily: theme.fonts.regular,
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: theme.radii.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontFamily: theme.fonts.regular,
    backgroundColor: theme.colors.cardBackground,
  },
  disabled: {
    backgroundColor: theme.colors.divider,
    color: "#888",
  },
});
