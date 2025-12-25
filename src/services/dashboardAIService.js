import { storage } from "./storage";
import {
  InsightAggregator,
  TrendAggregator,
  AchievementAggregator,
  AlertAggregator,
  HabitSelector,
  MotivationGenerator,
  HabitInsightsLoader,
} from "./dashboardAI";

/**
 * Dashboard AI Service
 * Aggregates AI insights across all habits for dashboard display
 * Uses modular aggregation services for clean separation of concerns
 */
export const dashboardAIService = {
  /**
   * Get overall AI insights across all habits
   */
  async getOverallAIInsights() {
    const habits = await storage.getHabits();
    const allEntries = await storage.getHabitEntries();

    if (habits.length === 0 || allEntries.length === 0) {
      return this.getEmptyInsights();
    }

    // Load insights for all habits using the loader service
    const validInsights = await HabitInsightsLoader.loadAllHabitInsights(
      habits,
      allEntries
    );

    if (validInsights.length === 0) {
      return this.getEmptyInsights();
    }

    // Aggregate insights using modular services
    return {
      overallConsistency: InsightAggregator.aggregateConsistency(validInsights),
      overallStrength: InsightAggregator.aggregateStrength(validInsights),
      overallTrends: TrendAggregator.aggregateTrends(validInsights),
      totalAchievements: AchievementAggregator.aggregateAchievements(
        validInsights
      ),
      riskAlerts: AlertAggregator.aggregateRiskAlerts(validInsights),
      motivationalInsight: MotivationGenerator.getOverallMotivation(
        validInsights
      ),
      topPerformingHabits: HabitSelector.getTopPerformingHabits(validInsights),
      habitsNeedingAttention: HabitSelector.getHabitsNeedingAttention(
        validInsights
      ),
    };
  },


  /**
   * Get empty insights structure
   */
  getEmptyInsights() {
    return {
      overallConsistency: null,
      overallStrength: null,
      overallTrends: null,
      totalAchievements: null,
      riskAlerts: null,
      motivationalInsight: null,
      topPerformingHabits: [],
      habitsNeedingAttention: [],
    };
  },
};

