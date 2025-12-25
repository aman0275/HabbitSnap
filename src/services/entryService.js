import { storage } from './storage';
import { getTodayString, generateId } from '../utils/helpers';
import { aiService } from './ai';
import { parseISO } from 'date-fns';

/**
 * Service layer for habit entry-related business logic
 */
export const entryService = {
  /**
   * Create a new habit entry (photo entry) with AI classification
   * Supports multiple entries per day with timestamps
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

    const now = new Date();
    const entry = {
      id: generateId(), // Unique ID for each entry
      habitId,
      date: getTodayString(), // Date string for grouping
      photo: photoUri,
      note: note.trim(),
      aiData, // Store AI classification data
      createdAt: now.toISOString(), // Full timestamp with time
      timestamp: now.getTime(), // Unix timestamp for sorting
    };

    return await storage.saveHabitEntry(entry);
  },

  /**
   * Get all entries for a specific habit
   * Sorted by creation time (most recent first)
   */
  async getEntriesByHabit(habitId) {
    const entries = await storage.getHabitEntriesByHabit(habitId);
    
    // Sort by timestamp (most recent first), fallback to createdAt for backward compatibility
    return entries.sort((a, b) => {
      const timeA = a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      const timeB = b.timestamp || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      return timeB - timeA;
    });
  },

  /**
   * Delete a specific entry by ID
   */
  async deleteEntry(habitId, entryId) {
    return await storage.deleteHabitEntry(habitId, entryId);
  },

  /**
   * Check if habit has any entries for today
   */
  async hasEntryToday(habitId) {
    const entries = await storage.getHabitEntriesByHabit(habitId);
    const today = getTodayString();
    return entries.some((entry) => entry.date === today);
  },
};

