import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { entryService } from '../services/entryService';
import { calculateStreak } from '../utils/helpers';

/**
 * Custom hook for managing habit entries (photos)
 */
export const useHabitEntries = (habitId) => {
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadEntries = useCallback(async () => {
    if (!habitId) return;

    try {
      setLoading(true);
      setError(null);
      const loadedEntries = await entryService.getEntriesByHabit(habitId);
      setEntries(loadedEntries);
      setStreak(calculateStreak(loadedEntries));
    } catch (err) {
      setError(err.message);
      console.error('Error loading entries:', err);
    } finally {
      setLoading(false);
    }
  }, [habitId]);

  const createEntry = useCallback(async (photoUri, note = '') => {
    if (!habitId) return false;

    try {
      setError(null);
      await entryService.createEntry(habitId, photoUri, note);
      await loadEntries();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error creating entry:', err);
      return false;
    }
  }, [habitId, loadEntries]);

  const deleteEntry = useCallback(async (entryId) => {
    if (!habitId) return false;

    try {
      setError(null);
      await entryService.deleteEntry(habitId, entryId);
      await loadEntries();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting entry:', err);
      return false;
    }
  }, [habitId, loadEntries]);

  // Reload entries when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [loadEntries])
  );

  return {
    entries,
    streak,
    loading,
    error,
    loadEntries,
    createEntry,
    deleteEntry,
  };
};

