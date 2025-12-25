import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../constants/theme";
import { getCategoryById } from "../constants/aiCategories";

/**
 * Habit Suggestion Card Component
 * Displays a single habit suggestion with action button
 */
const HabitSuggestionCard = ({ suggestion, onSelect }) => {
  const category = getCategoryById(suggestion.category);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelect(suggestion)}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: suggestion.color + "20" }]}>
        <Ionicons name={suggestion.icon || category.icon} size={24} color={suggestion.color} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {suggestion.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {suggestion.description}
        </Text>
        {suggestion.reason && (
          <View style={styles.reasonContainer}>
            <Ionicons name="sparkles" size={12} color={COLORS.textTertiary} />
            <Text style={styles.reason}>{suggestion.reason}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionContainer}>
        <Ionicons name="add-circle" size={24} color={suggestion.color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs / 2,
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs / 2,
  },
  reasonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs / 2,
  },
  reason: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    marginLeft: SPACING.xs / 2,
  },
  actionContainer: {
    marginLeft: SPACING.sm,
  },
});

export default HabitSuggestionCard;

