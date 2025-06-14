import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  heading: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.md,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: 6,
  },
  radioSelected: {
    backgroundColor: theme.colors.primary,
  },
  radioLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.text,
  },
  filterButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.md,
    alignItems: "center",
  },
  filterButtonText: {
    color: "#fff",
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: "bold",
    fontFamily: theme.fonts.regular,
    marginBottom: theme.spacing.xs,
  },
  text: {
    fontSize: 14,
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.xs,
  },
  date: {
    marginTop: theme.spacing.xs,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textLight || "#999",
  },
  emptyText: {
    textAlign: "center",
    marginTop: theme.spacing.lg,
    color: theme.colors.textLight || "#999",
    fontFamily: theme.fonts.regular,
  },
});
