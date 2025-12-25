import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Circle, Polyline, Defs, LinearGradient, Stop } from "react-native-svg";
import { COLORS } from "../../constants/colors";
import { TYPOGRAPHY } from "../../constants/theme";
import { CHART_CONFIG } from "../../constants/charts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 64; // Account for padding
const CHART_HEIGHT = 220;
const PADDING = 40;
const CHART_INNER_WIDTH = CHART_WIDTH - PADDING * 2;
const CHART_INNER_HEIGHT = CHART_HEIGHT - PADDING * 2;

/**
 * Reusable Line Chart Component
 * Simple SVG-based implementation (no reanimated required)
 */
const LineChart = ({
  data,
  color = COLORS.chart.primary,
  height = CHART_HEIGHT,
  showArea = false,
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  const chartData = formatChartData(data);
  const { path, areaPath, maxValue, minValue } = calculatePath(chartData);

  const yAxisLabels = generateYAxisLabels(minValue, maxValue);
  const xAxisLabels = chartData.map((d, i) => ({
    label: d.label || `${i + 1}`,
    x: PADDING + (i / (chartData.length - 1 || 1)) * CHART_INNER_WIDTH,
  }));

  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={height}>
        <Defs>
          <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </LinearGradient>
        </Defs>

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

        {/* Area under line */}
        {showArea && areaPath && (
          <Path d={areaPath} fill="url(#areaGradient)" />
        )}

        {/* Line */}
        <Path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {chartData.map((point, index) => {
          const x = PADDING + (index / (chartData.length - 1 || 1)) * CHART_INNER_WIDTH;
          const y = PADDING + (1 - (point.y - minValue) / (maxValue - minValue || 1)) * CHART_INNER_HEIGHT;
          return (
            <Circle
              key={`point-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill={color}
              stroke={COLORS.surface}
              strokeWidth="2"
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
        {xAxisLabels.filter((_, i) => i % Math.ceil(xAxisLabels.length / 5) === 0).map((item, index) => (
          <Text key={`x-label-${index}`} style={styles.xAxisLabel}>
            {item.label.length > 8 ? item.label.substring(0, 8) + "..." : item.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

/**
 * Format data for charts
 */
const formatChartData = (data) => {
  return data.map((item, index) => ({
    x: index,
    y: item.count || item.value || 0,
    label: item.day || item.label || "",
  }));
};

/**
 * Calculate path for line and area
 */
const calculatePath = (data) => {
  if (data.length === 0) return { path: "", areaPath: "", maxValue: 0, minValue: 0 };

  const values = data.map((d) => d.y);
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);

  let path = "";
  let areaPath = "";

  data.forEach((point, index) => {
    const x = PADDING + (index / (data.length - 1 || 1)) * CHART_INNER_WIDTH;
    const y = PADDING + (1 - (point.y - minValue) / (maxValue - minValue || 1)) * CHART_INNER_HEIGHT;

    if (index === 0) {
      path = `M ${x} ${y}`;
      areaPath = `M ${x} ${CHART_HEIGHT - PADDING} L ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
      areaPath += ` L ${x} ${y}`;
    }
  });

  if (areaPath) {
    areaPath += ` L ${PADDING + ((data.length - 1) / (data.length - 1 || 1)) * CHART_INNER_WIDTH} ${CHART_HEIGHT - PADDING} Z`;
  }

  return { path, areaPath, maxValue, minValue };
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

export default LineChart;
