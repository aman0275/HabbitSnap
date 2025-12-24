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
 */

import classifier from './classifier';
import consistencyAnalyzer from './consistencyAnalyzer';
import progressAnalyzer from './progressAnalyzer';
import tagGenerator from './tagGenerator';
import suggestionGenerator from './suggestionGenerator';
import qualityAssessor from './qualityAssessor';

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
};

// Export individual services for advanced usage
export {
  classifier,
  consistencyAnalyzer,
  progressAnalyzer,
  tagGenerator,
  suggestionGenerator,
  qualityAssessor,
};

