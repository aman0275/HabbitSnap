import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { dashboardService } from "../services/dashboardService";
import { dashboardAIService } from "../services/dashboardAIService";

/**
 * Custom hook for dashboard data
 * Provides aggregated statistics and insights for dashboard display
 */
export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [entriesOverTime, setEntriesOverTime] = useState([]);
  const [habitDistribution, setHabitDistribution] = useState([]);
  const [weeklyPattern, setWeeklyPattern] = useState([]);
  const [topHabits, setTopHabits] = useState([]);
  const [streakStats, setStreakStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        overallStats,
        entriesData,
        distribution,
        weekly,
        top,
        streaks,
        recent,
        aiData,
      ] = await Promise.all([
        dashboardService.getOverallStats(),
        dashboardService.getEntriesOverTime(30),
        dashboardService.getHabitDistribution(),
        dashboardService.getWeeklyPattern(),
        dashboardService.getTopHabits(5),
        dashboardService.getStreakStats(),
        dashboardService.getRecentActivity(7),
        dashboardAIService.getOverallAIInsights(),
      ]);

      // Calculate percentages for habit distribution
      const total = distribution.reduce((sum, h) => sum + h.count, 0);
      const distributionWithPercentages = distribution.map(h => ({
        ...h,
        percentage: total > 0 ? Math.round((h.count / total) * 100) : 0,
      }));

      setStats(overallStats);
      setEntriesOverTime(entriesData);
      setHabitDistribution(distributionWithPercentages);
      setWeeklyPattern(weekly);
      setTopHabits(top);
      setStreakStats(streaks);
      setRecentActivity(recent);
      setAiInsights(aiData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [loadDashboardData])
  );

  return {
    stats,
    entriesOverTime,
    habitDistribution,
    weeklyPattern,
    topHabits,
    streakStats,
    recentActivity,
    aiInsights,
    loading,
    error,
    refresh: loadDashboardData,
  };
};

