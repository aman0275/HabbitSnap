import { HABIT_CATEGORIES } from '../../constants/aiCategories';
import { getTimeBasedTag, getDayBasedTag } from '../../utils/aiHelpers';

/**
 * Tag Generator Service
 * Generates relevant tags for habit entries
 */
class TagGenerator {
  /**
   * Generate tags for an entry
   * @param {string} categoryId - Detected category ID
   * @returns {Promise<Array>} Array of tags
   */
  async generate(categoryId) {
    const tags = [];

    // Add category tag
    const categoryTag = this.getCategoryTag(categoryId);
    if (categoryTag) {
      tags.push(categoryTag);
    }

    // Add time-based tags
    tags.push(getTimeBasedTag());
    tags.push(getDayBasedTag());

    return tags;
  }

  /**
   * Get category-based tag
   * @param {string} categoryId - Category ID
   * @returns {string|null} Category tag or null
   */
  getCategoryTag(categoryId) {
    const category = Object.values(HABIT_CATEGORIES).find(
      (cat) => cat.id === categoryId
    );

    return category ? category.name.toLowerCase() : null;
  }
}

export default new TagGenerator();

