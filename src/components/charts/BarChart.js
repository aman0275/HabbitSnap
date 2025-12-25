import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { COLORS } from "../../constants/colors";
import { TYPOGRAPHY } from "../../constants/theme";
import { CHART_CONFIG } from "../../constants/charts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 64;
const CHART_HEIGHT = 220;
const PADDING = 40;
const CHART_INNER_WIDTH = CHART_WIDTH - PADDING * 2;
const CHART_INNER_HEIGHT = CHART_HEIGHT - PADDING * 2;

/**
 * Reusable Bar Chart Component
 * Simple SVG-based implementation (no reanimated required)
 */
const BarChart = ({
  data,
  color = COLORS.chart.primary,
  height = CHART_HEIGHT,
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  const chartData = formatBarChartData(data);
  const maxValue = Math.max(...chartData.map((d) => d.y), 1);
  const barWidth = CHART_INNER_WIDTH / chartData.length * 0.7;
  const barGap = CHART_INNER_WIDTH / chartData.length * 0.3;

  const yAxisLabels = generateYAxisLabels(0, maxValue);
  const xAxisLabels = chartData.map((d, i) => ({
    label: d.x,
    x: PADDING + i * (CHART_INNER_WIDTH / chartData.length) + (CHART_INNER_WIDTH / chartData.length) / 2,
  }));

  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={height}>
        {/* Grid lines */}
        {yAxisLabels.map((label, index) => {
          const y = PADDING + (index / (yAxisLabels.length - 1)) * CHART_INNER_HEIGHT;
          return (
            <Path
              key={`grid-${index}`}
              d={`M ${PADDING} ${y} L ${CHART_WIDTH - PADDING} ${y}`}
              stroke={COLORS.border}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={0.3}
            />
          );
        })}

        {/* Bars */}
        {chartData.map((item, index) => {
          const barHeight = (item.y / maxValue) * CHART_INNER_HEIGHT;
          const x = PADDING + index * (CHART_INNER_WIDTH / chartData.length) + barGap / 2;
          const y = PADDING + CHART_INNER_HEIGHT - barHeight;

          return (
            <Rect
              key={`bar-${index}`}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx={4}
              ry={4}
            />
          );
        })}
      </Svg>

      {/* Y-axis labels */}
      <View style={styles.yAxisLabels}>
        {yAxisLabels.map((label, index) => (
          <Text key={`y-label-${index}`} style={styles.yAxisLabel}>
            {label}
          </Text>
        ))}
      </View>

      {/* X-axis labels */}
      <View style={styles.xAxisLabels}>
        {xAxisLabels.map((item, index) => (
          <Text key={`x-label-${index}`} style={styles.xAxisLabel} numberOfLines={1}>
            {typeof item.label === "string" && item.label.length > 6 
              ? item.label.substring(0, 6) + "..." 
              : item.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

/**
 * Format data for bar charts
 */
const formatBarChartData = (data) => {
  return data.map((item, index) => ({
    x: item.day || item.label || index + 1,
    y: item.count || item.value || 0,
  }));
};

/**
 * Generate Y-axis labels
 */
const generateYAxisLabels = (min, max) => {
  const count = 5;
  const labels = [];
  const range = max - min || 1;

  for (let i = 0; i <= count; i++) {
    const value = min + (range * i) / count;
    labels.push(Math.round(value));
  }

  return labels;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    position: "relative",
  },
  yAxisLabels: {
    position: "absolute",
    left: 0,
    top: PADDING,
    height: CHART_INNER_HEIGHT,
    justifyContent: "space-between",
    width: 30,
  },
  yAxisLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  xAxisLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: PADDING,
    marginTop: 8,
  },
  xAxisLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
    flex: 1,
    textAlign: "center",
  },
  emptyText: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: "center",
    paddingVertical: 40,
  },
});

export default BarChart;
