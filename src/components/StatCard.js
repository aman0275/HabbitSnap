import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../utils/colors';
import { TYPOGRAPHY, SHADOWS, BORDER_RADIUS, SPACING } from '../constants/theme';

/**
 * Stat Card Component
 * Displays a single statistic with icon and optional gradient background
 * Uses React Native's built-in Animated API (compatible with Expo Go)
 */
const StatCard = ({ 
  title, 
  value, 
  icon, 
  iconColor,
  gradient,
  onPress,
  style,
  delay = 0,
}) => {
  const COLORS = useColors();
  const defaultIconColor = iconColor || COLORS.primary;
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    transform: [{ scale }],
    opacity,
  };

  const content = (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      {gradient ? (
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {icon && (
              <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color={COLORS.textWhite} />
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={[styles.valueWhite, { color: '#FFFFFF' }]}>{value}</Text>
              <Text style={[styles.titleWhite, { color: '#FFFFFF', opacity: 0.9 }]}>{title}</Text>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.content, { backgroundColor: COLORS.surface }]}>
          {icon && (
            <View style={[styles.iconContainer, { backgroundColor: `${defaultIconColor}15` }]}>
              <Ionicons name={icon} size={24} color={defaultIconColor} />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={[styles.value, { color: COLORS.textPrimary }]}>{value}</Text>
            <Text style={[styles.title, { color: COLORS.textSecondary }]}>{title}</Text>
          </View>
        </View>
      )}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.9}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  gradient: {
    borderRadius: BORDER_RADIUS.xl,
  },
  content: {
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.xs,
  },
  valueWhite: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.bodySmall,
  },
  titleWhite: {
    ...TYPOGRAPHY.bodySmall,
  },
});

export default StatCard;
