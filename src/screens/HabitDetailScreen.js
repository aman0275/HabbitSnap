import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHabitEntries } from '../hooks/useHabitEntries';
import { useAIInsights } from '../hooks/useAIInsights';
import { ALERTS, EMPTY_STATES } from '../constants/messages';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/theme';
import HabitHeader from '../components/HabitHeader';
import PhotoGridItem from '../components/PhotoGridItem';
import EmptyState from '../components/EmptyState';
import FloatingActionButton from '../components/FloatingActionButton';
import AIInsightsCard from '../components/AIInsightsCard';

export default function HabitDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { habit } = route.params;
  const { entries, streak, deleteEntry } = useHabitEntries(habit.id);
  const {
    consistency,
    progress,
    suggestions,
    patterns,
    predictions,
    trends,
    habitStrength,
    achievements,
    motivation,
  } = useAIInsights(habit, entries);

  const handleCapturePhoto = () => {
    navigation.navigate('Camera', { habit });
  };

  const handleDeleteEntry = (entry) => {
    Alert.alert(
      ALERTS.DELETE_ENTRY.title,
      ALERTS.DELETE_ENTRY.message,
      [
        { text: ALERTS.DELETE_ENTRY.cancel, style: 'cancel' },
        {
          text: ALERTS.DELETE_ENTRY.confirm,
          style: 'destructive',
          onPress: () => deleteEntry(entry.id || entry.date), // Support both old and new format
        },
      ]
    );
  };

  const renderPhotoItem = ({ item }) => (
    <PhotoGridItem
      entry={item}
      onLongPress={() => handleDeleteEntry(item)}
    />
  );

  return (
    <View style={styles.container}>
      <HabitHeader
        habit={habit}
        streak={streak}
        totalEntries={entries.length}
      />

      {entries.length === 0 ? (
        <EmptyState
          {...EMPTY_STATES.NO_PHOTOS}
          onAction={handleCapturePhoto}
        />
      ) : (
        <>
          <FlatList
            data={entries}
            renderItem={renderPhotoItem}
            keyExtractor={(item) => item.id || `${item.date}-${item.createdAt}`}
            numColumns={3}
            ListHeaderComponent={() => (
              (consistency ||
                progress ||
                (suggestions && suggestions.length > 0) ||
                patterns ||
                predictions ||
                trends ||
                habitStrength ||
                achievements ||
                motivation) ? (
                <View style={styles.insightsContainer}>
                  <AIInsightsCard
                    consistency={consistency}
                    progress={progress}
                    suggestions={suggestions}
                    patterns={patterns}
                    predictions={predictions}
                    trends={trends}
                    habitStrength={habitStrength}
                    achievements={achievements}
                    motivation={motivation}
                  />
                </View>
              ) : null
            )}
            contentContainerStyle={styles.photoGrid}
          />
          <FloatingActionButton
            onPress={handleCapturePhoto}
            icon="camera"
            colors={[habit.color || COLORS.primary, habit.color || COLORS.primaryLight]}
          />
        </>
      )}
      <SafeAreaView edges={["bottom"]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  insightsContainer: {
    padding: SPACING.lg,
    paddingBottom: 0,
  },
  photoGrid: {
    padding: SPACING.lg,
    paddingTop: 0,
    paddingBottom: 100,
  },
});

