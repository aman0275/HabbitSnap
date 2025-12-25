import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Circle, G, Text as SvgText } from "react-native-svg";
import { COLORS } from "../../constants/colors";
import { TYPOGRAPHY } from "../../constants/theme";
import { CHART_CONFIG } from "../../constants/charts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PIE_SIZE = 180;
const CENTER_X = PIE_SIZE / 2;
const CENTER_Y = PIE_SIZE / 2;
const RADIUS = PIE_SIZE / 2 - 10;
const INNER_RADIUS = RADIUS * 0.6;

/**
 * Reusable Pie Chart Component
 * Simple SVG-based implementation (no reanimated required)
 */
const PieChart = ({ data, height = 300 }) => {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  const chartData = formatPieChartData(data);
  if (chartData.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  const total = calculateTotal(chartData);
  const colorScale = getColorScale(chartData);
  const segments = calculateSegments(chartData, total, colorScale);

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <Svg width={PIE_SIZE} height={PIE_SIZE} viewBox={`0 0 ${PIE_SIZE} ${PIE_SIZE}`}>
          {/* Pie segments */}
          {segments.map((segment, index) => (
            <Path
              key={`segment-${index}`}
              d={segment.path}
              fill={segment.color}
              stroke={COLORS.surface}
              strokeWidth="2"
            />
          ))}

          {/* Center circle (donut effect) */}
          <Circle cx={CENTER_X} cy={CENTER_Y} r={INNER_RADIUS} fill={COLORS.surface} />

          {/* Center label with total */}
          <SvgText
            x={CENTER_X}
            y={CENTER_Y - 8}
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill={COLORS.textPrimary}
          >
            {String(total)}
          </SvgText>
          <SvgText
            x={CENTER_X}
            y={CENTER_Y + 12}
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.textSecondary}
          >
            Total
          </SvgText>
        </Svg>
      </View>

      {/* Legend */}
      <PieChartLegend chartData={chartData} segments={segments} total={total} />
    </View>
  );
};

/**
 * Format data for pie charts
 */
const formatPieChartData = (data) => {
  return data
    .filter((item) => (item.count || item.value || 0) > 0)
    .map((item, index) => ({
      x: item.name || `Item ${index + 1}`,
      y: item.count || item.value || 0,
      color: item.color || COLORS.chart.primary,
    }));
};

/**
 * Get default color palette for pie charts
 */
const getDefaultColors = () => [
  COLORS.chart.primary,
  COLORS.chart.secondary,
  COLORS.chart.accent,
  COLORS.chart.success,
  COLORS.chart.warning,
  COLORS.chart.error,
  COLORS.chart.info,
  COLORS.chart.teal,
];

/**
 * Get color scale for pie chart
 */
const getColorScale = (chartData) => {
  const defaultColors = getDefaultColors();
  return chartData.map(
    (d) => d.color || defaultColors[chartData.indexOf(d) % defaultColors.length]
  );
};

/**
 * Calculate total value from chart data
 */
const calculateTotal = (chartData) => {
  return chartData.reduce((sum, d) => sum + d.y, 0);
};

/**
 * Calculate pie segments with paths
 */
const calculateSegments = (data, total, colors) => {
  let currentAngle = -90; // Start at top
  const segments = [];

  data.forEach((item, index) => {
    const percentage = item.y / total;
    const angle = percentage * 360;

    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = CENTER_X + RADIUS * Math.cos(startAngleRad);
    const y1 = CENTER_Y + RADIUS * Math.sin(startAngleRad);
    const x2 = CENTER_X + RADIUS * Math.cos(endAngleRad);
    const y2 = CENTER_Y + RADIUS * Math.sin(endAngleRad);

    const innerX1 = CENTER_X + INNER_RADIUS * Math.cos(startAngleRad);
    const innerY1 = CENTER_Y + INNER_RADIUS * Math.sin(startAngleRad);
    const innerX2 = CENTER_X + INNER_RADIUS * Math.cos(endAngleRad);
    const innerY2 = CENTER_Y + INNER_RADIUS * Math.sin(endAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const path = `
      M ${CENTER_X} ${CENTER_Y}
      L ${x1} ${y1}
      A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${innerX2} ${innerY2}
      A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1}
      Z
    `;

    segments.push({
      path: path.trim(),
      color: colors[index],
      label: item.x,
      value: item.y,
      percentage: (percentage * 100).toFixed(1),
    });

    currentAngle = endAngle;
  });

  return segments;
};

/**
 * Pie Chart Legend Component
 */
const PieChartLegend = ({ chartData, segments, total }) => {
  const defaultColors = getDefaultColors();
  const maxItems = CHART_CONFIG.MAX_LEGEND_ITEMS || 6;
  const legendItems = segments.slice(0, maxItems);
  const remainingCount = segments.length - maxItems;

  return (
    <View style={styles.legend}>
      {legendItems.map((segment, index) => (
        <View key={`legend-${index}`} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: segment.color }]} />
          <Text style={styles.legendText} numberOfLines={1}>
            {segment.label} ({segment.percentage}%)
          </Text>
        </View>
      ))}
      {remainingCount > 0 && (
        <Text style={styles.legendMore}>+{remainingCount} more</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  legend: {
    marginTop: 16,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: CHART_CONFIG.LEGEND_GAP || 8,
  },
  legendColor: {
    width: CHART_CONFIG.LEGEND_ITEM_HEIGHT || 12,
    height: CHART_CONFIG.LEGEND_ITEM_HEIGHT || 12,
    borderRadius: (CHART_CONFIG.LEGEND_ITEM_HEIGHT || 12) / 2,
    marginRight: CHART_CONFIG.LEGEND_GAP || 8,
  },
  legendText: {
    ...TYPOGRAPHY.bodySmall,
    flex: 1,
  },
  legendMore: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
  emptyText: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: "center",
    paddingVertical: 40,
  },
});

export default PieChart;
