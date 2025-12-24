import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { habitService } from '../services/habitService';
import { generateId } from '../utils/helpers';
import { HABIT_COLORS } from '../constants/colors';
import { ALERTS } from '../constants/messages';
import { validators } from '../utils/validation';
import Input from '../components/Input';
import ColorPicker from '../components/ColorPicker';
import Button from '../components/Button';
import { COLORS } from '../constants/colors';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

export default function AddHabitScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const editingHabit = route.params?.habit;
  
  const [name, setName] = useState(editingHabit?.name || '');
  const [description, setDescription] = useState(editingHabit?.description || '');
  const [selectedColor, setSelectedColor] = useState(
    editingHabit?.color || HABIT_COLORS[0].color
  );
  const [nameError, setNameError] = useState(null);

  const handleSave = async () => {
    const nameValidationError = validators.habitName(name);
    if (nameValidationError) {
      setNameError(nameValidationError);
      Alert.alert(ALERTS.VALIDATION.HABIT_NAME_REQUIRED.title, nameValidationError);
      return;
    }

    setNameError(null);

    const habitData = {
      id: editingHabit?.id || generateId(),
      name: name.trim(),
      description: description.trim(),
      color: selectedColor,
    };

    try {
      if (editingHabit) {
        await habitService.updateHabit(editingHabit.id, habitData);
      } else {
        await habitService.createHabit(habitData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save habit. Please try again.');
      console.error('Error saving habit:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Input
            label="Habit Name *"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (nameError) setNameError(null);
            }}
            placeholder="e.g., Morning Exercise, Healthy Meal"
            error={nameError}
            autoFocus
          />

          <Input
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Add a note about this habit..."
            multiline
            numberOfLines={4}
          />

          <ColorPicker
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
        </View>

        <Button
          title={editingHabit ? 'Update Habit' : 'Create Habit'}
          onPress={handleSave}
          variant="gradient"
          colors={[selectedColor, selectedColor]}
          style={styles.saveButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  saveButton: {
    ...SHADOWS.primary,
  },
});

