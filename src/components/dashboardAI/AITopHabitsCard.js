import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "../../utils/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../../constants/theme";

const AITopHabitsCard = ({ topPerformingHabits, onHabitPress }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  if (!topPerformingHabits || topPerformingHabits.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Performing Habits ⭐</Text>
      {topPerformingHabits.map((item) => (
        <TouchableOpacity
          key={item.habit.id}
          style={styles.habitItem}
          onPress={() => onHabitPress && onHabitPress(item.habit)}
          activeOpacity={0.7}
        >
          <View style={styles.habitInfo}>
            <View
              style={[styles.habitColor, { backgroundColor: item.habit.color }]}
            />
            <Text style={styles.habitName}>{item.habit.name}</Text>
          </View>
          <View style={styles.habitScore}>
            <Text style={styles.scoreText}>
              {Math.round(item.score * 100)}%
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  habitItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
  },
  habitInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  habitColor: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
  },
  habitName: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  habitScore: {
    marginLeft: SPACING.sm,
  },
  scoreText: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.primary,
  },
});

export default AITopHabitsCard;

