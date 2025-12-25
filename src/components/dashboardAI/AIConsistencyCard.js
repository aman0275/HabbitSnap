import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColors } from "../../utils/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../../constants/theme";
import Badge from "../Badge";

const AIConsistencyCard = ({ overallConsistency }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  if (!overallConsistency) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Overall Consistency</Text>
        <Badge
          text={overallConsistency.rating}
          variant={
            overallConsistency.rating === "excellent"
              ? "success"
              : overallConsistency.rating === "good"
              ? "primary"
              : "warning"
          }
        />
      </View>
      <Text style={styles.message}>{overallConsistency.message}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{overallConsistency.excellentCount}</Text>
          <Text style={styles.statLabel}>Excellent</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{overallConsistency.goodCount}</Text>
          <Text style={styles.statLabel}>Good</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {Math.round(overallConsistency.averageScore * 100)}%
          </Text>
          <Text style={styles.statLabel}>Avg Score</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h5,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  message: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: SPACING.sm,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs / 2,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
  },
});

export default AIConsistencyCard;


