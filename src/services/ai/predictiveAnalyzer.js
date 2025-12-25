import {
  calculateHoursDifference,
  calculateDaysDifference,
} from "../../utils/aiHelpers";

/**
 * Predictive Analyzer Service
 * Predicts streak breaks and suggests preventive actions
 */
class PredictiveAnalyzer {
  /**
   * Analyze and predict potential issues
   * @param {Array} entries - Array of habit entries
   * @param {Object} habit - Habit object
   * @returns {Object} Predictive analysis result
   */
  async analyze(entries, habit) {
    if (!Array.isArray(entries) || entries.length === 0) {
      return this.getDefaultResult();
    }

    const sortedEntries = [...entries].sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    );

    const predictions = {
      streakRisk: this.assessStreakRisk(sortedEntries),
      optimalNextTime: this.predictOptimalNextTime(sortedEntries),
      successProbability: this.calculateSuccessProbability(sortedEntries),
      potentialBreakPoints: this.identifyPotentialBreakPoints(sortedEntries),
    };

    const alerts = this.generateAlerts(predictions, sortedEntries);
    const suggestions = this.generatePredictiveSuggestions(
      predictions,
      sortedEntries
    );

    return {
      hasPredictions: true,
      predictions,
      alerts,
      suggestions,
    };
  }

  /**
   * Assess risk of breaking streak
   * @param {Array} sortedEntries - Entries sorted by date (newest first)
   * @returns {Object} Streak risk assessment
   */
  assessStreakRisk(sortedEntries) {
    if (sortedEntries.length === 0) {
      return { level: "high", score: 0.9, message: "No entries yet" };
    }

    const lastEntryDate = new Date(
      sortedEntries[0].createdAt || sortedEntries[0].date
    );
    const now = new Date();
    const hoursSinceLastEntry = calculateHoursDifference(lastEntryDate, now);
    const daysSinceLastEntry = calculateDaysDifference(lastEntryDate, now);

    // Calculate average interval between entries
    let averageIntervalHours = 24;
    if (sortedEntries.length > 1) {
      const intervals = [];
      for (let i = 0; i < Math.min(7, sortedEntries.length - 1); i++) {
        const currDate = new Date(
          sortedEntries[i].createdAt || sortedEntries[i].date
        );
        const nextDate = new Date(
          sortedEntries[i + 1].createdAt || sortedEntries[i + 1].date
        );
        intervals.push(calculateHoursDifference(nextDate, currDate));
      }
      averageIntervalHours =
        intervals.reduce((a, b) => a + b, 0) / intervals.length;
    }

    // Risk assessment
    let riskLevel = "low";
    let riskScore = 0.2;
    let message = "Streak is safe";

    if (daysSinceLastEntry >= 2) {
      riskLevel = "high";
      riskScore = 0.9;
      message = "Streak is at high risk - track now to maintain it!";
    } else if (hoursSinceLastEntry > averageIntervalHours * 1.5) {
      riskLevel = "medium";
      riskScore = 0.6;
      message = "You're past your usual tracking time - consider tracking soon";
    } else if (hoursSinceLastEntry > 36) {
      riskLevel = "medium";
      riskScore = 0.5;
      message = "Reminder: It's been over 36 hours since your last entry";
    }

    return {
      level: riskLevel,
      score: riskScore,
      message,
      hoursSinceLastEntry,
      daysSinceLastEntry,
      averageIntervalHours,
    };
  }

  /**
   * Predict optimal next tracking time
   * @param {Array} sortedEntries - Entries sorted by date
   * @returns {Object} Optimal time prediction
   */
  predictOptimalNextTime(sortedEntries) {
    if (sortedEntries.length < 2) {
      return null;
    }

    // Find most common hour of tracking
    const hours = sortedEntries
      .slice(0, Math.min(14, sortedEntries.length))
      .map((entry) => {
        const date = new Date(entry.createdAt || entry.date);
        return date.getHours();
      });

    const hourFrequency = {};
    hours.forEach((hour) => {
      hourFrequency[hour] = (hourFrequency[hour] || 0) + 1;
    });

    const mostCommonHourEntry = Object.entries(hourFrequency).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );
    const mostCommonHour = mostCommonHourEntry ? mostCommonHourEntry[0] : 12;

    // Calculate next optimal time (same hour, next day if past, or today if not)
    const now = new Date();
    const optimalTime = new Date();
    optimalTime.setHours(parseInt(mostCommonHour), 0, 0, 0);

    if (optimalTime <= now) {
      optimalTime.setDate(optimalTime.getDate() + 1);
    }

    return {
      hour: parseInt(mostCommonHour),
      date: optimalTime,
      confidence: mostCommonHourEntry[1] / hours.length,
    };
  }

  /**
   * Calculate probability of habit success
   * @param {Array} sortedEntries - Entries sorted by date
   * @returns {Object} Success probability assessment
   */
  calculateSuccessProbability(sortedEntries) {
    if (sortedEntries.length < 3) {
      return { probability: 0.5, confidence: 0.3, message: "Need more data" };
    }

    // Factors for success probability:
    // 1. Recent consistency (last 7 days)
    const last7Days = sortedEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt || entry.date);
      const daysAgo = (new Date() - entryDate) / (1000 * 60 * 60 * 24);
      return daysAgo <= 7;
    });

    const uniqueDays = new Set(
      last7Days.map((entry) => {
        const date = new Date(entry.createdAt || entry.date);
        return date.toDateString();
      })
    ).size;

    const recentConsistency = uniqueDays / 7;

    // 2. Overall duration (longer = more likely to stick)
    const firstEntry = sortedEntries[sortedEntries.length - 1];
    const firstDate = new Date(firstEntry.createdAt || firstEntry.date);
    const daysSinceFirst = (new Date() - firstDate) / (1000 * 60 * 60 * 24);
    const durationFactor = Math.min(daysSinceFirst / 30, 1); // Max at 30 days

    // 3. Trend (improving = better)
    const recentCount = last7Days.length;
    const previous7Days = sortedEntries.slice(7, 14).filter((entry) => {
      const entryDate = new Date(entry.createdAt || entry.date);
      const daysAgo = (new Date() - entryDate) / (1000 * 60 * 60 * 24);
      return daysAgo > 7 && daysAgo <= 14;
    }).length;

    const trendFactor = recentCount >= previous7Days ? 1.0 : 0.7;

    // Calculate overall probability
    const probability =
      recentConsistency * 0.5 + durationFactor * 0.3 + trendFactor * 0.2;

    let message = "On track for success!";
    if (probability < 0.4) {
      message = "Need to improve consistency to succeed";
    } else if (probability < 0.7) {
      message = "Good progress, keep it up!";
    }

    return {
      probability,
      confidence: Math.min(sortedEntries.length / 20, 1),
      message,
      factors: {
        recentConsistency,
        duration: daysSinceFirst,
        trend: recentCount >= previous7Days ? "improving" : "declining",
      },
    };
  }

  /**
   * Identify potential break points (days where tracking might fail)
   * @param {Array} sortedEntries - Entries sorted by date
   * @returns {Array} Potential break point warnings
   */
  identifyPotentialBreakPoints(sortedEntries) {
    const warnings = [];

    // Check for gaps in tracking
    for (let i = 0; i < Math.min(sortedEntries.length - 1, 14); i++) {
      const currDate = new Date(
        sortedEntries[i].createdAt || sortedEntries[i].date
      );
      const nextDate = new Date(
        sortedEntries[i + 1].createdAt || sortedEntries[i + 1].date
      );
      const daysGap = calculateDaysDifference(currDate, nextDate);

      if (daysGap > 2) {
        warnings.push({
          type: "gap",
          days: daysGap,
          date: nextDate,
          message: `There was a ${daysGap}-day gap in tracking`,
        });
      }
    }

    return warnings;
  }

  /**
   * Generate alerts based on predictions
   * @param {Object} predictions - Prediction results
   * @param {Array} sortedEntries - Entries sorted by date
   * @returns {Array} Alert objects
   */
  generateAlerts(predictions, sortedEntries) {
    const alerts = [];

    // Streak risk alert
    if (predictions.streakRisk.level === "high") {
      alerts.push({
        type: "urgent",
        icon: "warning",
        title: "Streak at Risk",
        message: predictions.streakRisk.message,
        action: "Track now",
      });
    } else if (predictions.streakRisk.level === "medium") {
      alerts.push({
        type: "warning",
        icon: "alert-circle",
        title: "Reminder",
        message: predictions.streakRisk.message,
        action: "Track soon",
      });
    }

    // Success probability alert
    if (
      predictions.successProbability.probability < 0.4 &&
      sortedEntries.length >= 7
    ) {
      alerts.push({
        type: "info",
        icon: "information-circle",
        title: "Consistency Needed",
        message: predictions.successProbability.message,
        action: "View tips",
      });
    }

    return alerts;
  }

  /**
   * Generate predictive suggestions
   * @param {Object} predictions - Prediction results
   * @param {Array} sortedEntries - Entries sorted by date
   * @returns {Array} Suggestion objects
   */
  generatePredictiveSuggestions(predictions, sortedEntries) {
    const suggestions = [];

    // Optimal time suggestion
    if (
      predictions.optimalNextTime &&
      predictions.optimalNextTime.confidence > 0.3
    ) {
      const optimalDate = predictions.optimalNextTime.date;
      const timeStr = optimalDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      suggestions.push({
        type: "optimal_time",
        icon: "time",
        title: "Best Time to Track",
        message: `Based on your patterns, try tracking around ${timeStr} for better consistency`,
      });
    }

    // Risk mitigation suggestion
    if (
      predictions.streakRisk.level === "medium" ||
      predictions.streakRisk.level === "high"
    ) {
      suggestions.push({
        type: "prevent_break",
        icon: "shield-checkmark",
        title: "Protect Your Streak",
        message:
          "Track now to prevent breaking your streak and maintain momentum",
      });
    }

    return suggestions;
  }

  /**
   * Get default result for insufficient data
   * @returns {Object} Default predictive result
   */
  getDefaultResult() {
    return {
      hasPredictions: false,
      predictions: null,
      alerts: [],
      suggestions: [],
    };
  }
}

export default new PredictiveAnalyzer();
