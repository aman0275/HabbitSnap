import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../utils/colors';
import { HABIT_COLORS } from '../constants/colors';
import { BORDER_RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { TYPOGRAPHY } from '../constants/theme';

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  label: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.textPrimary,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
});

const ColorPicker = ({ selectedColor, onColorSelect, colors = HABIT_COLORS }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Color Theme</Text>
      <View style={styles.colorGrid}>
        {colors.map((colorOption) => (
          <TouchableOpacity
            key={colorOption.id}
            style={[
              styles.colorOption,
              {
                backgroundColor: colorOption.color,
                borderWidth: selectedColor === colorOption.color ? 3 : 0,
                borderColor: COLORS.textWhite,
              },
            ]}
            onPress={() => onColorSelect(colorOption.color)}
            activeOpacity={0.8}
          >
            {selectedColor === colorOption.color && (
              <Ionicons name="checkmark" size={20} color={COLORS.textWhite} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ColorPicker;

