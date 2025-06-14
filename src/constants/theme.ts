interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
  error: string;
  success: string;
  warning: string;
  cardBackground: string;
  divider: string;
  border?: string;
  cardReadyOrder: string;
  textLight: string;
}

interface ThemeFonts {
  regular: string;
  medium: string;
  bold: string;
}

interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface ThemeRadii {
  sm: number;
  md: number;
  lg: number;
}

export type AppTheme = {
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
};

export const theme: AppTheme = {
  colors: {
    primary: "#FF6B00",
    secondary: "#FFA726",
    accent: "#FFD166",
    background: "#FFF8F0",
    text: "#333333",
    textSecondary: "#666666",
    error: "#E63946",
    success: "#2EC4B6",
    warning: "#FF9F1C",
    cardBackground: "#FFFFFF",
    divider: "#F0F0F0",
    border: "#E0E0E0",
    cardReadyOrder: "#E6FAE8",
    textLight: "#999",
  },
  fonts: {
    regular: "Roboto-Regular",
    medium: "Roboto-Medium",
    bold: "Roboto-Bold",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};
