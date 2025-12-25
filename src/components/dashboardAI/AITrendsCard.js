import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../../utils/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../../constants/theme";

const AITrendsCard = ({ overallTrends }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  if (!overallTrends) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trend Overview</Text>
      <View style={styles.trendRow}>
        <View style={styles.trendItem}>
          <Ionicons name="trending-up" size={20} color={COLORS.success} />
          <Text style={styles.trendValue}>{overallTrends.improvingCount}</Text>
          <Text style={styles.trendLabel}>Improving</Text>
        </View>
        <View style={styles.trendItem}>
          <Ionicons name="remove" size={20} color={COLORS.textTertiary} />
          <Text style={styles.trendValue}>{overallTrends.stableCount}</Text>
          <Text style={styles.trendLabel}>Stable</Text>
        </View>
        <View style={styles.trendItem}>
          <Ionicons name="trending-down" size={20} color={COLORS.warning} />
          <Text style={styles.trendValue}>{overallTrends.decliningCount}</Text>
          <Text style={styles.trendLabel}>Declining</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  title: {
    ...TYPOGRAPHY.h5,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  trendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: SPACING.sm,
  },
  trendItem: {
    alignItems: "center",
  },
  trendValue: {
    ...TYPOGRAPHY.h5,
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs / 2,
  },
  trendLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
  },
});

export default AITrendsCard;

