import { useColorScheme } from 'react-native';
import { COLORS as LIGHT_COLORS } from '../constants/colors';

/**
 * Dark mode color palette
 */
export const DARK_COLORS = {
  // Primary colors - Keep gradients vibrant in dark mode
  primary: "#7C8BF9",
  primaryDark: "#667EEA",
  primaryLight: "#8B5CF6",
  primaryGradient: ["#7C8BF9", "#8B5CF6"],

  // Accent colors
  accent: "#F093FB",
  accentSecondary: "#4FACFE",

  // Habit colors - Slightly lighter for dark mode
  indigo: "#7C8BF9",
  purple: "#8B5CF6",
  pink: "#F093FB",
  amber: "#F6AD55",
  emerald: "#48BB78",
  blue: "#4299E1",
  teal: "#38B2AC",
  orange: "#ED8936",
  rose: "#FC8181",

  // Background colors - Dark theme
  background: "#0F172A",
  backgroundSecondary: "#1E293B",
  surface: "#1E293B",
  surfaceElevated: "#334155",

  // Text colors - Light for dark backgrounds
  textPrimary: "#F1F5F9",
  textSecondary: "#CBD5E0",
  textTertiary: "#94A3B8",
  textLight: "#64748B",
  textWhite: "#FFFFFF",

  // Status colors - Same but may need adjustment
  success: "#48BB78",
  successLight: "#1E3A2E",
  error: "#F56565",
  errorLight: "#3A1F1F",
  warning: "#ED8936",
  warningLight: "#3A2A1F",
  info: "#4299E1",
  infoLight: "#1E2A3A",

  // Border colors - Lighter borders for dark mode
  border: "#334155",
  borderLight: "#475569",
  borderDark: "#64748B",

  // Chart colors - Keep same for consistency
  chart: {
    primary: "#7C8BF9",
    secondary: "#8B5CF6",
    accent: "#F093FB",
    success: "#48BB78",
    warning: "#ED8936",
    error: "#F56565",
    info: "#4299E1",
    teal: "#38B2AC",
  },

  // Overlay colors - Adjusted for dark mode
  overlay: "rgba(15, 23, 42, 0.7)",
  overlayDark: "rgba(15, 23, 42, 0.85)",
};

/**
 * Get colors based on color scheme
 */
export const getColors = (colorScheme) => {
  return colorScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
};

/**
 * Hook to get current colors based on system theme
 */
export const useColors = () => {
  const colorScheme = useColorScheme();
  return getColors(colorScheme);
};

