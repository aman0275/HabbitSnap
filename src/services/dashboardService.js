import { storage } from './storage';
import { calculateStreak } from '../utils/helpers';

/**
 * Service layer for dashboard analytics and insights
 * Aggregates data from habits and entries for dashboard display
 */
export const dashboardService = {
  /**
   * Get overall statistics across all habits
   */
  async getOverallStats() {
    const habits = await storage.getHabits();
    const entries = await storage.getHabitEntries();
    
    const totalHabits = habits.length;
    const totalEntries = entries.length;
    const totalStreaks = habits.reduce((sum, habit) => {
      const habitEntries = entries.filter(e => e.habitId === habit.id);
      return sum + calculateStreak(habitEntries);
    }, 0);
    const averageStreak = totalHabits > 0 ? Math.round(totalStreaks / totalHabits) : 0;
    
    // Calculate completion rate for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentEntries = entries.filter(e => new Date(e.date) >= thirtyDaysAgo);
    const completionRate = totalHabits > 0 
      ? Math.round((recentEntries.length / (totalHabits * 30)) * 100)
      : 0;
    
    return {
      totalHabits,
      totalEntries,
      totalStreaks,
      averageStreak,
      completionRate: Math.min(completionRate, 100),
    };
  },

  /**
   * Get entries data for the last N days for line chart
   */
  async getEntriesOverTime(days = 30) {
    const entries = await storage.getHabitEntries();
    const today = new Date();
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayEntries = entries.filter(e => e.date === dateString);
      
      data.push({
        date: dateString,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count: dayEntries.length,
        dateObj: date,
      });
    }
    
    return data;
  },

  /**
   * Get habit distribution (entries per habit) for pie chart
   */
  async getHabitDistribution() {
    const habits = await storage.getHabits();
    const entries = await storage.getHabitEntries();
    
    return habits.map(habit => {
      const habitEntries = entries.filter(e => e.habitId === habit.id);
      return {
        id: habit.id,
        name: habit.name,
        count: habitEntries.length,
        color: habit.color,
        percentage: 0, // Will be calculated after
      };
    }).sort((a, b) => b.count - a.count);
  },

  /**
   * Get weekly activity pattern (entries by day of week)
   */
  async getWeeklyPattern() {
    const entries = await storage.getHabitEntries();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const pattern = weekDays.map(day => ({ day, count: 0 }));
    
    entries.forEach(entry => {
      const date = new Date(entry.date);
      const dayIndex = date.getDay();
      pattern[dayIndex].count += 1;
    });
    
    return pattern;
  },

  /**
   * Get top performing habits
   */
  async getTopHabits(limit = 5) {
    const habits = await storage.getHabits();
    const entries = await storage.getHabitEntries();
    
    const habitsWithStats = habits.map(habit => {
      const habitEntries = entries.filter(e => e.habitId === habit.id);
      const streak = calculateStreak(habitEntries);
      
      return {
        ...habit,
        streak,
        totalEntries: habitEntries.length,
        latestEntry: habitEntries.sort((a, b) => new Date(b.date) - new Date(a.date))[0],
      };
    });
    
    return habitsWithStats
      .sort((a, b) => b.streak - a.streak || b.totalEntries - a.totalEntries)
      .slice(0, limit);
  },

  /**
   * Get streak statistics
   */
  async getStreakStats() {
    const habits = await storage.getHabits();
    const entries = await storage.getHabitEntries();
    
    const streaks = habits.map(habit => {
      const habitEntries = entries.filter(e => e.habitId === habit.id);
      return calculateStreak(habitEntries);
    }).filter(s => s > 0);
    
    if (streaks.length === 0) {
      return {
        current: 0,
        longest: 0,
        average: 0,
        total: 0,
      };
    }
    
    return {
      current: streaks.reduce((sum, s) => sum + s, 0),
      longest: Math.max(...streaks),
      average: Math.round(streaks.reduce((sum, s) => sum + s, 0) / streaks.length),
      total: streaks.length,
    };
  },

  /**
   * Get recent activity (last 7 days entries)
   */
  async getRecentActivity(days = 7) {
    const entries = await storage.getHabitEntries();
    const today = new Date();
    const cutoffDate = new Date(today);
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return entries
      .filter(e => new Date(e.date) >= cutoffDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  },
};

