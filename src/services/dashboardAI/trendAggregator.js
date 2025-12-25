import { determineOverallTrend } from "../../utils/aiAggregationHelpers";
import { TREND_DIRECTIONS } from "../../constants/aiAggregation";

/**
 * Trend Aggregator
 * Handles aggregation of trend insights across habits
 */
export class TrendAggregator {
  /**
   * Aggregate trend insights
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Object} Aggregated trend data
   */
  static aggregateTrends(habitInsights) {
    const improvingHabits = this.countImprovingHabits(habitInsights);
    const decliningHabits = this.countDecliningHabits(habitInsights);
    const stableCount =
      habitInsights.length - improvingHabits - decliningHabits;

    return {
      improvingCount: improvingHabits,
      decliningCount: decliningHabits,
      stableCount,
      totalHabits: habitInsights.length,
      overallDirection: determineOverallTrend(improvingHabits, decliningHabits),
    };
  }

  /**
   * Count improving habits
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {number} Count of improving habits
   */
  static countImprovingHabits(habitInsights) {
    return habitInsights.filter((insight) => {
      const trends = insight.trends?.trends;
      return (
        trends?.overall?.direction === TREND_DIRECTIONS.IMPROVING ||
        trends?.comparison?.isBetter === true
      );
    }).length;
  }

  /**
   * Count declining habits
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {number} Count of declining habits
   */
  static countDecliningHabits(habitInsights) {
    return habitInsights.filter((insight) => {
      return (
        insight.trends?.trends?.overall?.direction === TREND_DIRECTIONS.DECLINING
      );
    }).length;
  }
}

