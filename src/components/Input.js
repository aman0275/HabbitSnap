import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SPACING } from '../constants/theme';
import { TYPOGRAPHY } from '../constants/theme';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  error,
  style,
  dark = false,
  ...props
}) => {
  const inputStyles = [
    styles.input,
    dark && styles.inputDark,
    multiline && styles.textArea,
    error && styles.inputError,
  ];

  const labelStyles = [styles.label, dark && styles.labelDark];

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={labelStyles}>{label}</Text>}
      <TextInput
        style={inputStyles}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={dark ? COLORS.textTertiary : COLORS.textTertiary}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  label: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.textPrimary,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: COLORS.white,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  labelDark: {
    color: COLORS.white,
  },
  textArea: {
    minHeight: 100,
    paddingTop: SPACING.lg,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: SPACING.xs,
  },
});

export default Input;

