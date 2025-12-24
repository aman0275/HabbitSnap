import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';
import { TYPOGRAPHY } from '../constants/theme';
import Badge from './Badge';

const AIInsightsCard = ({ consistency, progress, suggestions }) => {
  const getConsistencyColor = (consistency) => {
    switch (consistency) {
      case 'excellent': return COLORS.success;
      case 'good': return COLORS.primary;
      case 'fair': return COLORS.warning;
      default: return COLORS.error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="sparkles" size={24} color={COLORS.primary} />
        <Text style={styles.title}>AI Insights</Text>
      </View>

      {consistency && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Consistency</Text>
            <Badge 
              text={consistency.consistency} 
              variant={consistency.consistency === 'excellent' ? 'success' : 'primary'}
            />
          </View>
          <Text style={styles.message}>{consistency.message}</Text>
          {consistency.insights && consistency.insights.length > 0 && (
            <View style={styles.insights}>
              {consistency.insights.map((insight, index) => (
                <View key={index} style={styles.insightItem}>
                  <Ionicons name="information-circle" size={16} color={COLORS.textSecondary} />
                  <Text style={styles.insightText}>{insight}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {progress && progress.hasProgress && progress.insights && progress.insights.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>
          {progress.insights.map((insight, index) => (
            <View key={index} style={[styles.progressInsight, styles[insight.type]]}>
              <Ionicons name={insight.icon} size={20} color={COLORS.primary} />
              <Text style={styles.progressText}>{insight.message}</Text>
            </View>
          ))}
        </View>
      )}

      {suggestions && suggestions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggestions</Text>
          {suggestions.map((suggestion, index) => (
            <View key={index} style={styles.suggestion}>
              <View style={styles.suggestionHeader}>
                <Ionicons name={suggestion.icon} size={20} color={COLORS.primary} />
                <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
              </View>
              <Text style={styles.suggestionMessage}>{suggestion.message}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h3,
    marginLeft: SPACING.sm,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  message: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  insights: {
    marginTop: SPACING.xs,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  insightText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
    flex: 1,
  },
  progressInsight: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
    backgroundColor: COLORS.background,
  },
  progressText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  suggestion: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    marginBottom: SPACING.sm,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  suggestionTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginLeft: SPACING.sm,
    color: COLORS.textPrimary,
  },
  suggestionMessage: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xl + 4,
  },
});

export default AIInsightsCard;

