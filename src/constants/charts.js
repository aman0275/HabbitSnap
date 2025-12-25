/**
 * Chart Constants
 * Centralized configuration for chart components
 */
import { COLORS } from "./colors";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const CHART_CONFIG = {
  // Dimensions
  DEFAULT_WIDTH: SCREEN_WIDTH - 48, // Account for padding
  DEFAULT_HEIGHT: 200,
  PIE_CHART_SIZE: Math.min(SCREEN_WIDTH - 96, 250),
  PIE_INNER_RADIUS_RATIO: 0.3,
  PIE_LABEL_RADIUS_RATIO: 0.5,
  
  // Padding
  PADDING: {
    left: 50,
    right: 20,
    top: 20,
    bottom: 40,
    pie: 8,
  },
  
  // Domain padding for bar charts
  BAR_DOMAIN_PADDING: 20,
  
  // Colors
  COLORS: {
    grid: COLORS.borderLight,
    axis: COLORS.border,
    text: COLORS.textTertiary,
  },
  
  // Styles
  GRID_STYLE: {
    stroke: COLORS.borderLight,
    strokeDasharray: "4,4",
  },
  AXIS_STYLE: {
    stroke: COLORS.border,
  },
  TICK_LABEL_STYLE: {
    fill: COLORS.textTertiary,
    fontSize: 10,
  },
  
  // Animation
  ANIMATION: {
    duration: 1000,
    onLoadDuration: 500,
  },
  
  // Interpolation
  INTERPOLATION: "natural",
  
  // Line chart specific
  LINE_STROKE_WIDTH: 3,
  AREA_OPACITY: 0.2,
  
  // Bar chart specific
  BAR_FILL_OPACITY: 0.8,
  BAR_CORNER_RADIUS: 6,
  BAR_X_AXIS_ANGLE: -45,
  
  // Pie chart specific
  MIN_PERCENTAGE_FOR_LABEL: 5, // Only show label if segment is > 5%
  MAX_LEGEND_ITEMS: 4, // Show max 4 items in legend
  LEGEND_ITEM_HEIGHT: 8,
  LEGEND_GAP: 8,
};

