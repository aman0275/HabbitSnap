import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';
import { TYPOGRAPHY } from '../constants/theme';
import Badge from './Badge';

const AIInsightsCard = ({
  consistency,
  progress,
  suggestions,
  patterns,
  predictions,
  trends,
  habitStrength,
  achievements,
  motivation,
}) => {
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

      {/* Habit Strength */}
      {habitStrength && habitStrength.score > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Habit Strength</Text>
            <Badge
              text={habitStrength.level.replace("_", " ")}
              variant={habitStrength.score > 0.65 ? "success" : "primary"}
            />
          </View>
          <Text style={styles.message}>{habitStrength.description}</Text>
          {habitStrength.insights && habitStrength.insights.length > 0 && (
            <View style={styles.insights}>
              {habitStrength.insights.map((insight, index) => (
                <View key={index} style={styles.insightItem}>
                  <Ionicons
                    name={insight.icon}
                    size={16}
                    color={
                      insight.type === "success"
                        ? COLORS.success
                        : insight.type === "warning"
                        ? COLORS.warning
                        : COLORS.textSecondary
                    }
                  />
                  <Text style={styles.insightText}>{insight.message}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Motivational Message */}
      {motivation && motivation.primary && (
        <View style={[styles.section, styles.motivationSection]}>
          <View style={styles.motivationHeader}>
            <Ionicons name={motivation.primary.icon} size={24} color={COLORS.primary} />
            <Text style={styles.motivationText}>{motivation.primary.message}</Text>
          </View>
        </View>
      )}

      {/* Achievements */}
      {achievements &&
        achievements.achievements &&
        achievements.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements 🏆</Text>
            {achievements.achievements.slice(0, 3).map((achievement, index) => (
              <View key={index} style={styles.achievement}>
                <Ionicons name={achievement.icon} size={20} color={COLORS.primary} />
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

      {/* Patterns */}
      {patterns &&
        patterns.hasPatterns &&
        patterns.insights &&
        patterns.insights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patterns</Text>
            {patterns.insights.map((insight, index) => (
              <View key={index} style={styles.patternInsight}>
                <Ionicons name={insight.icon} size={18} color={COLORS.primary} />
                <Text style={styles.patternText}>{insight.message}</Text>
              </View>
            ))}
          </View>
        )}

      {/* Predictions & Alerts */}
      {predictions && predictions.hasPredictions && predictions.alerts && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Predictions</Text>
          {predictions.alerts.map((alert, index) => (
            <View
              key={index}
              style={[
                styles.alert,
                alert.type === "urgent" && styles.alertUrgent,
                alert.type === "warning" && styles.alertWarning,
              ]}
            >
              <Ionicons
                name={alert.icon}
                size={20}
                color={
                  alert.type === "urgent"
                    ? COLORS.error
                    : alert.type === "warning"
                    ? COLORS.warning
                    : COLORS.primary
                }
              />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Trends */}
      {trends &&
        trends.hasTrends &&
        trends.insights &&
        trends.insights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trends</Text>
            {trends.insights.map((insight, index) => (
              <View key={index} style={styles.trendInsight}>
                <Ionicons
                  name={insight.icon}
                  size={18}
                  color={
                    insight.type === "success"
                      ? COLORS.success
                      : insight.type === "warning"
                      ? COLORS.warning
                      : COLORS.primary
                  }
                />
                <Text style={styles.trendText}>{insight.message}</Text>
              </View>
            ))}
          </View>
        )}

      {/* Suggestions */}
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

      {/* Pattern Recommendations */}
      {patterns &&
        patterns.hasPatterns &&
        patterns.recommendations &&
        patterns.recommendations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Optimization Tips</Text>
            {patterns.recommendations.map((rec, index) => (
              <View key={index} style={styles.suggestion}>
                <View style={styles.suggestionHeader}>
                  <Ionicons name={rec.icon} size={20} color={COLORS.primary} />
                  <Text style={styles.suggestionTitle}>{rec.title}</Text>
                </View>
                <Text style={styles.suggestionMessage}>{rec.message}</Text>
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
  motivationSection: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  motivationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  motivationText: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.background,
    marginBottom: SPACING.xs,
  },
  achievementContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  achievementTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs / 2,
  },
  achievementDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  patternInsight: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  patternText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  alert: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    marginBottom: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  alertUrgent: {
    backgroundColor: COLORS.error + "15",
    borderLeftColor: COLORS.error,
  },
  alertWarning: {
    backgroundColor: COLORS.warning + "15",
    borderLeftColor: COLORS.warning,
  },
  alertContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  alertTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs / 2,
  },
  alertMessage: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  trendInsight: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  trendText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
});

export default AIInsightsCard;

