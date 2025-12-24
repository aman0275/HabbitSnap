import {
  CONSISTENCY_SCORES,
  CONSISTENCY_WEIGHTS,
  TIME_THRESHOLDS,
  ANALYSIS_WINDOWS,
} from '../../constants/aiConfig';
import {
  getRecentEntries,
  calculateFrequencyScore,
  calculateRecencyScore,
  calculateDaysDifference,
} from '../../utils/aiHelpers';

/**
 * Consistency Analyzer Service
 * Analyzes habit tracking consistency patterns
 */
class ConsistencyAnalyzer {
  /**
   * Analyze consistency of habit entries
   * @param {Array} entries - Array of habit entries
   * @returns {Object} Consistency analysis result
   */
  async analyze(entries) {
    // Ensure entries is an array
    if (!Array.isArray(entries)) {
      return this.getDefaultResult();
    }

    if (!this.hasEnoughData(entries)) {
      return this.getDefaultResult();
    }

    const sortedEntries = getRecentEntries(entries, ANALYSIS_WINDOWS.RECENT_ENTRIES);
    const metrics = this.calculateMetrics(sortedEntries, entries);
    const consistencyScore = this.calculateConsistencyScore(metrics);
    const rating = this.getConsistencyRating(consistencyScore);
    const message = this.generateMessage(rating);
    const insights = this.generateInsights(metrics);

    return {
      score: consistencyScore,
      consistency: rating,
      message,
      insights,
      metrics: {
        daysWithEntries: metrics.daysWithEntries,
        daysSinceLastEntry: metrics.daysSinceLastEntry,
      },
    };
  }

  /**
   * Check if there's enough data for analysis
   * @param {Array} entries - Entries array
   * @returns {boolean} True if enough data
   */
  hasEnoughData(entries) {
    return entries && entries.length >= 2;
  }

  /**
   * Calculate consistency metrics
   * @param {Array} recentEntries - Recent entries
   * @param {Array} allEntries - All entries
   * @returns {Object} Metrics object
   */
  calculateMetrics(recentEntries, allEntries) {
    const daysWithEntries = recentEntries.length;
    const lastEntryDate = new Date(recentEntries[0].date);
    const daysSinceLastEntry = calculateDaysDifference(lastEntryDate, new Date());

    return {
      daysWithEntries,
      daysSinceLastEntry,
      totalEntries: allEntries.length,
    };
  }

  /**
   * Calculate overall consistency score
   * @param {Object} metrics - Metrics object
   * @returns {number} Consistency score (0-1)
   */
  calculateConsistencyScore(metrics) {
    const frequencyScore = calculateFrequencyScore(
      metrics.daysWithEntries,
      ANALYSIS_WINDOWS.WEEK_DAYS
    );

    const recencyScore = calculateRecencyScore(
      metrics.daysSinceLastEntry,
      TIME_THRESHOLDS.DAYS_FOR_RECENCY_PENALTY
    );

    return (
      frequencyScore * CONSISTENCY_WEIGHTS.FREQUENCY +
      recencyScore * CONSISTENCY_WEIGHTS.RECENCY
    );
  }

  /**
   * Get consistency rating based on score
   * @param {number} score - Consistency score
   * @returns {string} Rating (excellent, good, fair, needs-improvement)
   */
  getConsistencyRating(score) {
    if (score >= CONSISTENCY_SCORES.EXCELLENT) return 'excellent';
    if (score >= CONSISTENCY_SCORES.GOOD) return 'good';
    if (score >= CONSISTENCY_SCORES.FAIR) return 'fair';
    return 'needs-improvement';
  }

  /**
   * Generate personalized message based on rating
   * @param {string} rating - Consistency rating
   * @returns {string} Personalized message
   */
  generateMessage(rating) {
    const messages = {
      excellent: "Excellent consistency! You're building a strong habit.",
      good: 'Good progress! Keep maintaining your streak.',
      fair: "You're making progress. Try to be more consistent.",
      'needs-improvement':
        'Try to be more consistent. Small daily actions lead to big results.',
    };

    return messages[rating] || messages['needs-improvement'];
  }

  /**
   * Generate actionable insights
   * @param {Object} metrics - Metrics object
   * @returns {Array} Array of insight strings
   */
  generateInsights(metrics) {
    const insights = [];

    if (metrics.daysSinceLastEntry > 2) {
      insights.push(
        `Last entry was ${metrics.daysSinceLastEntry} days ago. Try to maintain daily consistency.`
      );
    }

    if (metrics.daysWithEntries < 4) {
      insights.push(
        `You've tracked ${metrics.daysWithEntries} days this week. Aim for daily tracking.`
      );
    }

    return insights;
  }

  /**
   * Get default result for insufficient data
   * @returns {Object} Default consistency result
   */
  getDefaultResult() {
    return {
      score: 1.0,
      consistency: 'excellent',
      message: 'Keep going!',
      insights: [],
      metrics: {
        daysWithEntries: 0,
        daysSinceLastEntry: 0,
      },
    };
  }
}

export default new ConsistencyAnalyzer();

