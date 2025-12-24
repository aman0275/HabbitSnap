import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SPACING } from '../constants/theme';

const Badge = ({ text, variant = 'success', style, textStyle }) => {
  const variantColors = {
    success: COLORS.success,
    error: COLORS.error,
    warning: COLORS.warning,
    primary: COLORS.primary,
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: variantColors[variant] },
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.xs + 2,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  text: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
  },
});

export default Badge;

