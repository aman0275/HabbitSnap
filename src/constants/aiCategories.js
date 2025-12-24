/**
 * AI Categories for habit classification
 * Based on MobileNet V3 classification output
 */
export const HABIT_CATEGORIES = {
  FITNESS: {
    id: 'fitness',
    name: 'Fitness',
    icon: 'fitness',
    keywords: ['gym', 'workout', 'exercise', 'running', 'yoga', 'fitness', 'weights', 'dumbbell'],
    color: '#f59e0b',
  },
  FOOD: {
    id: 'food',
    name: 'Food & Nutrition',
    icon: 'restaurant',
    keywords: ['food', 'meal', 'breakfast', 'lunch', 'dinner', 'cooking', 'kitchen', 'plate'],
    color: '#ec4899',
  },
  WORKSPACE: {
    id: 'workspace',
    name: 'Workspace',
    icon: 'briefcase',
    keywords: ['desk', 'workspace', 'office', 'computer', 'laptop', 'study', 'desk'],
    color: '#6366f1',
  },
  READING: {
    id: 'reading',
    name: 'Reading',
    icon: 'book',
    keywords: ['book', 'reading', 'library', 'study', 'text', 'page', 'novel'],
    color: '#8b5cf6',
  },
  OUTDOOR: {
    id: 'outdoor',
    name: 'Outdoor',
    icon: 'sunny',
    keywords: ['outdoor', 'nature', 'park', 'hiking', 'outdoor', 'landscape', 'tree'],
    color: '#10b981',
  },
  OTHER: {
    id: 'other',
    name: 'Other',
    icon: 'ellipse',
    keywords: [],
    color: '#6b7280',
  },
};

export const getCategoryById = (id) => {
  return Object.values(HABIT_CATEGORIES).find((cat) => cat.id === id) || HABIT_CATEGORIES.OTHER;
};

