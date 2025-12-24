import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SHADOWS } from '../constants/theme';

const FloatingActionButton = ({ onPress, icon = 'add', colors, size = 64 }) => {
  const buttonColors = colors || [COLORS.primary, COLORS.primaryLight];
  const iconSize = size * 0.4375; // ~28 for 64, scales proportionally

  return (
    <TouchableOpacity
      style={[styles.fab, { width: size, height: size, borderRadius: size / 2 }, SHADOWS.primary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={buttonColors}
        style={[styles.gradient, { borderRadius: size / 2 }]}
      >
        <Ionicons name={icon} size={iconSize} color={COLORS.white} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 10,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingActionButton;

