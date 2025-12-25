import { aiService } from "../ai";

/**
 * Habit Insights Loader
 * Handles loading AI insights for multiple habits
 */
export class HabitInsightsLoader {
  /**
   * Load insights for a single habit
   * @param {Object} habit - Habit object
   * @param {Array} habitEntries - Entries for this habit
   * @returns {Promise<Object|null>} Habit insights or null if error
   */
  static async loadHabitInsights(habit, habitEntries) {
    if (!habitEntries || habitEntries.length === 0) {
      return null;
    }

    try {
      const [consistency, strength, trends, achievements, predictions] =
        await Promise.all([
          aiService.analyzeConsistency(habitEntries),
          aiService.analyzeHabitStrength(habitEntries),
          aiService.analyzeTrends(habitEntries),
          aiService.recognizeAchievements(habitEntries),
          aiService.analyzePredictions(habitEntries, habit),
        ]);

      return {
        habit,
        consistency,
        strength,
        trends,
        achievements,
        predictions,
        entryCount: habitEntries.length,
      };
    } catch (error) {
      console.error(`Error getting insights for habit ${habit.id}:`, error);
      return null;
    }
  }

  /**
   * Load insights for all habits
   * @param {Array} habits - Array of habit objects
   * @param {Array} allEntries - Array of all entries
   * @returns {Promise<Array>} Array of habit insights (null entries filtered out)
   */
  static async loadAllHabitInsights(habits, allEntries) {
    const habitInsights = await Promise.all(
      habits.map(async (habit) => {
        const habitEntries = allEntries.filter((e) => e.habitId === habit.id);
        return this.loadHabitInsights(habit, habitEntries);
      })
    );

    return habitInsights.filter((insight) => insight !== null);
  }
}

