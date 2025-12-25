import {
  CONSISTENCY_RATINGS,
  CONSISTENCY_THRESHOLDS,
  STRENGTH_THRESHOLDS,
  PERFORMANCE_WEIGHTS,
  ATTENTION_THRESHOLDS,
  MOTIVATION_THRESHOLDS,
} from "../constants/aiAggregation";

/**
 * AI Aggregation Helper Functions
 * Pure functions for aggregating AI insights across multiple habits
 */

/**
 * Determine consistency rating from score
 * @param {number} score - Consistency score (0-1)
 * @returns {string} Rating string
 */
export const getConsistencyRating = (score) => {
  if (score >= CONSISTENCY_THRESHOLDS.EXCELLENT) {
    return CONSISTENCY_RATINGS.EXCELLENT;
  }
  if (score >= CONSISTENCY_THRESHOLDS.GOOD) {
    return CONSISTENCY_RATINGS.GOOD;
  }
  if (score >= CONSISTENCY_THRESHOLDS.FAIR) {
    return CONSISTENCY_RATINGS.FAIR;
  }
  return CONSISTENCY_RATINGS.NEEDS_IMPROVEMENT;
};

/**
 * Calculate average score from array of scores
 * @param {Array<number>} scores - Array of scores
 * @returns {number} Average score
 */
export const calculateAverageScore = (scores) => {
  if (scores.length === 0) return 0;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

/**
 * Count scores in a range
 * @param {Array<number>} scores - Array of scores
 * @param {number} min - Minimum threshold (inclusive)
 * @param {number} max - Maximum threshold (exclusive, optional)
 * @returns {number} Count of scores in range
 */
export const countScoresInRange = (scores, min, max = Infinity) => {
  return scores.filter((score) => score >= min && score < max).length;
};

/**
 * Check if habit needs attention
 * @param {Object} insight - Habit insight object
 * @returns {boolean} True if habit needs attention
 */
export const needsAttention = (insight) => {
  const hasUrgentAlert =
    insight.predictions?.alerts?.some(
      (a) => a.type === "urgent" || a.type === "warning"
    ) || false;
  const lowConsistency =
    (insight.consistency?.score || 0) < ATTENTION_THRESHOLDS.LOW_CONSISTENCY;
  const lowStrength =
    (insight.strength?.score || 0) < ATTENTION_THRESHOLDS.LOW_STRENGTH;

  return hasUrgentAlert || lowConsistency || lowStrength;
};

/**
 * Calculate habit performance score
 * @param {number} strengthScore - Habit strength score (0-1)
 * @param {number} consistencyScore - Consistency score (0-1)
 * @returns {number} Performance score (0-1)
 */
export const calculatePerformanceScore = (
  strengthScore,
  consistencyScore
) => {
  return (
    (strengthScore || 0) * PERFORMANCE_WEIGHTS.STRENGTH +
    (consistencyScore || 0) * PERFORMANCE_WEIGHTS.CONSISTENCY
  );
};

/**
 * Sort alerts by priority (urgent first)
 * @param {Array<Object>} alerts - Array of alert objects
 * @returns {Array<Object>} Sorted alerts
 */
export const sortAlertsByPriority = (alerts) => {
  return [...alerts].sort((a, b) => {
    if (a.type === "urgent" && b.type !== "urgent") return -1;
    if (b.type === "urgent" && a.type !== "urgent") return 1;
    if (a.type === "warning" && b.type !== "warning") return -1;
    if (b.type === "warning" && a.type !== "warning") return 1;
    return 0;
  });
};

/**
 * Determine overall trend direction
 * @param {number} improvingCount - Number of improving habits
 * @param {number} decliningCount - Number of declining habits
 * @returns {string} Trend direction
 */
export const determineOverallTrend = (improvingCount, decliningCount) => {
  if (improvingCount > decliningCount) return "improving";
  if (decliningCount > improvingCount) return "declining";
  return "stable";
};

/**
 * Get consistency message based on rating and counts
 * @param {string} rating - Consistency rating
 * @param {number} excellentCount - Count of excellent habits
 * @param {number} goodCount - Count of good habits
 * @returns {string} Message
 */
export const getConsistencyMessage = (rating, excellentCount, goodCount) => {
  const messages = {
    [CONSISTENCY_RATINGS.EXCELLENT]: `Excellent! ${excellentCount} habit${
      excellentCount > 1 ? "s are" : " is"
    } performing exceptionally well!`,
    [CONSISTENCY_RATINGS.GOOD]: `Good consistency! ${
      goodCount + excellentCount
    } habit${goodCount + excellentCount > 1 ? "s are" : " is"} on track.`,
    [CONSISTENCY_RATINGS.FAIR]:
      "You're making progress. Focus on consistency to improve your habits.",
    [CONSISTENCY_RATINGS.NEEDS_IMPROVEMENT]:
      "Focus on daily tracking to build stronger habits!",
  };

  return messages[rating] || messages[CONSISTENCY_RATINGS.NEEDS_IMPROVEMENT];
};

/**
 * Get motivational insight based on overall metrics
 * @param {number} averageStrength - Average habit strength
 * @param {number} totalAchievements - Total achievements count
 * @param {number} excellentConsistencyCount - Count of excellent consistency habits
 * @returns {Object} Motivational insight object
 */
export const getMotivationalInsight = (
  averageStrength,
  totalAchievements,
  excellentConsistencyCount
) => {
  if (
    averageStrength >= MOTIVATION_THRESHOLDS.CELEBRATION_STRENGTH &&
    totalAchievements > 0
  ) {
    return {
      message:
        "You're doing amazing! Your habits are strong and consistent! 🎉",
      type: "celebration",
      icon: "trophy",
    };
  }

  if (
    averageStrength >= MOTIVATION_THRESHOLDS.ENCOURAGEMENT_STRENGTH &&
    excellentConsistencyCount > 0
  ) {
    return {
      message: "Great progress! Keep building on your momentum! 💪",
      type: "encouragement",
      icon: "flame",
    };
  }

  if (averageStrength >= MOTIVATION_THRESHOLDS.ENCOURAGEMENT_STRENGTH) {
    return {
      message:
        "Good work! Focus on consistency to make your habits even stronger! ⭐",
      type: "encouragement",
      icon: "star",
    };
  }

  return {
    message: "Keep going! Consistency is the key to building strong habits! 🌱",
    type: "motivation",
    icon: "leaf",
  };
};

/**
 * Extract scores from insights array
 * @param {Array<Object>} insights - Array of insight objects
 * @param {string} scorePath - Path to score (e.g., 'consistency.score')
 * @returns {Array<number>} Array of scores
 */
export const extractScores = (insights, scorePath) => {
  return insights.map((insight) => {
    const pathParts = scorePath.split(".");
    let value = insight;
    for (const part of pathParts) {
      value = value?.[part];
    }
    return value || 0;
  });
};

/**
 * Filter and sort habits by performance
 * @param {Array<Object>} habitInsights - Array of habit insight objects
 * @param {Function} scoringFn - Function to calculate score
 * @param {number} limit - Maximum number to return
 * @returns {Array<Object>} Sorted and limited habits
 */
export const getTopHabitsByScore = (
  habitInsights,
  scoringFn,
  limit = 3
) => {
  return habitInsights
    .map((insight) => ({
      ...insight,
      score: scoringFn(insight),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

