import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { habitSuggestionService } from "../services/habitSuggestionService";
import HabitSuggestionCard from "./HabitSuggestionCard";
import { COLORS } from "../constants/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../constants/theme";

/**
 * Habit Suggestions List Component
 * Displays a list of suggested habits with categories
 */
const HabitSuggestionsList = ({ existingHabits = [], onSelectSuggestion, onDismiss }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    loadSuggestions();
  }, [existingHabits]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const loadedSuggestions = await habitSuggestionService.getSuggestions(existingHabits);
      setSuggestions(loadedSuggestions);
    } catch (error) {
      console.error("Error loading suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (suggestion) => {
    if (onSelectSuggestion) {
      onSelectSuggestion({
        name: suggestion.name,
        description: suggestion.description,
        color: suggestion.color,
      });
    }
  };

  if (loading || suggestions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="bulb" size={20} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Suggested Habits</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{suggestions.length}</Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={COLORS.textSecondary}
        />
      </TouchableOpacity>

      {expanded && (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <HabitSuggestionCard
                key={`${suggestion.name}-${index}`}
                suggestion={suggestion}
                onSelect={handleSelect}
              />
            ))}
          </View>
        </ScrollView>
      )}

      {onDismiss && expanded && (
        <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    ...TYPOGRAPHY.h5,
    marginLeft: SPACING.sm,
  },
  badge: {
    backgroundColor: COLORS.primary + "20",
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.xs + 2,
    paddingVertical: 2,
    marginLeft: SPACING.xs,
  },
  badgeText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.primary,
    fontSize: 11,
  },
  scrollView: {
    maxHeight: 400,
  },
  suggestionsContainer: {
    padding: SPACING.md,
  },
  dismissButton: {
    padding: SPACING.sm,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  dismissText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
  },
});

export default HabitSuggestionsList;

