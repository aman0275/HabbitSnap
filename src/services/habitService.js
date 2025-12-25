import { storage } from './storage';
import { calculateStreak } from '../utils/helpers';

/**
 * Service layer for habit-related business logic
 * Separates business logic from UI components
 */
export const habitService = {
  /**
   * Get all habits with enriched data (streak, latest photo, etc.)
   * @returns {Promise<Array>} Array of habits with enriched data
   */
  async getAllHabits() {
    const habits = await storage.getHabits();
    const entries = await storage.getHabitEntries();

    const enrichedHabits = await Promise.all(
      habits.map(async (habit) => {
        const habitEntries = entries.filter((e) => e.habitId === habit.id);
        // Sort by timestamp or createdAt (most recent first)
        const latestEntry = habitEntries.sort((a, b) => {
          const timeA = a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
          const timeB = b.timestamp || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
          return timeB - timeA;
        })[0];

        const streak = calculateStreak(habitEntries);

        return {
          ...habit,
          latestPhoto: latestEntry?.photo || null,
          latestPhotoDate: latestEntry?.date || null,
          streak,
          totalEntries: habitEntries.length,
        };
      })
    );

    return enrichedHabits;
  },

  /**
   * Create a new habit
   */
  async createHabit(habitData) {
    const habit = {
      ...habitData,
      createdAt: new Date().toISOString(),
    };
    return await storage.saveHabit(habit);
  },

  /**
   * Update an existing habit
   */
  async updateHabit(habitId, habitData) {
    const existingHabit = (await storage.getHabits()).find((h) => h.id === habitId);
    if (!existingHabit) {
      throw new Error('Habit not found');
    }

    const updatedHabit = {
      ...existingHabit,
      ...habitData,
      updatedAt: new Date().toISOString(),
    };
    return await storage.saveHabit(updatedHabit);
  },

  /**
   * Delete a habit and all its entries
   */
  async deleteHabit(habitId) {
    return await storage.deleteHabit(habitId);
  },

  /**
   * Get a single habit with enriched data
   */
  async getHabitById(habitId) {
    const habits = await storage.getHabits();
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) {
      return null;
    }

    const entries = await storage.getHabitEntriesByHabit(habitId);
    const streak = calculateStreak(entries);

    return {
      ...habit,
      streak,
      totalEntries: entries.length,
    };
  },
};

