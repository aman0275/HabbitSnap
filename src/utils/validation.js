/**
 * Validation utilities
 */
export const validators = {
  /**
   * Validate habit name
   */
  habitName: (name) => {
    if (!name || !name.trim()) {
      return 'Habit name is required';
    }
    if (name.trim().length < 2) {
      return 'Habit name must be at least 2 characters';
    }
    if (name.trim().length > 50) {
      return 'Habit name must be less than 50 characters';
    }
    return null;
  },

  /**
   * Validate habit description (optional)
   */
  habitDescription: (description) => {
    if (description && description.length > 200) {
      return 'Description must be less than 200 characters';
    }
    return null;
  },
};

