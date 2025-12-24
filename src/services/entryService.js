import { storage } from './storage';
import { getTodayString } from '../utils/helpers';
import { aiService } from './ai';

/**
 * Service layer for habit entry-related business logic
 */
export const entryService = {
  /**
   * Create a new habit entry (photo entry) with AI classification
   */
  async createEntry(habitId, photoUri, note = '', habitName = '') {
    // Classify image using AI
    let aiData = null;
    try {
      const classification = await aiService.classifyImage(photoUri, habitName);
      const tags = await aiService.generateTags(photoUri, classification.category);
      
      aiData = {
        category: classification.category,
        categoryName: classification.categoryName,
        confidence: classification.confidence,
        tags,
      };
    } catch (error) {
      console.error('Error in AI classification:', error);
      // Continue without AI data if classification fails
    }

    const entry = {
      habitId,
      date: getTodayString(),
      photo: photoUri,
      note: note.trim(),
      aiData, // Store AI classification data
      createdAt: new Date().toISOString(),
    };

    return await storage.saveHabitEntry(entry);
  },

  /**
   * Get all entries for a specific habit
   */
  async getEntriesByHabit(habitId) {
    const entries = await storage.getHabitEntriesByHabit(habitId);
    return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  /**
   * Delete a specific entry
   */
  async deleteEntry(habitId, date) {
    return await storage.deleteHabitEntry(habitId, date);
  },

  /**
   * Check if habit has an entry for today
   */
  async hasEntryToday(habitId) {
    const entries = await storage.getHabitEntriesByHabit(habitId);
    const today = getTodayString();
    return entries.some((entry) => entry.date === today);
  },
};

