import { useState, useEffect, useCallback } from "react";
import { aiService } from "../services/ai";

/**
 * Custom hook for AI insights
 * Provides comprehensive AI analysis including:
 * - Consistency analysis
 * - Progress tracking
 * - Smart suggestions
 * - Pattern detection
 * - Predictive analytics
 * - Trend analysis
 * - Habit strength scoring
 * - Achievement recognition
 * - Motivational insights
 */
export const useAIInsights = (habit, entries) => {
  const [consistency, setConsistency] = useState(null);
  const [progress, setProgress] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [patterns, setPatterns] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [trends, setTrends] = useState(null);
  const [habitStrength, setHabitStrength] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [motivation, setMotivation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInsights = useCallback(async () => {
    if (!habit || !entries || !Array.isArray(entries)) return;

    try {
      setLoading(true);
      setError(null);

      // Load all AI insights in parallel for better performance
      const [
        consistencyData,
        progressData,
        suggestionsData,
        patternsData,
        predictionsData,
        trendsData,
        strengthData,
        achievementsData,
        motivationData,
      ] = await Promise.all([
        aiService.analyzeConsistency(entries),
        aiService.analyzeProgress(entries),
        aiService.getSmartSuggestions(habit, entries),
        aiService.analyzePatterns(entries),
        aiService.analyzePredictions(entries, habit),
        aiService.analyzeTrends(entries),
        aiService.analyzeHabitStrength(entries),
        aiService.recognizeAchievements(entries),
        aiService.getMotivationalInsights(entries, habit),
      ]);

      setConsistency(consistencyData);
      setProgress(progressData);
      setSuggestions(Array.isArray(suggestionsData) ? suggestionsData : []);
      setPatterns(patternsData);
      setPredictions(predictionsData);
      setTrends(trendsData);
      setHabitStrength(strengthData);
      setAchievements(achievementsData);
      setMotivation(motivationData);
    } catch (err) {
      setError(err.message);
      console.error("Error loading AI insights:", err);
    } finally {
      setLoading(false);
    }
  }, [habit, entries]);

  useEffect(() => {
    loadInsights();
  }, [loadInsights]);

  return {
    // Original insights
    consistency,
    progress,
    suggestions,
    // Enhanced insights
    patterns,
    predictions,
    trends,
    habitStrength,
    achievements,
    motivation,
    // State
    loading,
    error,
    refresh: loadInsights,
  };
};

