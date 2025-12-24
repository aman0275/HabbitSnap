import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { TYPOGRAPHY } from '../constants/theme';
import Badge from './Badge';

const HabitCard = ({ habit, onPress, onDelete }) => {
  const hasEntryToday =
    habit.latestPhotoDate &&
    new Date(habit.latestPhotoDate).toDateString() === new Date().toDateString();

  const StatItem = ({ icon, value, label, iconColor }) => (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={16} color={iconColor} />
      <Text style={styles.statText}>
        {value} {label}
      </Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.name}>{habit.name}</Text>
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
            <Text style={styles.description} numberOfLines={2}>
              {habit.description}
            </Text>
          )}
        </View>

        <View style={styles.photoContainer}>
          {habit.latestPhoto ? (
            <Image source={{ uri: habit.latestPhoto }} style={styles.thumbnail} />
          ) : (
            <View style={styles.placeholder}>
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

      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
    overflow: 'hidden',
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
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  statText: {
    marginLeft: 6,
    ...TYPOGRAPHY.bodySmall,
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.borderLight,
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
    borderTopColor: COLORS.borderLight,
  },
});

export default HabitCard;

