import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColors } from "../../utils/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../../constants/theme";

const AIStrengthCard = ({ overallStrength }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  if (!overallStrength) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Strength</Text>
      <View style={styles.strengthBar}>
        <View
          style={[
            styles.strengthBarFill,
            {
              width: `${overallStrength.averageStrength * 100}%`,
              backgroundColor:
                overallStrength.averageStrength >= 0.7
                  ? COLORS.success
                  : overallStrength.averageStrength >= 0.5
                  ? COLORS.primary
                  : COLORS.warning,
            },
          ]}
        />
      </View>
      <Text style={styles.strengthText}>
        {overallStrength.strongHabitsCount} of {overallStrength.totalHabits}{" "}
        habits are strong ({overallStrength.percentage}%)
      </Text>
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
  strengthBar: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    overflow: "hidden",
    marginBottom: SPACING.xs,
  },
  strengthBarFill: {
    height: "100%",
    borderRadius: BORDER_RADIUS.sm,
  },
  strengthText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
});

export default AIStrengthCard;


