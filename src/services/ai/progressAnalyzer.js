import {
  PROGRESS_THRESHOLDS,
  ANALYSIS_WINDOWS,
} from '../../constants/aiConfig';
import {
  sortEntriesByDateAsc,
  getRecentEntries,
} from '../../utils/aiHelpers';

/**
 * Progress Analyzer Service
 * Analyzes long-term progress and trends
 */
class ProgressAnalyzer {
  /**
   * Analyze progress over time
   * @param {Array} entries - Array of habit entries
   * @returns {Object} Progress analysis result
   */
  async analyze(entries) {
    // Ensure entries is an array
    if (!Array.isArray(entries)) {
      return this.getEmptyResult();
    }

    if (!this.hasData(entries)) {
      return this.getEmptyResult();
    }

    const sortedEntries = sortEntriesByDateAsc(entries);
    const metrics = this.calculateProgressMetrics(sortedEntries);
    const insights = this.generateInsights(metrics, sortedEntries);

    return {
      hasProgress: true,
      metrics: {
        totalDays: metrics.totalDays,
        daysActive: metrics.daysActive,
        consistencyRate: metrics.consistencyRate,
      },
      insights,
    };
  }

  /**
   * Check if there's data to analyze
   * @param {Array} entries - Entries array
   * @returns {boolean} True if has data
   */
  hasData(entries) {
    return entries && entries.length > 0;
  }

  /**
   * Calculate progress metrics
   * @param {Array} sortedEntries - Entries sorted by date ascending
   * @returns {Object} Metrics object
   */
  calculateProgressMetrics(sortedEntries) {
    const totalDays = sortedEntries.length;
    const firstEntryDate = new Date(sortedEntries[0].date);
    const lastEntryDate = new Date(sortedEntries[sortedEntries.length - 1].date);
    const daysActive = Math.floor(
      (lastEntryDate - firstEntryDate) / (1000 * 60 * 60 * 24)
    ) + 1;
    const consistencyRate = totalDays / Math.max(daysActive, 1);

    return {
      totalDays,
      daysActive,
      consistencyRate,
    };
  }

  /**
   * Generate progress insights
   * @param {Object} metrics - Progress metrics
   * @param {Array} sortedEntries - All entries sorted
   * @returns {Array} Array of insight objects
   */
  generateInsights(metrics, sortedEntries) {
    const insights = [];

    // Milestone insights
    if (metrics.totalDays >= PROGRESS_THRESHOLDS.HABIT_FORMATION_DAYS) {
      insights.push(this.createMilestoneInsight(metrics.totalDays));
    }

    // Consistency rate insights
    if (metrics.consistencyRate >= 0.8) {
      insights.push(this.createConsistencyInsight(metrics.consistencyRate));
    } else if (
      metrics.totalDays >= 7 &&
      metrics.consistencyRate < PROGRESS_THRESHOLDS.MIN_CONSISTENCY_RATE
    ) {
      insights.push(this.createConsistencySuggestion());
    }

    // Trend insights
    if (sortedEntries.length >= PROGRESS_THRESHOLDS.MIN_ENTRIES_FOR_TREND) {
      const trendInsight = this.analyzeTrend(sortedEntries);
      if (trendInsight) {
        insights.push(trendInsight);
      }
    }

    return insights;
  }

  /**
   * Create milestone insight
   * @param {number} totalDays - Total days tracked
   * @returns {Object} Milestone insight
   */
  createMilestoneInsight(totalDays) {
    return {
      type: 'milestone',
      message: `You've been tracking for ${totalDays} days! Research shows it takes ${PROGRESS_THRESHOLDS.HABIT_FORMATION_DAYS} days to form a habit - you're well on your way!`,
      icon: 'trophy',
    };
  }

  /**
   * Create consistency rate insight
   * @param {number} consistencyRate - Consistency rate (0-1)
   * @returns {Object} Consistency insight
   */
  createConsistencyInsight(consistencyRate) {
    return {
      type: 'success',
      message: `Excellent consistency rate of ${Math.round(consistencyRate * 100)}%!`,
      icon: 'star',
    };
  }

  /**
   * Create consistency suggestion
   * @returns {Object} Suggestion insight
   */
  createConsistencySuggestion() {
    return {
      type: 'suggestion',
      message: 'Try to track more consistently. Setting a daily reminder can help!',
      icon: 'bulb',
    };
  }

  /**
   * Analyze improvement trend
   * @param {Array} sortedEntries - All entries sorted
   * @returns {Object|null} Trend insight or null
   */
  analyzeTrend(sortedEntries) {
    const recentWeek = getRecentEntries(
      sortedEntries,
      ANALYSIS_WINDOWS.WEEK_DAYS
    );
    const previousWeek = getRecentEntries(
      sortedEntries,
      ANALYSIS_WINDOWS.WEEK_DAYS * PROGRESS_THRESHOLDS.TREND_COMPARISON_WEEKS
    ).slice(ANALYSIS_WINDOWS.WEEK_DAYS);

    if (recentWeek.length > previousWeek.length) {
      return {
        type: 'improvement',
        message: "Great improvement! You're tracking more frequently than before.",
        icon: 'trending-up',
      };
    }

    return null;
  }

  /**
   * Get empty result for no data
   * @returns {Object} Empty progress result
   */
  getEmptyResult() {
    return {
      hasProgress: false,
      insights: [],
    };
  }
}

export default new ProgressAnalyzer();

