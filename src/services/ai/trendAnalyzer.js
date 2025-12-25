import { getRecentEntries, sortEntriesByDateAsc } from "../../utils/aiHelpers";

/**
 * Trend Analyzer Service
 * Advanced trend analysis with week-over-week comparisons
 */
class TrendAnalyzer {
  /**
   * Analyze trends in habit tracking
   * @param {Array} entries - Array of habit entries
   * @returns {Object} Trend analysis result
   */
  async analyze(entries) {
    if (!Array.isArray(entries) || entries.length < 4) {
      return this.getDefaultResult();
    }

    const sortedEntries = sortEntriesByDateAsc(entries);

    const trends = {
      overall: this.analyzeOverallTrend(sortedEntries),
      weekly: this.analyzeWeeklyTrends(sortedEntries),
      monthly: this.analyzeMonthlyTrends(sortedEntries),
      momentum: this.calculateMomentum(sortedEntries),
      comparison: this.comparePeriods(sortedEntries),
    };

    const insights = this.generateTrendInsights(trends);
    const forecasts = this.generateForecasts(trends);

    return {
      hasTrends: true,
      trends,
      insights,
      forecasts,
    };
  }

  /**
   * Analyze overall trend
   * @param {Array} sortedEntries - Entries sorted by date ascending
   * @returns {Object} Overall trend analysis
   */
  analyzeOverallTrend(sortedEntries) {
    if (sortedEntries.length < 7) {
      return { direction: "neutral", strength: 0, description: "Need more data" };
    }

    // Compare first half vs second half
    const midpoint = Math.floor(sortedEntries.length / 2);
    const firstHalf = sortedEntries.slice(0, midpoint);
    const secondHalf = sortedEntries.slice(midpoint);

    const firstHalfRate = firstHalf.length / midpoint;
    const secondHalfRate = secondHalf.length / secondHalf.length;

    const difference = secondHalfRate - firstHalfRate;
    const direction = difference > 0.1 ? "improving" : difference < -0.1 ? "declining" : "stable";
    const strength = Math.abs(difference);

    return {
      direction,
      strength,
      description: this.getTrendDescription(direction, strength),
      firstHalfRate,
      secondHalfRate,
    };
  }

  /**
   * Analyze weekly trends
   * @param {Array} sortedEntries - Entries sorted by date ascending
   * @returns {Object} Weekly trend analysis
   */
  analyzeWeeklyTrends(sortedEntries) {
    const now = new Date();
    const weeks = [];

    // Get last 4 weeks
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const weekEntries = sortedEntries.filter((entry) => {
        const entryDate = new Date(entry.createdAt || entry.date);
        return entryDate >= weekStart && entryDate < weekEnd;
      });

      weeks.unshift({
        week: i + 1,
        date: weekStart,
        count: weekEntries.length,
        uniqueDays: new Set(
          weekEntries.map((e) => {
            const d = new Date(e.createdAt || e.date);
            return d.toDateString();
          })
        ).size,
      });
    }

    // Calculate trend
    if (weeks.length >= 2) {
      const recent = weeks.slice(-2);
      const trend = recent[1].count - recent[0].count;
      const trendPercent = recent[0].count > 0 ? (trend / recent[0].count) * 100 : 0;

      return {
        weeks,
        trend,
        trendPercent,
        isImproving: trend > 0,
        averagePerWeek: weeks.reduce((sum, w) => sum + w.count, 0) / weeks.length,
      };
    }

    return { weeks, trend: 0, isImproving: false };
  }

  /**
   * Analyze monthly trends
   * @param {Array} sortedEntries - Entries sorted by date ascending
   * @returns {Object} Monthly trend analysis
   */
  analyzeMonthlyTrends(sortedEntries) {
    const now = new Date();
    const months = [];

    // Get last 3 months
    for (let i = 0; i < 3; i++) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const monthEntries = sortedEntries.filter((entry) => {
        const entryDate = new Date(entry.createdAt || entry.date);
        return entryDate >= monthStart && entryDate < monthEnd;
      });

      months.unshift({
        month: monthStart.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        count: monthEntries.length,
        uniqueDays: new Set(
          monthEntries.map((e) => {
            const d = new Date(e.createdAt || e.date);
            return d.toDateString();
          })
        ).size,
      });
    }

    return {
      months,
      averagePerMonth: months.reduce((sum, m) => sum + m.count, 0) / months.length,
    };
  }

  /**
   * Calculate momentum (recent activity trend)
   * @param {Array} sortedEntries - Entries sorted by date ascending
   * @returns {Object} Momentum analysis
   */
  calculateMomentum(sortedEntries) {
    if (sortedEntries.length < 14) {
      return { score: 0.5, level: "neutral" };
    }

    const last14Days = sortedEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt || entry.date);
      const daysAgo = (new Date() - entryDate) / (1000 * 60 * 60 * 24);
      return daysAgo <= 14;
    });

    const firstWeek = last14Days.filter((entry) => {
      const entryDate = new Date(entry.createdAt || entry.date);
      const daysAgo = (new Date() - entryDate) / (1000 * 60 * 60 * 24);
      return daysAgo > 7 && daysAgo <= 14;
    });

    const secondWeek = last14Days.filter((entry) => {
      const entryDate = new Date(entry.createdAt || entry.date);
      const daysAgo = (new Date() - entryDate) / (1000 * 60 * 60 * 24);
      return daysAgo <= 7;
    });

    const momentum = (secondWeek.length - firstWeek.length) / 7; // Normalize
    const score = Math.max(0, Math.min(1, 0.5 + momentum / 2));

    let level = "neutral";
    if (score > 0.7) level = "strong";
    else if (score > 0.6) level = "positive";
    else if (score < 0.4) level = "negative";
    else if (score < 0.3) level = "weak";

    return {
      score,
      level,
      description: `Momentum is ${level}`,
      change: secondWeek.length - firstWeek.length,
    };
  }

  /**
   * Compare different time periods
   * @param {Array} sortedEntries - Entries sorted by date ascending
   * @returns {Object} Period comparison
   */
  comparePeriods(sortedEntries) {
    const now = new Date();

    // This week vs last week
    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(thisWeekStart.getDate() - now.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const thisWeek = sortedEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt || entry.date);
      return entryDate >= thisWeekStart;
    });

    const lastWeek = sortedEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt || entry.date);
      return entryDate >= lastWeekStart && entryDate < thisWeekStart;
    });

    const change = thisWeek.length - lastWeek.length;
    const changePercent = lastWeek.length > 0 ? (change / lastWeek.length) * 100 : 0;

    return {
      thisWeek: thisWeek.length,
      lastWeek: lastWeek.length,
      change,
      changePercent,
      isBetter: change > 0,
    };
  }

  /**
   * Generate trend insights
   * @param {Object} trends - Trend analysis results
   * @returns {Array} Insight objects
   */
  generateTrendInsights(trends) {
    const insights = [];

    // Overall trend insight
    if (trends.overall.direction !== "neutral") {
      insights.push({
        type: trends.overall.direction === "improving" ? "success" : "warning",
        icon: trends.overall.direction === "improving" ? "trending-up" : "trending-down",
        message: `Overall trend: ${trends.overall.description}`,
      });
    }

    // Weekly comparison insight
    if (trends.comparison.thisWeek > 0 || trends.comparison.lastWeek > 0) {
      const comparison = trends.comparison;
      if (comparison.isBetter) {
        insights.push({
          type: "success",
          icon: "arrow-up",
          message: `This week: ${comparison.thisWeek} entries (${comparison.change > 0 ? "+" : ""}${comparison.change} vs last week)`,
        });
      } else if (comparison.change < 0) {
        insights.push({
          type: "info",
          icon: "arrow-down",
          message: `This week: ${comparison.thisWeek} entries (${comparison.change} vs last week)`,
        });
      }
    }

    // Momentum insight
    if (trends.momentum.level !== "neutral") {
      insights.push({
        type: trends.momentum.score > 0.5 ? "success" : "warning",
        icon: "speedometer",
        message: trends.momentum.description,
      });
    }

    return insights;
  }

  /**
   * Generate forecasts based on trends
   * @param {Object} trends - Trend analysis results
   * @returns {Array} Forecast objects
   */
  generateForecasts(trends) {
    const forecasts = [];

    if (trends.weekly.averagePerWeek > 0) {
      const projectedNextWeek = Math.round(trends.weekly.averagePerWeek);
      forecasts.push({
        type: "projection",
        icon: "calendar",
        message: `Based on your trend, you're on track for ~${projectedNextWeek} entries next week`,
      });
    }

    return forecasts;
  }

  /**
   * Get trend description
   * @param {string} direction - Trend direction
   * @param {number} strength - Trend strength
   * @returns {string} Description
   */
  getTrendDescription(direction, strength) {
    const strengthLabel = strength > 0.3 ? "strongly" : strength > 0.15 ? "" : "slightly";
    return `${strengthLabel} ${direction}`.trim();
  }

  /**
   * Get default result for insufficient data
   * @returns {Object} Default trend result
   */
  getDefaultResult() {
    return {
      hasTrends: false,
      trends: null,
      insights: [],
      forecasts: [],
    };
  }
}

export default new TrendAnalyzer();

