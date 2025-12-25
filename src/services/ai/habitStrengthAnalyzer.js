import consistencyAnalyzer from "./consistencyAnalyzer";
import { getRecentEntries } from "../../utils/aiHelpers";

/**
 * Habit Strength Analyzer Service
 * Calculates a comprehensive habit strength score
 */
class HabitStrengthAnalyzer {
  /**
   * Analyze habit strength
   * @param {Array} entries - Array of habit entries
   * @returns {Object} Habit strength analysis
   */
  async analyze(entries) {
    if (!Array.isArray(entries) || entries.length === 0) {
      return this.getDefaultResult();
    }

    const sortedEntries = [...entries].sort(
      (a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date)
    );

    const factors = {
      consistency: await this.calculateConsistencyFactor(entries),
      duration: this.calculateDurationFactor(sortedEntries),
      recency: this.calculateRecencyFactor(sortedEntries),
      frequency: this.calculateFrequencyFactor(sortedEntries),
      stability: this.calculateStabilityFactor(sortedEntries),
    };

    const strengthScore = this.calculateStrengthScore(factors);
    const level = this.getStrengthLevel(strengthScore);
    const insights = this.generateStrengthInsights(factors, strengthScore, level);

    return {
      score: strengthScore,
      level,
      factors,
      insights,
      description: this.getStrengthDescription(level),
    };
  }

  /**
   * Calculate consistency factor (0-1)
   * @param {Array} entries - Entries array
   * @returns {Promise<number>} Consistency factor
   */
  async calculateConsistencyFactor(entries) {
    const consistency = await consistencyAnalyzer.analyze(entries);
    return consistency.score || 0;
  }

  /**
   * Calculate duration factor (0-1)
   * Longer duration = stronger habit
   * @param {Array} sortedEntries - Sorted entries
   * @returns {number} Duration factor
   */
  calculateDurationFactor(sortedEntries) {
    if (sortedEntries.length === 0) return 0;

    const firstDate = new Date(sortedEntries[0].createdAt || sortedEntries[0].date);
    const daysSinceFirst = (new Date() - firstDate) / (1000 * 60 * 60 * 24);

    // Normalize: 30 days = 0.5, 90 days = 1.0
    return Math.min(daysSinceFirst / 90, 1.0);
  }

  /**
   * Calculate recency factor (0-1)
   * Recent activity = stronger habit
   * @param {Array} sortedEntries - Sorted entries
   * @returns {number} Recency factor
   */
  calculateRecencyFactor(sortedEntries) {
    if (sortedEntries.length === 0) return 0;

    const lastEntry = sortedEntries[sortedEntries.length - 1];
    const lastDate = new Date(lastEntry.createdAt || lastEntry.date);
    const hoursSinceLast = (new Date() - lastDate) / (1000 * 60 * 60);

    // Less than 24 hours = 1.0, 48 hours = 0.5, 7 days = 0
    if (hoursSinceLast <= 24) return 1.0;
    if (hoursSinceLast <= 48) return 0.75;
    if (hoursSinceLast <= 72) return 0.5;
    if (hoursSinceLast <= 168) return 0.25; // 7 days
    return Math.max(0, 1 - hoursSinceLast / 336); // Decay over 2 weeks
  }

  /**
   * Calculate frequency factor (0-1)
   * More frequent = stronger habit
   * @param {Array} sortedEntries - Sorted entries
   * @returns {number} Frequency factor
   */
  calculateFrequencyFactor(sortedEntries) {
    if (sortedEntries.length < 2) return 0.3;

    const firstDate = new Date(sortedEntries[0].createdAt || sortedEntries[0].date);
    const lastDate = new Date(
      sortedEntries[sortedEntries.length - 1].createdAt ||
        sortedEntries[sortedEntries.length - 1].date
    );
    const totalDays = Math.max(
      1,
      (lastDate - firstDate) / (1000 * 60 * 60 * 24)
    );

    // Entries per day (normalized: 1 per day = 1.0, 0.5 per day = 0.5)
    const entriesPerDay = sortedEntries.length / totalDays;
    return Math.min(entriesPerDay, 1.0);
  }

  /**
   * Calculate stability factor (0-1)
   * Stable pattern = stronger habit
   * @param {Array} sortedEntries - Sorted entries
   * @returns {number} Stability factor
   */
  calculateStabilityFactor(sortedEntries) {
    if (sortedEntries.length < 7) return 0.5;

    const recentEntries = getRecentEntries(sortedEntries, 14);
    if (recentEntries.length < 7) return 0.5;

    // Calculate variance in intervals
    const intervals = [];
    for (let i = 1; i < recentEntries.length; i++) {
      const prevDate = new Date(
        recentEntries[i - 1].createdAt || recentEntries[i - 1].date
      );
      const currDate = new Date(recentEntries[i].createdAt || recentEntries[i].date);
      const hours = (currDate - prevDate) / (1000 * 60 * 60);
      intervals.push(hours);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance =
      intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) /
      intervals.length;

    // Lower variance = higher stability
    // Normalize: variance of 0 = 1.0, variance of avgInterval = 0.5
    const stability = Math.max(0, 1 - variance / (avgInterval * avgInterval * 2));
    return stability;
  }

  /**
   * Calculate overall strength score
   * @param {Object} factors - All strength factors
   * @returns {number} Strength score (0-1)
   */
  calculateStrengthScore(factors) {
    // Weighted average with recency being most important
    return (
      factors.consistency * 0.25 +
      factors.duration * 0.2 +
      factors.recency * 0.3 +
      factors.frequency * 0.15 +
      factors.stability * 0.1
    );
  }

  /**
   * Get strength level based on score
   * @param {number} score - Strength score
   * @returns {string} Strength level
   */
  getStrengthLevel(score) {
    if (score >= 0.8) return "very_strong";
    if (score >= 0.65) return "strong";
    if (score >= 0.5) return "moderate";
    if (score >= 0.35) return "developing";
    return "weak";
  }

  /**
   * Get strength description
   * @param {string} level - Strength level
   * @returns {string} Description
   */
  getStrengthDescription(level) {
    const descriptions = {
      very_strong: "This habit is deeply ingrained and part of your routine!",
      strong: "Great habit strength! You're maintaining it well.",
      moderate: "Good progress! The habit is developing nicely.",
      developing: "The habit is forming. Keep up the consistency!",
      weak: "Early stages. Focus on consistency to strengthen this habit.",
    };
    return descriptions[level] || descriptions.developing;
  }

  /**
   * Generate strength insights
   * @param {Object} factors - Strength factors
   * @param {number} score - Overall score
   * @param {string} level - Strength level
   * @returns {Array} Insight objects
   */
  generateStrengthInsights(factors, score, level) {
    const insights = [];

    // Overall insight
    insights.push({
      type: "strength",
      icon: this.getStrengthIcon(level),
      message: `Habit Strength: ${this.getStrengthLabel(level)} (${Math.round(score * 100)}%)`,
    });

    // Factor-specific insights
    if (factors.recency < 0.5) {
      insights.push({
        type: "warning",
        icon: "time",
        message: "Track more recently to maintain habit strength",
      });
    }

    if (factors.duration < 0.3 && score > 0.5) {
      insights.push({
        type: "info",
        icon: "calendar",
        message: "With more time, this habit will become even stronger",
      });
    }

    if (factors.stability < 0.5 && factors.frequency > 0.7) {
      insights.push({
        type: "suggestion",
        icon: "repeat",
        message: "Try tracking at consistent times for better stability",
      });
    }

    return insights;
  }

  /**
   * Get strength icon
   * @param {string} level - Strength level
   * @returns {string} Icon name
   */
  getStrengthIcon(level) {
    const icons = {
      very_strong: "diamond",
      strong: "trophy",
      moderate: "star",
      developing: "leaf",
      weak: "seed",
    };
    return icons[level] || "leaf";
  }

  /**
   * Get strength label
   * @param {string} level - Strength level
   * @returns {string} Label
   */
  getStrengthLabel(level) {
    const labels = {
      very_strong: "Very Strong",
      strong: "Strong",
      moderate: "Moderate",
      developing: "Developing",
      weak: "Weak",
    };
    return labels[level] || "Developing";
  }

  /**
   * Get default result
   * @returns {Object} Default result
   */
  getDefaultResult() {
    return {
      score: 0,
      level: "weak",
      factors: {
        consistency: 0,
        duration: 0,
        recency: 0,
        frequency: 0,
        stability: 0,
      },
      insights: [],
      description: "Start tracking to build habit strength",
    };
  }
}

export default new HabitStrengthAnalyzer();

