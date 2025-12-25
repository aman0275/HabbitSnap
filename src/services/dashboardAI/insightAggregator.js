import {
  getConsistencyRating,
  calculateAverageScore,
  countScoresInRange,
  getConsistencyMessage,
} from "../../utils/aiAggregationHelpers";
import {
  CONSISTENCY_THRESHOLDS,
  STRENGTH_THRESHOLDS,
} from "../../constants/aiAggregation";

/**
 * Insight Aggregator
 * Handles aggregation of specific insight types across habits
 */
export class InsightAggregator {
  /**
   * Aggregate consistency insights
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Object} Aggregated consistency data
   */
  static aggregateConsistency(habitInsights) {
    const consistencyScores = habitInsights.map(
      (insight) => insight.consistency?.score || 0
    );

    const averageScore = calculateAverageScore(consistencyScores);
    const rating = getConsistencyRating(averageScore);
    const excellentCount = countScoresInRange(
      consistencyScores,
      CONSISTENCY_THRESHOLDS.EXCELLENT
    );
    const goodCount = countScoresInRange(
      consistencyScores,
      CONSISTENCY_THRESHOLDS.GOOD,
      CONSISTENCY_THRESHOLDS.EXCELLENT
    );

    return {
      averageScore,
      rating,
      excellentCount,
      goodCount,
      totalHabits: habitInsights.length,
      message: getConsistencyMessage(rating, excellentCount, goodCount),
    };
  }

  /**
   * Aggregate strength insights
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Object} Aggregated strength data
   */
  static aggregateStrength(habitInsights) {
    const strengthScores = habitInsights.map(
      (insight) => insight.strength?.score || 0
    );

    const averageStrength = calculateAverageScore(strengthScores);
    const strongHabits = countScoresInRange(
      strengthScores,
      STRENGTH_THRESHOLDS.STRONG
    );

    return {
      averageStrength,
      strongHabitsCount: strongHabits,
      totalHabits: habitInsights.length,
      percentage: Math.round((strongHabits / habitInsights.length) * 100),
    };
  }
}

