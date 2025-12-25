import { DASHBOARD_LIMITS } from "../../constants/aiAggregation";

/**
 * Achievement Aggregator
 * Handles aggregation of achievement insights across habits
 */
export class AchievementAggregator {
  /**
   * Aggregate achievements
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Object} Aggregated achievement data
   */
  static aggregateAchievements(habitInsights) {
    const allAchievements = this.collectAllAchievements(habitInsights);
    const sortedAchievements = this.sortAchievementsByImportance(
      allAchievements
    );
    const upcomingMilestones = this.collectUpcomingMilestones(habitInsights);

    return {
      total: allAchievements.length,
      recent: sortedAchievements.slice(0, DASHBOARD_LIMITS.RECENT_ACHIEVEMENTS),
      upcoming: upcomingMilestones,
    };
  }

  /**
   * Collect all achievements from habit insights
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Array<Object>} Array of achievement objects
   */
  static collectAllAchievements(habitInsights) {
    return habitInsights.flatMap(
      (insight) => insight.achievements?.achievements || []
    );
  }

  /**
   * Sort achievements by importance (milestone value)
   * @param {Array<Object>} achievements - Array of achievement objects
   * @returns {Array<Object>} Sorted achievements
   */
  static sortAchievementsByImportance(achievements) {
    return [...achievements].sort((a, b) => {
      return (b.milestone || 0) - (a.milestone || 0);
    });
  }

  /**
   * Collect upcoming milestones
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Array<Object>} Array of upcoming milestone objects
   */
  static collectUpcomingMilestones(habitInsights) {
    return habitInsights.flatMap(
      (insight) => insight.achievements?.upcomingMilestones || []
    );
  }
}

