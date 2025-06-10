// src/screens/dashboard/styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
});

export const chartConfig = {
  backgroundGradientFrom: theme.colors.cardBackground,
  backgroundGradientTo: theme.colors.cardBackground,
  decimalPlaces: 0,
  color: () => theme.colors.primary,
  labelColor: () => theme.colors.text,
  style: {
    borderRadius: theme.radii.md,
  },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: theme.colors.secondary,
  },
};
