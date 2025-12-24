import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { habitService } from '../services/habitService';

/**
 * Custom hook for managing habits
 * Handles loading, creating, updating, and deleting habits
 */
export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedHabits = await habitService.getAllHabits();
      setHabits(loadedHabits);
    } catch (err) {
      setError(err.message);
      console.error('Error loading habits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createHabit = useCallback(async (habitData) => {
    try {
      setError(null);
      await habitService.createHabit(habitData);
      await loadHabits();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error creating habit:', err);
      return false;
    }
  }, [loadHabits]);

  const updateHabit = useCallback(async (habitId, habitData) => {
    try {
      setError(null);
      await habitService.updateHabit(habitId, habitData);
      await loadHabits();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error updating habit:', err);
      return false;
    }
  }, [loadHabits]);

  const deleteHabit = useCallback(async (habitId) => {
    try {
      setError(null);
      await habitService.deleteHabit(habitId);
      await loadHabits();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting habit:', err);
      return false;
    }
  }, [loadHabits]);

  // Reload habits when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [loadHabits])
  );

  return {
    habits,
    loading,
    error,
    loadHabits,
    createHabit,
    updateHabit,
    deleteHabit,
  };
};

