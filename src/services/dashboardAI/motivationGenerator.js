import { getMotivationalInsight } from "../../utils/aiAggregationHelpers";
import { MOTIVATION_THRESHOLDS, CONSISTENCY_THRESHOLDS } from "../../constants/aiAggregation";

/**
 * Motivation Generator
 * Generates motivational insights based on aggregated data
 */
export class MotivationGenerator {
  /**
   * Get overall motivational insight
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Object} Motivational insight object
   */
  static getOverallMotivation(habitInsights) {
    const metrics = this.calculateMetrics(habitInsights);
    return getMotivationalInsight(
      metrics.averageStrength,
      metrics.totalAchievements,
      metrics.excellentConsistencyCount
    );
  }

  /**
   * Calculate metrics for motivation
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Object} Metrics object
   */
  static calculateMetrics(habitInsights) {
    const totalAchievements = habitInsights.reduce(
      (sum, insight) => sum + (insight.achievements?.totalAchievements || 0),
      0
    );

    const strengthScores = habitInsights.map(
      (insight) => insight.strength?.score || 0
    );
    const averageStrength =
      strengthScores.reduce((sum, score) => sum + score, 0) /
      strengthScores.length;

    const excellentConsistencyCount = habitInsights.filter(
      (insight) => (insight.consistency?.score || 0) >= CONSISTENCY_THRESHOLDS.EXCELLENT
    ).length;

    return {
      totalAchievements,
      averageStrength,
      excellentConsistencyCount,
    };
  }
}

