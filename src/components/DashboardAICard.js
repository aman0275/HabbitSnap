import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../utils/colors";
import { TYPOGRAPHY, SPACING } from "../constants/theme";
import {
  AIMotivationCard,
  AIConsistencyCard,
  AIStrengthCard,
  AIAlertsCard,
  AIAchievementsCard,
  AITopHabitsCard,
  AIHabitsNeedingAttentionCard,
  AITrendsCard,
} from "./dashboardAI";

/**
 * Dashboard AI Insights Container
 * Displays aggregated AI insights across all habits in separate cards
 */
const DashboardAICard = ({ aiInsights, onHabitPress }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  if (!aiInsights) return null;

  const {
    overallConsistency,
    overallStrength,
    overallTrends,
    totalAchievements,
    riskAlerts,
    motivationalInsight,
    topPerformingHabits,
    habitsNeedingAttention,
  } = aiInsights;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="sparkles" size={24} color={COLORS.primary} />
        <Text style={styles.title}>AI Insights</Text>
      </View>

      <AIMotivationCard motivationalInsight={motivationalInsight} />
      <AIConsistencyCard overallConsistency={overallConsistency} />
      <AIStrengthCard overallStrength={overallStrength} />
      <AIAlertsCard riskAlerts={riskAlerts} />
      <AIAchievementsCard totalAchievements={totalAchievements} />
      <AITopHabitsCard
        topPerformingHabits={topPerformingHabits}
        onHabitPress={onHabitPress}
      />
      <AIHabitsNeedingAttentionCard
        habitsNeedingAttention={habitsNeedingAttention}
        onHabitPress={onHabitPress}
      />
      <AITrendsCard overallTrends={overallTrends} />
    </View>
  );
};

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h4,
    marginLeft: SPACING.sm,
    color: COLORS.textPrimary,
  },
});

export default DashboardAICard;