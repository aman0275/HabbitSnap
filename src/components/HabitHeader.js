import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/theme';
import { TYPOGRAPHY } from '../constants/theme';

const HabitHeader = ({ habit, streak, totalEntries }) => {
  const StatBox = ({ icon, value, label }) => (
    <View style={styles.statBox}>
      <Ionicons name={icon} size={24} color={COLORS.white} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={[styles.header, { backgroundColor: habit.color || COLORS.primary }]}>
      <View style={styles.headerContent}>
        <Text style={styles.habitName}>{habit.name}</Text>
        {habit.description && (
          <Text style={styles.habitDescription}>{habit.description}</Text>
        )}
        <View style={styles.statsContainer}>
          <StatBox icon="flame" value={streak} label="Day Streak" />
          <StatBox icon="images" value={totalEntries} label="Total Photos" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  headerContent: {
    alignItems: 'center',
  },
  habitName: {
    ...TYPOGRAPHY.h1,
    fontSize: 28,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  habitDescription: {
    ...TYPOGRAPHY.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: SPACING.sm,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.sm,
  },
  statLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: SPACING.xs,
  },
});

export default HabitHeader;

