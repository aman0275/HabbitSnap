import { getTodayString } from "./helpers";

/**
 * AI Helper Utilities
 * Pure functions for AI calculations and transformations
 */

/**
 * Calculate days difference between two dates
 * @param {string|Date} date1 - First date
 * @param {string|Date} date2 - Second date
 * @returns {number} Days difference
 */
export const calculateDaysDifference = (date1, date2) => {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;
  return Math.floor(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
};

/**
 * Calculate hours difference between two dates
 * @param {string|Date} date1 - First date
 * @param {string|Date} date2 - Second date
 * @returns {number} Hours difference
 */
export const calculateHoursDifference = (date1, date2) => {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;
  return Math.abs(d2 - d1) / (1000 * 60 * 60);
};

/**
 * Get recent entries within a window
 * @param {Array} entries - All entries
 * @param {number} windowSize - Number of recent entries to return
 * @returns {Array} Recent entries sorted by date (newest first)
 */
export const getRecentEntries = (entries, windowSize) => {
  if (!Array.isArray(entries) || entries.length === 0) return [];

  return [...entries]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, windowSize);
};

/**
 * Calculate frequency score based on entries per period
 * @param {number} entriesCount - Number of entries
 * @param {number} periodDays - Period in days
 * @returns {number} Frequency score (0-1)
 */
export const calculateFrequencyScore = (entriesCount, periodDays) => {
  return Math.min(entriesCount / periodDays, 1.0);
};

/**
 * Calculate recency score (penalizes old entries)
 * @param {number} daysSinceLastEntry - Days since last entry
 * @param {number} penaltyThreshold - Days before penalty starts
 * @returns {number} Recency score (0-1)
 */
export const calculateRecencyScore = (daysSinceLastEntry, penaltyThreshold) => {
  return Math.max(0, 1 - daysSinceLastEntry / penaltyThreshold);
};

/**
 * Get time-based tag based on current hour
 * @returns {string} Time tag (morning, afternoon, evening, night)
 */
export const getTimeBasedTag = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

/**
 * Get day of week tag
 * @returns {string} Day name
 */
export const getDayBasedTag = () => {
  const dayOfWeek = new Date().getDay();
  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return weekdays[dayOfWeek];
};

/**
 * Sort entries by date (ascending)
 * @param {Array} entries - Entries to sort
 * @returns {Array} Sorted entries
 */
export const sortEntriesByDateAsc = (entries) => {
  if (!Array.isArray(entries)) return [];
  return [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Sort entries by date (descending)
 * @param {Array} entries - Entries to sort
 * @returns {Array} Sorted entries
 */
export const sortEntriesByDateDesc = (entries) => {
  if (!Array.isArray(entries)) return [];
  return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
};
