/**
 * AI Aggregation Configuration Constants
 * Centralized configuration for aggregating AI insights across multiple habits
 */

// Rating thresholds for consistency aggregation
export const CONSISTENCY_RATINGS = {
  EXCELLENT: "excellent",
  GOOD: "good",
  FAIR: "fair",
  NEEDS_IMPROVEMENT: "needs-improvement",
};

// Threshold scores for rating determination
export const CONSISTENCY_THRESHOLDS = {
  EXCELLENT: 0.8,
  GOOD: 0.6,
  FAIR: 0.4,
};

// Strength thresholds
export const STRENGTH_THRESHOLDS = {
  VERY_STRONG: 0.8,
  STRONG: 0.65,
  MODERATE: 0.5,
  DEVELOPING: 0.35,
};

// Habit performance scoring weights
export const PERFORMANCE_WEIGHTS = {
  STRENGTH: 0.6,
  CONSISTENCY: 0.4,
};

// Attention thresholds (habits needing attention)
export const ATTENTION_THRESHOLDS = {
  LOW_CONSISTENCY: 0.4,
  LOW_STRENGTH: 0.35,
};

// Motivational insight thresholds
export const MOTIVATION_THRESHOLDS = {
  CELEBRATION_STRENGTH: 0.7,
  ENCOURAGEMENT_STRENGTH: 0.5,
  EXCELLENT_CONSISTENCY: 0.8,
};

// Dashboard display limits
export const DASHBOARD_LIMITS = {
  TOP_PERFORMING_HABITS: 3,
  HABITS_NEEDING_ATTENTION: 3,
  RECENT_ACHIEVEMENTS: 5,
  TOP_ALERTS: 2,
};

// Trend directions
export const TREND_DIRECTIONS = {
  IMPROVING: "improving",
  DECLINING: "declining",
  STABLE: "stable",
};

// Alert types
export const ALERT_TYPES = {
  URGENT: "urgent",
  WARNING: "warning",
  INFO: "info",
};

