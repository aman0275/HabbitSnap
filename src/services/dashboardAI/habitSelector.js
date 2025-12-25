import {
  calculatePerformanceScore,
  needsAttention,
  getTopHabitsByScore,
} from "../../utils/aiAggregationHelpers";
import { DASHBOARD_LIMITS } from "../../constants/aiAggregation";

/**
 * Habit Selector
 * Handles selection of habits based on various criteria
 */
export class HabitSelector {
  /**
   * Get top performing habits
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @param {number} limit - Maximum number to return
   * @returns {Array<Object>} Top performing habits
   */
  static getTopPerformingHabits(habitInsights, limit = DASHBOARD_LIMITS.TOP_PERFORMING_HABITS) {
    return getTopHabitsByScore(
      habitInsights,
      (insight) =>
        calculatePerformanceScore(
          insight.strength?.score || 0,
          insight.consistency?.score || 0
        ),
      limit
    ).map((item) => ({
      habit: item.habit,
      score: item.score,
      strength: item.strength?.score || 0,
      consistency: item.consistency?.score || 0,
    }));
  }

  /**
   * Get habits needing attention
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @param {number} limit - Maximum number to return
   * @returns {Array<Object>} Habits needing attention
   */
  static getHabitsNeedingAttention(
    habitInsights,
    limit = DASHBOARD_LIMITS.HABITS_NEEDING_ATTENTION
  ) {
    const needingAttention = habitInsights
      .filter(needsAttention)
      .map((insight) => ({
        habit: insight.habit,
        consistency: insight.consistency?.score || 0,
        strength: insight.strength?.score || 0,
        hasUrgentAlert:
          insight.predictions?.alerts?.some(
            (a) => a.type === "urgent"
          ) || false,
      }))
      .sort(this.sortByUrgencyAndConsistency)
      .slice(0, limit);

    return needingAttention;
  }

  /**
   * Sort habits by urgency and consistency
   * @param {Object} a - First habit
   * @param {Object} b - Second habit
   * @returns {number} Sort comparison value
   */
  static sortByUrgencyAndConsistency(a, b) {
    // Sort by urgency first
    if (a.hasUrgentAlert && !b.hasUrgentAlert) return -1;
    if (b.hasUrgentAlert && !a.hasUrgentAlert) return 1;
    // Then by consistency score (lowest first)
    return a.consistency - b.consistency;
  }
}

