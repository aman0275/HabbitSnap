export const COLORS = {
  // Primary colors - Modern gradient-friendly palette
  primary: "#667EEA",
  primaryDark: "#5A67D8",
  primaryLight: "#764BA2",
  primaryGradient: ["#667EEA", "#764BA2"],

  // Accent colors
  accent: "#F093FB",
  accentSecondary: "#4FACFE",

  // Habit colors - Vibrant and modern
  indigo: "#667EEA",
  purple: "#764BA2",
  pink: "#F093FB",
  amber: "#F6AD55",
  emerald: "#48BB78",
  blue: "#4299E1",
  teal: "#38B2AC",
  orange: "#ED8936",
  rose: "#FC8181",

  // Background colors - Soft, modern grays
  background: "#FAFBFC",
  backgroundSecondary: "#F7FAFC",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",

  // Text colors - High contrast for readability
  textPrimary: "#1A202C",
  textSecondary: "#4A5568",
  textTertiary: "#718096",
  textLight: "#A0AEC0",
  textWhite: "#FFFFFF",

  // Status colors - Modern, vibrant
  success: "#48BB78",
  successLight: "#C6F6D5",
  error: "#F56565",
  errorLight: "#FED7D7",
  warning: "#ED8936",
  warningLight: "#FEEBC8",
  info: "#4299E1",
  infoLight: "#BEE3F8",

  // Border colors
  border: "#E2E8F0",
  borderLight: "#EDF2F7",
  borderDark: "#CBD5E0",

  // Chart colors - Distinct and accessible
  chart: {
    primary: "#667EEA",
    secondary: "#764BA2",
    accent: "#F093FB",
    success: "#48BB78",
    warning: "#ED8936",
    error: "#F56565",
    info: "#4299E1",
    teal: "#38B2AC",
  },

  // Overlay colors
  overlay: "rgba(26, 32, 44, 0.4)",
  overlayDark: "rgba(26, 32, 44, 0.6)",
};

export const HABIT_COLORS = [
  {
    id: 1,
    color: COLORS.indigo,
    name: "Indigo",
    gradient: ["#667EEA", "#764BA2"],
  },
  {
    id: 2,
    color: COLORS.purple,
    name: "Purple",
    gradient: ["#764BA2", "#F093FB"],
  },
  { id: 3, color: COLORS.pink, name: "Pink", gradient: ["#F093FB", "#F5576C"] },
  {
    id: 4,
    color: COLORS.amber,
    name: "Amber",
    gradient: ["#F6AD55", "#FBBF24"],
  },
  {
    id: 5,
    color: COLORS.emerald,
    name: "Emerald",
    gradient: ["#48BB78", "#38B2AC"],
  },
  { id: 6, color: COLORS.blue, name: "Blue", gradient: ["#4299E1", "#3182CE"] },
  { id: 7, color: COLORS.teal, name: "Teal", gradient: ["#38B2AC", "#319795"] },
  {
    id: 8,
    color: COLORS.orange,
    name: "Orange",
    gradient: ["#ED8936", "#DD6B20"],
  },
];
