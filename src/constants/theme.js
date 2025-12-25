import { Platform } from "react-native";
import { COLORS } from "./colors";

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

// Platform-specific shadow helper
const getShadow = (iosShadow, androidElevation) => {
  if (Platform.OS === "android") {
    return {
      elevation: androidElevation,
    };
  }
  return iosShadow;
};

export const SHADOWS = {
  sm: getShadow(
    {
      shadowColor: "#1A202C",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    2
  ),
  md: getShadow(
    {
      shadowColor: "#1A202C",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    4
  ),
  lg: getShadow(
    {
      shadowColor: "#1A202C",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
    },
    8
  ),
  xl: getShadow(
    {
      shadowColor: "#1A202C",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
    },
    12
  ),
  primary: getShadow(
    {
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
    },
    8
  ),
  card: getShadow(
    {
      shadowColor: "#667EEA",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
    6
  ),
};

export const TYPOGRAPHY = {
  // Headings - Bold and prominent
  h1: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
    letterSpacing: -0.1,
  },
  h5: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  h6: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  // Body text
  body: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  // Captions and labels
  caption: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
    lineHeight: 16,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // Special text styles
  largeNumber: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -1,
  },
  display: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -1.5,
  },
};
