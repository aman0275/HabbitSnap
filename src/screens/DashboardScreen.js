import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDashboard } from '../hooks/useDashboard';
import { useColors } from '../utils/colors';
import { TYPOGRAPHY, SHADOWS, BORDER_RADIUS, SPACING } from '../constants/theme';
import { LineChart, BarChart, PieChart } from "../components/charts";
import StatCard from "../components/StatCard";
import DashboardAICard from "../components/DashboardAICard";
import AnimatedView from '../components/AnimatedView';

/**
 * Dashboard Screen
 * Displays comprehensive insights, statistics, and charts
 * Uses React Native's built-in Animated API (compatible with Expo Go)
 */
export default function DashboardScreen() {
  const navigation = useNavigation();
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  const {
    stats,
    entriesOverTime,
    habitDistribution,
    weeklyPattern,
    topHabits,
    streakStats,
    aiInsights,
    loading,
    refresh,
  } = useDashboard();

  const renderHeader = () => (
    <AnimatedView delay={0}>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>Your habit insights</Text>
          </View>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('AddHabit')}
          >
            <Ionicons name="add" size={24} color={COLORS.textWhite} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </AnimatedView>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <StatCard
        title="Total Habits"
        value={stats?.totalHabits || 0}
        icon="checkmark-circle"
        iconColor={COLORS.chart.primary}
        style={styles.statCard}
        delay={100}
      />
      <StatCard
        title="Total Entries"
        value={stats?.totalEntries || 0}
        icon="images"
        iconColor={COLORS.chart.secondary}
        style={styles.statCard}
        delay={200}
      />
      <StatCard
        title="Avg Streak"
        value={stats?.averageStreak || 0}
        icon="flame"
        iconColor={COLORS.chart.warning}
        style={styles.statCard}
        gradient={COLORS.primaryGradient}
        delay={300}
      />
      <StatCard
        title="Completion Rate"
        value={`${stats?.completionRate || 0}%`}
        icon="trending-up"
        iconColor={COLORS.chart.success}
        style={styles.statCard}
        delay={400}
      />
    </View>
  );

  const renderStreakInsight = () => {
    if (!streakStats) return null;

    return (
      <AnimatedView delay={450} style={styles.insightCard}>
        <View style={styles.insightHeader}>
          <Ionicons name="flame" size={24} color={COLORS.warning} />
          <Text style={styles.insightTitle}>Streak Insights</Text>
        </View>
        <View style={styles.insightContent}>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Current Streak</Text>
            <Text style={styles.insightValue}>{streakStats.current} days</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Longest Streak</Text>
            <Text style={styles.insightValue}>{streakStats.longest} days</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightLabel}>Average Streak</Text>
            <Text style={styles.insightValue}>{streakStats.average} days</Text>
          </View>
        </View>
      </AnimatedView>
    );
  };

  const renderTopHabits = () => {
    if (!topHabits || topHabits.length === 0) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Performing Habits</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.sectionLink}>View All</Text>
          </TouchableOpacity>
        </View>
        {topHabits.map((habit, index) => (
          <AnimatedView key={habit.id} delay={800 + index * 100}>
            <TouchableOpacity
              style={styles.habitItem}
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'HabitDetail',
                  params: { habit },
                })
              }
            >
              <View style={styles.habitRank}>
                <Text style={styles.habitRankText}>#{index + 1}</Text>
              </View>
              <View style={[styles.habitColor, { backgroundColor: habit.color }]} />
              <View style={styles.habitInfo}>
                <Text style={styles.habitName}>{habit.name}</Text>
                <View style={styles.habitStats}>
                  <View style={styles.habitStatItem}>
                    <Ionicons name="flame" size={14} color={COLORS.warning} />
                    <Text style={styles.habitStatText}>{habit.streak} days</Text>
                  </View>
                  <View style={styles.habitStatItem}>
                    <Ionicons name="images" size={14} color={COLORS.chart.primary} />
                    <Text style={styles.habitStatText}>{habit.totalEntries} entries</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
            </TouchableOpacity>
          </AnimatedView>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={COLORS.primary} />
        }
      >
        {stats && renderStats()}

        {/* AI Insights Cards */}
        {aiInsights && (
          <AnimatedView delay={450}>
            <DashboardAICard
              aiInsights={aiInsights}
              onHabitPress={(habit) =>
                navigation.navigate("Home", {
                  screen: "HabitDetail",
                  params: { habit },
                })
              }
            />
          </AnimatedView>
        )}

        {renderStreakInsight()}

        {entriesOverTime.length > 0 && (
          <AnimatedView delay={500} style={styles.section}>
            <Text style={styles.sectionTitle}>Activity Over Time</Text>
            <View style={styles.chartCard}>
              <LineChart
                data={entriesOverTime}
                color={COLORS.chart.primary}
                height={220}
                showArea
              />
            </View>
          </AnimatedView>
        )}

        {weeklyPattern.length > 0 && (
          <AnimatedView delay={600} style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Pattern</Text>
            <View style={styles.chartCard}>
              <BarChart
                data={weeklyPattern}
                color={COLORS.chart.secondary}
                height={220}
              />
            </View>
          </AnimatedView>
        )}

        {habitDistribution.length > 0 && (
          <AnimatedView delay={700} style={styles.section}>
            <Text style={styles.sectionTitle}>Habit Distribution</Text>
            <View style={styles.chartCard}>
              <PieChart data={habitDistribution} height={300} />
            </View>
          </AnimatedView>
        )}

        {renderTopHabits()}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textWhite,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textWhite,
    opacity: 0.9,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.lg,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    minWidth: '48%',
    marginBottom: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  sectionLink: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primary,
  },
  chartCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  insightCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  insightTitle: {
    ...TYPOGRAPHY.h5,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  insightContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  insightItem: {
    alignItems: 'center',
  },
  insightLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  insightValue: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  habitRank: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  habitRankText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.textSecondary,
  },
  habitColor: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  habitStats: {
    flexDirection: 'row',
  },
  habitStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  habitStatText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  bottomSpacer: {
    height: SPACING.xxxl,
  },
});
