import { HABIT_CATEGORIES } from '../../constants/aiCategories';
import { CONFIDENCE_THRESHOLDS } from '../../constants/aiConfig';

/**
 * Image Classifier Service
 * Handles image classification and category detection
 * 
 * Currently uses heuristic-based approach.
 * Ready for TensorFlow Lite + MobileNet V3 integration
 */
class ImageClassifier {
  /**
   * Classify image into habit category
   * @param {string} imageUri - URI of the image
   * @param {string} habitName - Name of the habit (for context)
   * @returns {Promise<Object>} Classification result
   */
  async classify(imageUri, habitName = '') {
    try {
      const category = this.detectCategoryFromName(habitName);
      const confidence = this.calculateConfidence(category, habitName);
      const allCategories = this.generateAllCategories(category, confidence);

      return {
        category: category.id,
        categoryName: category.name,
        confidence,
        allCategories,
      };
    } catch (error) {
      console.error('Error in image classification:', error);
      return this.getDefaultClassification();
    }
  }

  /**
   * Detect category from habit name using keyword matching
   * @param {string} habitName - Name of the habit
   * @returns {Object} Category object
   */
  detectCategoryFromName(habitName) {
    if (!habitName) {
      return HABIT_CATEGORIES.OTHER;
    }

    const lowerName = habitName.toLowerCase();

    for (const category of Object.values(HABIT_CATEGORIES)) {
      if (this.matchesCategory(category, lowerName)) {
        return category;
      }
    }

    return HABIT_CATEGORIES.OTHER;
  }

  /**
   * Check if habit name matches category keywords
   * @param {Object} category - Category object
   * @param {string} lowerName - Lowercase habit name
   * @returns {boolean} True if matches
   */
  matchesCategory(category, lowerName) {
    return category.keywords.some((keyword) => lowerName.includes(keyword));
  }

  /**
   * Calculate confidence score for classification
   * @param {Object} category - Detected category
   * @param {string} habitName - Habit name
   * @returns {number} Confidence score (0-1)
   */
  calculateConfidence(category, habitName) {
    if (category.id === HABIT_CATEGORIES.OTHER.id) {
      return CONFIDENCE_THRESHOLDS.MEDIUM;
    }

    // Higher confidence if multiple keywords match
    const lowerName = habitName.toLowerCase();
    const matchingKeywords = category.keywords.filter((keyword) =>
      lowerName.includes(keyword)
    ).length;

    const baseConfidence = CONFIDENCE_THRESHOLDS.HIGH;
    const keywordBonus = Math.min(matchingKeywords * 0.05, 0.1);

    return Math.min(baseConfidence + keywordBonus, 1.0);
  }

  /**
   * Generate all category predictions with confidence scores
   * @param {Object} detectedCategory - Detected category
   * @param {number} detectedConfidence - Confidence of detected category
   * @returns {Array} All categories with confidence scores
   */
  generateAllCategories(detectedCategory, detectedConfidence) {
    return Object.values(HABIT_CATEGORIES).map((category) => ({
      id: category.id,
      name: category.name,
      confidence:
        category.id === detectedCategory.id
          ? detectedConfidence
          : this.generateRandomLowConfidence(),
    }));
  }

  /**
   * Generate random low confidence for non-detected categories
   * @returns {number} Random confidence (0-0.3)
   */
  generateRandomLowConfidence() {
    return Math.random() * CONFIDENCE_THRESHOLDS.LOW;
  }

  /**
   * Get default classification result
   * @returns {Object} Default classification
   */
  getDefaultClassification() {
    return {
      category: HABIT_CATEGORIES.OTHER.id,
      categoryName: HABIT_CATEGORIES.OTHER.name,
      confidence: CONFIDENCE_THRESHOLDS.MEDIUM,
      allCategories: [],
    };
  }
}

export default new ImageClassifier();

