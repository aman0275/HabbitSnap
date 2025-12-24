import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HABIT_CATEGORIES, getCategoryById } from '../constants/aiCategories';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SPACING } from '../constants/theme';

const AICategoryBadge = ({ categoryId, confidence, showIcon = true }) => {
  const category = getCategoryById(categoryId);
  
  if (!category || categoryId === HABIT_CATEGORIES.OTHER.id) {
    return null;
  }

  return (
    <View style={[styles.badge, { backgroundColor: category.color + '20' }]}>
      {showIcon && (
        <Ionicons 
          name={category.icon} 
          size={14} 
          color={category.color} 
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: category.color }]}>
        {category.name}
      </Text>
      {confidence !== undefined && confidence > 0 && (
        <Text style={[styles.confidence, { color: category.color }]}>
          {Math.round(confidence * 100)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: SPACING.xs - 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
  confidence: {
    fontSize: 10,
    opacity: 0.8,
  },
});

export default AICategoryBadge;

