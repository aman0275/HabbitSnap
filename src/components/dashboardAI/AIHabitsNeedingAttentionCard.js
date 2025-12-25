import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../../utils/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../../constants/theme";

const AIHabitsNeedingAttentionCard = ({ habitsNeedingAttention, onHabitPress }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  if (!habitsNeedingAttention || habitsNeedingAttention.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habits Needing Attention ⚠️</Text>
      {habitsNeedingAttention.map((item) => (
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
            <View>
              <Text style={styles.habitName}>{item.habit.name}</Text>
              {item.hasUrgentAlert && (
                <Text style={styles.urgentLabel}>Urgent attention needed</Text>
              )}
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
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
  urgentLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: 2,
  },
});

export default AIHabitsNeedingAttentionCard;

