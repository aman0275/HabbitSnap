/**
 * AI Services - Centralized Export
 * Modular AI services following clean code principles
 * 
 * Each service has a single responsibility:
 * - Classifier: Image classification
 * - ConsistencyAnalyzer: Consistency analysis
 * - ProgressAnalyzer: Progress tracking
 * - TagGenerator: Tag generation
 * - SuggestionGenerator: Smart suggestions
 * - QualityAssessor: Photo quality assessment
 * - PatternAnalyzer: Pattern detection (time of day, day of week)
 * - PredictiveAnalyzer: Predictive analytics and streak risk assessment
 * - TrendAnalyzer: Advanced trend analysis with comparisons
 * - HabitStrengthAnalyzer: Habit strength scoring
 * - AchievementRecognizer: Enhanced milestone detection
 * - MotivationalInsights: Personalized motivational messages
 */

import classifier from './classifier';
import consistencyAnalyzer from './consistencyAnalyzer';
import progressAnalyzer from './progressAnalyzer';
import tagGenerator from './tagGenerator';
import suggestionGenerator from './suggestionGenerator';
import qualityAssessor from './qualityAssessor';
import patternAnalyzer from './patternAnalyzer';
import predictiveAnalyzer from './predictiveAnalyzer';
import trendAnalyzer from './trendAnalyzer';
import habitStrengthAnalyzer from './habitStrengthAnalyzer';
import achievementRecognizer from './achievementRecognizer';
import motivationalInsights from './motivationalInsights';

/**
 * Unified AI Service Interface
 * Provides a clean API for all AI operations
 */
export const aiService = {
  /**
   * Classify image into habit category
   * @param {string} imageUri - Image URI
   * @param {string} habitName - Habit name for context
   * @returns {Promise<Object>} Classification result
   */
  classifyImage: (imageUri, habitName) =>
    classifier.classify(imageUri, habitName),

  /**
   * Analyze consistency of habit entries
   * @param {Array} entries - Habit entries
   * @returns {Promise<Object>} Consistency analysis
   */
  analyzeConsistency: (entries) => consistencyAnalyzer.analyze(entries),

  /**
   * Analyze progress over time
   * @param {Array} entries - Habit entries
   * @returns {Promise<Object>} Progress analysis
   */
  analyzeProgress: (entries) => progressAnalyzer.analyze(entries),

  /**
   * Generate tags for an entry
   * @param {string} categoryId - Category ID
   * @returns {Promise<Array>} Array of tags
   */
  generateTags: (categoryId) => tagGenerator.generate(categoryId),

  /**
   * Generate smart suggestions
   * @param {Object} habit - Habit object
   * @param {Array} entries - Habit entries
   * @returns {Promise<Array>} Array of suggestions
   */
  getSmartSuggestions: (habit, entries) =>
    suggestionGenerator.generate(habit, entries),

  /**
   * Assess photo quality
   * @param {string} imageUri - Image URI
   * @returns {Promise<Object>} Quality assessment
   */
  assessPhotoQuality: (imageUri) => qualityAssessor.assess(imageUri),

  /**
   * Analyze tracking patterns
   * @param {Array} entries - Habit entries
   * @returns {Promise<Object>} Pattern analysis
   */
  analyzePatterns: (entries) => patternAnalyzer.analyze(entries),

  /**
   * Predictive analysis and streak risk assessment
   * @param {Array} entries - Habit entries
   * @param {Object} habit - Habit object
   * @returns {Promise<Object>} Predictive analysis
   */
  analyzePredictions: (entries, habit) =>
    predictiveAnalyzer.analyze(entries, habit),

  /**
   * Analyze trends with advanced comparisons
   * @param {Array} entries - Habit entries
   * @returns {Promise<Object>} Trend analysis
   */
  analyzeTrends: (entries) => trendAnalyzer.analyze(entries),

  /**
   * Analyze habit strength
   * @param {Array} entries - Habit entries
   * @returns {Promise<Object>} Habit strength analysis
   */
  analyzeHabitStrength: (entries) => habitStrengthAnalyzer.analyze(entries),

  /**
   * Recognize achievements and milestones
   * @param {Array} entries - Habit entries
   * @returns {Promise<Object>} Achievement recognition
   */
  recognizeAchievements: (entries) => achievementRecognizer.recognize(entries),

  /**
   * Generate motivational insights
   * @param {Array} entries - Habit entries
   * @param {Object} habit - Habit object
   * @returns {Promise<Object>} Motivational insights
   */
  getMotivationalInsights: (entries, habit) =>
    motivationalInsights.generate(entries, habit),
};

// Export individual services for advanced usage
export {
  classifier,
  consistencyAnalyzer,
  progressAnalyzer,
  tagGenerator,
  suggestionGenerator,
  qualityAssessor,
  patternAnalyzer,
  predictiveAnalyzer,
  trendAnalyzer,
  habitStrengthAnalyzer,
  achievementRecognizer,
  motivationalInsights,
};

