import { useState, useEffect, useCallback } from 'react';
import { aiService } from '../services/ai';

/**
 * Custom hook for AI insights
 * Provides consistency analysis, progress tracking, and smart suggestions
 */
export const useAIInsights = (habit, entries) => {
  const [consistency, setConsistency] = useState(null);
  const [progress, setProgress] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInsights = useCallback(async () => {
    if (!habit || !entries || !Array.isArray(entries)) return;

    try {
      setLoading(true);
      setError(null);

      const [consistencyData, progressData, suggestionsData] = await Promise.all([
        aiService.analyzeConsistency(entries),
        aiService.analyzeProgress(entries),
        aiService.getSmartSuggestions(habit, entries),
      ]);

      setConsistency(consistencyData);
      setProgress(progressData);
      setSuggestions(Array.isArray(suggestionsData) ? suggestionsData : []);
    } catch (err) {
      setError(err.message);
      console.error('Error loading AI insights:', err);
    } finally {
      setLoading(false);
    }
  }, [habit, entries]);

  useEffect(() => {
    loadInsights();
  }, [loadInsights]);

  return {
    consistency,
    progress,
    suggestions,
    loading,
    error,
    refresh: loadInsights,
  };
};

