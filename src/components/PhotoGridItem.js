import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { formatDisplayDate, formatTime, isToday } from '../utils/helpers';
import { parseISO } from 'date-fns';
import AICategoryBadge from './AICategoryBadge';

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - 48) / 3;

const PhotoGridItem = ({ entry, onLongPress }) => {
  // Get the timestamp - use createdAt if timestamp not available (backward compatibility)
  const entryDate = entry.createdAt ? parseISO(entry.createdAt) : parseISO(entry.date);
  const entryIsToday = isToday(entryDate);
  
  // Show time for today's entries, date for older entries
  const dateDisplay = entryIsToday 
    ? 'Today' 
    : formatDisplayDate(entryDate);
  const timeDisplay = formatTime(entryDate);

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={onLongPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: entry.photo }} style={styles.photo} />
      
      {/* AI Category Badge */}
      {entry.aiData && entry.aiData.category && (
        <View style={styles.badgeContainer}>
          <AICategoryBadge 
            categoryId={entry.aiData.category}
            confidence={entry.aiData.confidence}
          />
        </View>
      )}
      
      <View style={styles.overlay}>
        <Text style={styles.date}>{dateDisplay}</Text>
        <Text style={styles.time}>{timeDisplay}</Text>
        {entry.note && (
          <Text style={styles.note} numberOfLines={1}>
            {entry.note}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    margin: 2,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: SPACING.xs,
    left: SPACING.xs,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: SPACING.xs,
    paddingTop: 4,
    paddingBottom: 4,
  },
  date: {
    color: COLORS.textWhite,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 1,
  },
  time: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 9,
    fontWeight: '500',
  },
  note: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 9,
    marginTop: 3,
    fontWeight: '400',
  },
});

export default PhotoGridItem;

