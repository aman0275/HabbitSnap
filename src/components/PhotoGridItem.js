import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SPACING } from '../constants/theme';
import { formatDisplayDate } from '../utils/helpers';
import AICategoryBadge from './AICategoryBadge';

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - 48) / 3;

const PhotoGridItem = ({ entry, onLongPress }) => {
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
        <Text style={styles.date}>{formatDisplayDate(entry.date)}</Text>
        {entry.note && (
          <Text style={styles.note} numberOfLines={2}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: SPACING.xs,
  },
  date: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '600',
  },
  note: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 10,
    marginTop: 2,
  },
});

export default PhotoGridItem;

