import { HABIT_CATEGORIES } from "../constants/aiCategories";
import { HABIT_COLORS } from "../constants/colors";

/**
 * Habit Suggestion Service
 * Generates intelligent habit suggestions based on various factors
 */
export const habitSuggestionService = {
  /**
   * Get habit suggestions
   * @param {Array} existingHabits - Existing habits to avoid duplicates and suggest pairs
   * @returns {Promise<Array>} Array of habit suggestion objects
   */
  async getSuggestions(existingHabits = []) {
    const existingHabitNames = existingHabits.map((h) =>
      h.name.toLowerCase().trim()
    );

    const suggestions = [
      ...this.getPopularHabits(existingHabitNames),
      ...this.getCategoryBasedSuggestions(existingHabits),
      ...this.getPairedHabits(existingHabits),
    ];

    // Remove duplicates and limit results
    const uniqueSuggestions = this.removeDuplicates(suggestions);
    return uniqueSuggestions.slice(0, 12); // Top 12 suggestions
  },

  /**
   * Get popular/common habit suggestions
   * @param {Array<string>} existingNames - Existing habit names (lowercase)
   * @returns {Array} Array of suggestion objects
   */
  getPopularHabits(existingNames) {
    const popularHabits = [
      {
        name: "Morning Exercise",
        description: "Start your day with physical activity",
        category: HABIT_CATEGORIES.FITNESS.id,
        icon: "sunny",
        color: HABIT_COLORS[0].color,
        reason: "Popular",
      },
      {
        name: "Daily Reading",
        description: "Read for 30 minutes every day",
        category: HABIT_CATEGORIES.READING.id,
        icon: "book",
        color: HABIT_COLORS[2]?.color || "#F093FB",
        reason: "Popular",
      },
      {
        name: "Healthy Breakfast",
        description: "Eat a nutritious breakfast daily",
        category: HABIT_CATEGORIES.FOOD.id,
        icon: "restaurant",
        color: HABIT_COLORS[1]?.color || "#764BA2",
        reason: "Popular",
      },
      {
        name: "Meditation",
        description: "Practice mindfulness and relaxation",
        category: HABIT_CATEGORIES.OTHER.id,
        icon: "leaf",
        color: HABIT_COLORS[3]?.color || "#F6AD55",
        reason: "Popular",
      },
      {
        name: "Drink Water",
        description: "Stay hydrated throughout the day",
        category: HABIT_CATEGORIES.FOOD.id,
        icon: "water-outline",
        color: HABIT_COLORS[4]?.color || "#48BB78",
        reason: "Popular",
      },
      {
        name: "Evening Walk",
        description: "Take a walk after dinner",
        category: HABIT_CATEGORIES.OUTDOOR.id,
        icon: "walk-outline",
        color: HABIT_COLORS[5]?.color || "#4299E1",
        reason: "Popular",
      },
      {
        name: "No Phone Before Bed",
        description: "Avoid screens 1 hour before sleep",
        category: HABIT_CATEGORIES.OTHER.id,
        icon: "phone-portrait-outline",
        color: HABIT_COLORS[6]?.color || HABIT_COLORS[0].color,
        reason: "Popular",
      },
      {
        name: "Journaling",
        description: "Write down your thoughts daily",
        category: HABIT_CATEGORIES.OTHER.id,
        icon: "document-text",
        color: HABIT_COLORS[7]?.color || HABIT_COLORS[0].color,
        reason: "Popular",
      },
      {
        name: "Practice Gratitude",
        description: "Write down 3 things you're grateful for",
        category: HABIT_CATEGORIES.OTHER.id,
        icon: "heart",
        color: HABIT_COLORS[0].color,
        reason: "Popular",
      },
      {
        name: "Deep Work Session",
        description: "Focused work without distractions",
        category: HABIT_CATEGORIES.WORKSPACE.id,
        icon: "bulb",
        color: HABIT_COLORS[1]?.color || "#764BA2",
        reason: "Popular",
      },
      {
        name: "Stretching",
        description: "Daily flexibility exercises",
        category: HABIT_CATEGORIES.FITNESS.id,
        icon: "fitness",
        color: HABIT_COLORS[2]?.color || "#F093FB",
        reason: "Popular",
      },
      {
        name: "Meal Prep",
        description: "Prepare healthy meals in advance",
        category: HABIT_CATEGORIES.FOOD.id,
        icon: "nutrition-outline",
        color: HABIT_COLORS[3]?.color || "#F6AD55",
        reason: "Popular",
      },
      {
        name: "Learning Time",
        description: "Learn something new every day",
        category: HABIT_CATEGORIES.READING.id,
        icon: "school",
        color: HABIT_COLORS[4]?.color || "#48BB78",
        reason: "Popular",
      },
      {
        name: "Outdoor Time",
        description: "Spend time in nature",
        category: HABIT_CATEGORIES.OUTDOOR.id,
        icon: "sunny",
        color: HABIT_COLORS[5]?.color || "#4299E1",
        reason: "Popular",
      },
      {
        name: "Declutter",
        description: "Organize and declutter your space",
        category: HABIT_CATEGORIES.WORKSPACE.id,
        icon: "cube-outline",
        color: HABIT_COLORS[6]?.color || HABIT_COLORS[0].color,
        reason: "Popular",
      },
    ];

    // Filter out existing habits
    return popularHabits.filter(
      (habit) => !existingNames.includes(habit.name.toLowerCase())
    );
  },

  /**
   * Get category-based suggestions based on existing habits
   * @param {Array} existingHabits - Existing habits
   * @returns {Array} Array of suggestion objects
   */
  getCategoryBasedSuggestions(existingHabits) {
    if (existingHabits.length === 0) return [];

    const suggestions = [];
    const categoryMap = {};

    // Group existing habits by category
    existingHabits.forEach((habit) => {
      // Try to infer category from habit name or use a default
      const category = this.inferCategory(habit.name);
      if (!categoryMap[category]) {
        categoryMap[category] = [];
      }
      categoryMap[category].push(habit);
    });

    // Suggest habits in popular categories
    const categorySuggestions = {
      [HABIT_CATEGORIES.FITNESS.id]: [
        {
          name: "Yoga Session",
          description: "Practice yoga for flexibility and mindfulness",
          category: HABIT_CATEGORIES.FITNESS.id,
          icon: "body-outline",
          color: HABIT_COLORS[0].color,
          reason: "Similar to your fitness habits",
        },
        {
          name: "Strength Training",
          description: "Build muscle and strength",
          category: HABIT_CATEGORIES.FITNESS.id,
          icon: "barbell-outline",
          color: HABIT_COLORS[1]?.color || "#764BA2",
          reason: "Complements your fitness routine",
        },
      ],
      [HABIT_CATEGORIES.FOOD.id]: [
        {
          name: "Cook at Home",
          description: "Prepare meals at home",
          category: HABIT_CATEGORIES.FOOD.id,
          icon: "restaurant",
          color: HABIT_COLORS[2]?.color || "#F093FB",
          reason: "Similar to your food habits",
        },
        {
          name: "Track Macros",
          description: "Monitor your nutrition intake",
          category: HABIT_CATEGORIES.FOOD.id,
          icon: "nutrition-outline",
          color: HABIT_COLORS[3]?.color || "#F6AD55",
          reason: "Complements healthy eating",
        },
      ],
      [HABIT_CATEGORIES.WORKSPACE.id]: [
        {
          name: "Pomodoro Sessions",
          description: "Use time-blocking for productivity",
          category: HABIT_CATEGORIES.WORKSPACE.id,
          icon: "timer-outline",
          color: HABIT_COLORS[4]?.color || "#48BB78",
          reason: "Similar to your workspace habits",
        },
      ],
      [HABIT_CATEGORIES.READING.id]: [
        {
          name: "Audio Books",
          description: "Listen to audiobooks during commutes",
          category: HABIT_CATEGORIES.READING.id,
          icon: "headset-outline",
          color: HABIT_COLORS[5]?.color || "#4299E1",
          reason: "Alternative to reading",
        },
      ],
    };

    Object.keys(categoryMap).forEach((category) => {
      if (categorySuggestions[category]) {
        suggestions.push(...categorySuggestions[category]);
      }
    });

    return suggestions;
  },

  /**
   * Get paired habits (habits that work well together)
   * @param {Array} existingHabits - Existing habits
   * @returns {Array} Array of suggestion objects
   */
  getPairedHabits(existingHabits) {
    if (existingHabits.length === 0) return [];

    const suggestions = [];
    const habitNames = existingHabits.map((h) => h.name.toLowerCase());

    // Define habit pairs
    const habitPairs = {
      "morning exercise": {
        name: "Post-Workout Protein",
        description: "Refuel after your workout",
        category: HABIT_CATEGORIES.FOOD.id,
        icon: "fitness",
        color: HABIT_COLORS[1]?.color || "#764BA2",
        reason: "Pairs well with exercise",
      },
      "healthy breakfast": {
        name: "Morning Vitamins",
        description: "Take your daily vitamins",
        category: HABIT_CATEGORIES.FOOD.id,
        icon: "medical-outline",
        color: HABIT_COLORS[2]?.color || "#F093FB",
        reason: "Complements healthy eating",
      },
      "daily reading": {
        name: "Reading Notes",
        description: "Take notes while reading",
        category: HABIT_CATEGORIES.READING.id,
        icon: "document-text",
        color: HABIT_COLORS[3]?.color || "#F6AD55",
        reason: "Enhances your reading habit",
      },
      meditation: {
        name: "Morning Affirmations",
        description: "Start your day with positive thoughts",
        category: HABIT_CATEGORIES.OTHER.id,
        icon: "sunny",
        color: HABIT_COLORS[0].color,
        reason: "Complements mindfulness practice",
      },
      "drink water": {
        name: "Track Hydration",
        description: "Monitor daily water intake",
        category: HABIT_CATEGORIES.FOOD.id,
        icon: "water-outline",
        color: HABIT_COLORS[4]?.color || "#48BB78",
        reason: "Related to hydration",
      },
    };

    // Check for pairs
    habitNames.forEach((name) => {
      Object.keys(habitPairs).forEach((key) => {
        if (name.includes(key)) {
          suggestions.push(habitPairs[key]);
        }
      });
    });

    return suggestions;
  },

  /**
   * Infer category from habit name
   * @param {string} habitName - Habit name
   * @returns {string} Category ID
   */
  inferCategory(habitName) {
    const lowerName = habitName.toLowerCase();
    const categories = Object.values(HABIT_CATEGORIES);

    for (const category of categories) {
      if (category.keywords.some((keyword) => lowerName.includes(keyword))) {
        return category.id;
      }
    }

    return HABIT_CATEGORIES.OTHER.id;
  },

  /**
   * Remove duplicate suggestions
   * @param {Array} suggestions - Array of suggestions
   * @returns {Array} Unique suggestions
   */
  removeDuplicates(suggestions) {
    const seen = new Set();
    return suggestions.filter((suggestion) => {
      const key = suggestion.name.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  },
};

