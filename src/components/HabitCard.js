import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../utils/colors';
import { BORDER_RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { TYPOGRAPHY } from '../constants/theme';
import Badge from './Badge';

const HabitCard = ({ habit, onPress, onDelete }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  // Check if there's an entry for today (works with multiple entries per day)
  const hasEntryToday = habit.latestPhotoDate && 
    new Date(habit.latestPhotoDate).toDateString() === new Date().toDateString();

  const scale = useRef(new Animated.Value(1)).current;

  const StatItem = ({ icon, value, label, iconColor }) => (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={16} color={iconColor} />
      <Text style={[styles.statText, { color: COLORS.textSecondary }]}>
        {value} {label}
      </Text>
    </View>
  );

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 300,
      friction: 15,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 15,
    }).start();
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          <View style={styles.info}>
            <Text style={[styles.name, { color: COLORS.textPrimary }]}>{habit.name}</Text>
            <View style={styles.statsRow}>
              <StatItem
                icon="flame"
                value={habit.streak}
                label="day streak"
                iconColor={COLORS.warning}
              />
              <StatItem
                icon="images"
                value={habit.totalEntries}
                label="photos"
                iconColor={COLORS.primary}
              />
            </View>
            {habit.description && (
              <Text style={[styles.description, { color: COLORS.textTertiary }]} numberOfLines={2}>
                {habit.description}
              </Text>
            )}
          </View>

          <View style={styles.photoContainer}>
            {habit.latestPhoto ? (
              <Image source={{ uri: habit.latestPhoto }} style={styles.thumbnail} />
            ) : (
              <View style={[styles.placeholder, { backgroundColor: COLORS.backgroundSecondary }]}>
                <Ionicons name="camera-outline" size={32} color={COLORS.textTertiary} />
              </View>
            )}
            {hasEntryToday && (
              <View style={styles.badgeContainer}>
                <Badge text="Today" variant="success" />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {onDelete && (
        <TouchableOpacity style={[styles.deleteButton, { borderTopColor: COLORS.borderLight, backgroundColor: COLORS.surface }]} onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const createStyles = (COLORS) => StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.md,
    ...SHADOWS.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  content: {
    flexDirection: 'row',
    padding: SPACING.lg,
  },
  info: {
    flex: 1,
    marginRight: SPACING.md,
  },
  name: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.sm,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 6,
    ...TYPOGRAPHY.bodySmall,
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    marginTop: SPACING.xs,
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.sm,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  deleteButton: {
    padding: SPACING.md,
    alignItems: 'center',
    borderTopWidth: 1,
  },
});

export default HabitCard;
