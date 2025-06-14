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
    marginBottom: theme.spacing.xl,
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

  // NOVOS ESTILOS
  subtitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  listContainer: {
    paddingBottom: theme.spacing.xl,
  },
  userCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  userName: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  userRole: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
  },
  activateButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.sm,
  },
  activateButtonText: {
    color: "#fff",
    fontFamily: theme.fonts.bold,
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
});
