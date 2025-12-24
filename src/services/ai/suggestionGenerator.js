import {
  CONSISTENCY_SCORES,
  TIME_THRESHOLDS,
} from '../../constants/aiConfig';
import { calculateHoursDifference } from '../../utils/aiHelpers';
import consistencyAnalyzer from './consistencyAnalyzer';

/**
 * Suggestion Generator Service
 * Generates smart suggestions based on habit patterns
 */
class SuggestionGenerator {
  /**
   * Generate smart suggestions for a habit
   * @param {Object} habit - Habit object
   * @param {Array} entries - Array of entries
   * @returns {Promise<Array>} Array of suggestion objects
   */
  async generate(habit, entries) {
    // Ensure entries is an array
    if (!Array.isArray(entries)) {
      return [];
    }

    const suggestions = [];

    // Consistency-based suggestions
    const consistencySuggestions = await this.generateConsistencySuggestions(
      entries
    );
    if (Array.isArray(consistencySuggestions)) {
      suggestions.push(...consistencySuggestions);
    }

    // Timing-based suggestions
    const timingSuggestions = this.generateTimingSuggestions(habit, entries);
    if (Array.isArray(timingSuggestions)) {
      suggestions.push(...timingSuggestions);
    }

    // Milestone-based suggestions
    const milestoneSuggestions = await this.generateMilestoneSuggestions(
      entries
    );
    if (Array.isArray(milestoneSuggestions)) {
      suggestions.push(...milestoneSuggestions);
    }

    return suggestions;
  }

  /**
   * Generate consistency-related suggestions
   * @param {Array} entries - Entries array
   * @returns {Promise<Array>} Consistency suggestions
   */
  async generateConsistencySuggestions(entries) {
    const suggestions = [];
    const consistency = await consistencyAnalyzer.analyze(entries);

    if (consistency.score < CONSISTENCY_SCORES.GOOD) {
      suggestions.push({
        type: 'consistency',
        title: 'Improve Consistency',
        message:
          'Try to track your habit at the same time every day. Consistency is key!',
        action: 'Set a daily reminder',
        icon: 'time',
      });
    }

    return suggestions;
  }

  /**
   * Generate timing-based suggestions
   * @param {Object} habit - Habit object
   * @param {Array} entries - Entries array
   * @returns {Array} Timing suggestions
   */
  generateTimingSuggestions(habit, entries) {
    const suggestions = [];

    if (!Array.isArray(entries) || entries.length === 0) {
      return suggestions;
    }

    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const lastEntry = sortedEntries[0];
    const lastEntryDate = new Date(lastEntry.date);
    const hoursSinceLastEntry = calculateHoursDifference(lastEntryDate, new Date());

    if (
      hoursSinceLastEntry > TIME_THRESHOLDS.HOURS_FOR_REMINDER &&
      hoursSinceLastEntry < TIME_THRESHOLDS.MAX_REMINDER_HOURS
    ) {
      suggestions.push({
        type: 'reminder',
        title: 'Time to Track!',
        message: `You haven't tracked "${habit.name}" today. Capture a photo to keep your streak going!`,
        action: 'Capture now',
        icon: 'camera',
      });
    }

    return suggestions;
  }

  /**
   * Generate milestone-based suggestions
   * @param {Array} entries - Entries array
   * @returns {Promise<Array>} Milestone suggestions
   */
  async generateMilestoneSuggestions(entries) {
    const suggestions = [];

    if (entries.length < 7) {
      return suggestions;
    }

    const consistency = await consistencyAnalyzer.analyze(entries);

    if (consistency.score >= CONSISTENCY_SCORES.EXCELLENT) {
      suggestions.push({
        type: 'milestone',
        title: "You're Doing Great!",
        message:
          "You've maintained excellent consistency. Consider adding a related habit to build on this success!",
        action: 'Explore habits',
        icon: 'sparkles',
      });
    }

    return suggestions;
  }
}

export default new SuggestionGenerator();

