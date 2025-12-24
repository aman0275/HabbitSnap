import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  HABITS: 'habits',
  HABIT_ENTRIES: 'habit_entries',
};

export const storage = {
  // Habit management
  async saveHabits(habits) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
      return true;
    } catch (error) {
      console.error('Error saving habits:', error);
      return false;
    }
  },

  async getHabits() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting habits:', error);
      return [];
    }
  },

  async saveHabit(habit) {
    const habits = await this.getHabits();
    const existingIndex = habits.findIndex(h => h.id === habit.id);
    
    if (existingIndex >= 0) {
      habits[existingIndex] = habit;
    } else {
      habits.push(habit);
    }
    
    return this.saveHabits(habits);
  },

  async deleteHabit(habitId) {
    const habits = await this.getHabits();
    const filtered = habits.filter(h => h.id !== habitId);
    await this.saveHabits(filtered);
    
    // Also delete all entries for this habit
    const entries = await this.getHabitEntries();
    const filteredEntries = entries.filter(e => e.habitId !== habitId);
    await this.saveHabitEntries(filteredEntries);
  },

  // Habit entry management (photos/check-ins)
  async saveHabitEntries(entries) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HABIT_ENTRIES, JSON.stringify(entries));
      return true;
    } catch (error) {
      console.error('Error saving habit entries:', error);
      return false;
    }
  },

  async getHabitEntries() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.HABIT_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting habit entries:', error);
      return [];
    }
  },

  async saveHabitEntry(entry) {
    const entries = await this.getHabitEntries();
    const existingIndex = entries.findIndex(
      e => e.habitId === entry.habitId && e.date === entry.date
    );
    
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }
    
    return this.saveHabitEntries(entries);
  },

  async getHabitEntriesByHabit(habitId) {
    const entries = await this.getHabitEntries();
    return entries.filter(e => e.habitId === habitId);
  },

  async deleteHabitEntry(habitId, date) {
    const entries = await this.getHabitEntries();
    const filtered = entries.filter(
      e => !(e.habitId === habitId && e.date === date)
    );
    return this.saveHabitEntries(filtered);
  },
};

