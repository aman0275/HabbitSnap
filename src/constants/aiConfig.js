/**
 * AI Configuration Constants
 * Centralized configuration for AI features
 */

// Classification confidence thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.8,
  MEDIUM: 0.6,
  LOW: 0.4,
  MINIMUM: 0.3,
};

// Consistency analysis weights
export const CONSISTENCY_WEIGHTS = {
  FREQUENCY: 0.6,
  RECENCY: 0.4,
};

// Consistency score thresholds
export const CONSISTENCY_SCORES = {
  EXCELLENT: 0.8,
  GOOD: 0.6,
  FAIR: 0.4,
  NEEDS_IMPROVEMENT: 0.0,
};

// Progress analysis thresholds
export const PROGRESS_THRESHOLDS = {
  HABIT_FORMATION_DAYS: 21,
  MIN_CONSISTENCY_RATE: 0.5,
  MIN_ENTRIES_FOR_TREND: 14,
  TREND_COMPARISON_WEEKS: 2,
};

// Time-based analysis
export const TIME_THRESHOLDS = {
  DAYS_FOR_RECENCY_PENALTY: 7,
  HOURS_FOR_REMINDER: 24,
  MAX_REMINDER_HOURS: 48,
};

// Analysis window sizes
export const ANALYSIS_WINDOWS = {
  RECENT_ENTRIES: 7, // Last 7 entries for consistency
  WEEK_DAYS: 7,
  TREND_ANALYSIS_WEEKS: 2,
};
