import { calculateHoursDifference } from "../../utils/aiHelpers";

/**
 * Pattern Analyzer Service
 * Analyzes tracking patterns to detect optimal times and patterns
 */
class PatternAnalyzer {
  /**
   * Analyze tracking patterns
   * @param {Array} entries - Array of habit entries
   * @returns {Object} Pattern analysis result
   */
  async analyze(entries) {
    if (!Array.isArray(entries) || entries.length < 3) {
      return this.getDefaultResult();
    }

    const patterns = {
      timeOfDay: this.analyzeTimeOfDayPattern(entries),
      dayOfWeek: this.analyzeDayOfWeekPattern(entries),
      trackingFrequency: this.analyzeTrackingFrequency(entries),
      optimalTimes: this.detectOptimalTimes(entries),
      consistencyPatterns: this.analyzeConsistencyPatterns(entries),
    };

    const insights = this.generatePatternInsights(patterns);
    const recommendations = this.generateRecommendations(patterns);

    return {
      hasPatterns: true,
      patterns,
      insights,
      recommendations,
    };
  }

  /**
   * Analyze time of day patterns
   * @param {Array} entries - Entries array
   * @returns {Object} Time of day analysis
   */
  analyzeTimeOfDayPattern(entries) {
    const timeSlots = {
      earlyMorning: 0, // 5-8
      morning: 0, // 8-12
      afternoon: 0, // 12-17
      evening: 0, // 17-21
      night: 0, // 21-5
    };

    entries.forEach((entry) => {
      const date = new Date(entry.createdAt || entry.date);
      const hour = date.getHours();

      if (hour >= 5 && hour < 8) timeSlots.earlyMorning++;
      else if (hour >= 8 && hour < 12) timeSlots.morning++;
      else if (hour >= 12 && hour < 17) timeSlots.afternoon++;
      else if (hour >= 17 && hour < 21) timeSlots.evening++;
      else timeSlots.night++;
    });

    const mostFrequent = Object.entries(timeSlots).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );

    return {
      distribution: timeSlots,
      mostFrequent: mostFrequent[0],
      confidence: mostFrequent[1] / entries.length,
    };
  }

  /**
   * Analyze day of week patterns
   * @param {Array} entries - Entries array
   * @returns {Object} Day of week analysis
   */
  analyzeDayOfWeekPattern(entries) {
    const dayCounts = {
      sunday: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
    };

    entries.forEach((entry) => {
      const date = new Date(entry.createdAt || entry.date);
      const dayName = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ][date.getDay()];
      dayCounts[dayName]++;
    });

    const sortedDays = Object.entries(dayCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      distribution: dayCounts,
      topDays: sortedDays.map(([day]) => day),
      averagePerDay: entries.length / 7,
    };
  }

  /**
   * Analyze tracking frequency patterns
   * @param {Array} entries - Entries array
   * @returns {Object} Frequency analysis
   */
  analyzeTrackingFrequency(entries) {
    const sortedEntries = [...entries].sort(
      (a, b) =>
        new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date)
    );

    if (sortedEntries.length < 2) {
      return { averageInterval: 0, regularity: 0 };
    }

    const intervals = [];
    for (let i = 1; i < sortedEntries.length; i++) {
      const prevDate = new Date(
        sortedEntries[i - 1].createdAt || sortedEntries[i - 1].date
      );
      const currDate = new Date(
        sortedEntries[i].createdAt || sortedEntries[i].date
      );
      const hoursDiff = calculateHoursDifference(prevDate, currDate);
      intervals.push(hoursDiff);
    }

    const averageInterval =
      intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance =
      intervals.reduce(
        (sum, interval) => sum + Math.pow(interval - averageInterval, 2),
        0
      ) / intervals.length;
    const regularity = Math.max(
      0,
      1 - variance / (averageInterval * averageInterval)
    );

    return {
      averageInterval,
      regularity,
      isRegular: regularity > 0.6,
    };
  }

  /**
   * Detect optimal tracking times
   * @param {Array} entries - Entries array
   * @returns {Array} Optimal time recommendations
   */
  detectOptimalTimes(entries) {
    const timePattern = this.analyzeTimeOfDayPattern(entries);
    const dayPattern = this.analyzeDayOfWeekPattern(entries);

    const recommendations = [];

    if (timePattern.confidence > 0.5) {
      const timeLabels = {
        earlyMorning: "Early Morning (5-8 AM)",
        morning: "Morning (8 AM-12 PM)",
        afternoon: "Afternoon (12-5 PM)",
        evening: "Evening (5-9 PM)",
        night: "Night (9 PM-5 AM)",
      };

      recommendations.push({
        type: "optimal_time",
        message: `You're most consistent when tracking in the ${
          timeLabels[timePattern.mostFrequent]
        }`,
        timeSlot: timePattern.mostFrequent,
        confidence: timePattern.confidence,
      });
    }

    return recommendations;
  }

  /**
   * Analyze consistency patterns
   * @param {Array} entries - Entries array
   * @returns {Object} Consistency pattern analysis
   */
  analyzeConsistencyPatterns(entries) {
    const sortedEntries = [...entries].sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    );

    // Check last 7 days for consistency
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

    return {
      last7DaysCount: uniqueDays,
      consistency: uniqueDays / 7,
      isConsistent: uniqueDays >= 5,
    };
  }

  /**
   * Generate pattern insights
   * @param {Object} patterns - Pattern analysis results
   * @returns {Array} Array of insight objects
   */
  generatePatternInsights(patterns) {
    const insights = [];

    // Time of day insight
    if (patterns.timeOfDay.confidence > 0.4) {
      const timeLabels = {
        earlyMorning: "early morning",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      };

      insights.push({
        type: "pattern",
        icon: "time",
        message: `You typically track in the ${
          timeLabels[patterns.timeOfDay.mostFrequent]
        } (${Math.round(patterns.timeOfDay.confidence * 100)}% of the time)`,
      });
    }

    // Day of week insight
    if (patterns.dayOfWeek.topDays.length > 0) {
      const topDay = patterns.dayOfWeek.topDays[0];
      insights.push({
        type: "pattern",
        icon: "calendar",
        message: `Your most active tracking day is ${
          topDay.charAt(0).toUpperCase() + topDay.slice(1)
        }`,
      });
    }

    // Frequency insight
    if (patterns.trackingFrequency.isRegular) {
      insights.push({
        type: "success",
        icon: "checkmark-circle",
        message: `Great regularity! You track approximately every ${Math.round(
          patterns.trackingFrequency.averageInterval / 24
        )} days`,
      });
    }

    // Consistency insight
    if (patterns.consistencyPatterns.isConsistent) {
      insights.push({
        type: "success",
        icon: "flame",
        message: `Strong recent consistency: ${patterns.consistencyPatterns.last7DaysCount} days tracked in the last week!`,
      });
    }

    return insights;
  }

  /**
   * Generate recommendations based on patterns
   * @param {Object} patterns - Pattern analysis results
   * @returns {Array} Array of recommendation objects
   */
  generateRecommendations(patterns) {
    const recommendations = [];

    // If not consistent, recommend establishing a routine
    if (!patterns.consistencyPatterns.isConsistent) {
      if (patterns.timeOfDay.confidence > 0.3) {
        const timeLabels = {
          earlyMorning: "early morning",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night",
        };

        recommendations.push({
          type: "routine",
          title: "Establish a Routine",
          message: `Try tracking at the same time each day. You've had success in the ${
            timeLabels[patterns.timeOfDay.mostFrequent]
          }.`,
          icon: "alarm",
        });
      }
    }

    // If tracking is irregular, suggest consistency
    if (
      !patterns.trackingFrequency.isRegular &&
      patterns.trackingFrequency.averageInterval > 0
    ) {
      recommendations.push({
        type: "consistency",
        title: "Improve Regularity",
        message:
          "Try to maintain a more regular tracking schedule. Consistency helps build habits faster.",
        icon: "repeat",
      });
    }

    return recommendations;
  }

  /**
   * Get default result for insufficient data
   * @returns {Object} Default pattern result
   */
  getDefaultResult() {
    return {
      hasPatterns: false,
      patterns: null,
      insights: [],
      recommendations: [],
    };
  }
}

export default new PatternAnalyzer();
