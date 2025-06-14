// src/screens/dashboard/styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  chartTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 8,
  },
  chart: {
    borderRadius: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
  color: (opacity = 1, index?: number) => {
    const statusLabels = ["preparando", "pronto", "entregue"] as const;

    const status =
      typeof index === "number" && index >= 0 && index < statusLabels.length
        ? statusLabels[index]
        : undefined;

    const statusColors: Record<(typeof statusLabels)[number], string> = {
      preparando: theme.colors.warning,
      pronto: theme.colors.success,
      entregue: theme.colors.primary,
    };

    const baseColor = status ? statusColors[status] : theme.colors.primary;

    const opacityHex = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return `${baseColor}${opacityHex}`;
  },
  labelColor: () => theme.colors.text,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: theme.colors.primary,
  },
  propsForLabels: {
    fontSize: 12,
    fontWeight: "500",
  },
};
