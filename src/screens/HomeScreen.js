import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHabits } from '../hooks/useHabits';
import { ALERTS, EMPTY_STATES } from '../constants/messages';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/theme';
import HabitCard from '../components/HabitCard';
import EmptyState from '../components/EmptyState';
import FloatingActionButton from '../components/FloatingActionButton';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { habits, deleteHabit } = useHabits();

  const handleDeleteHabit = (habit) => {
    Alert.alert(
      ALERTS.DELETE_HABIT.title,
      ALERTS.DELETE_HABIT.message(habit.name),
      [
        { text: ALERTS.DELETE_HABIT.cancel, style: 'cancel' },
        {
          text: ALERTS.DELETE_HABIT.confirm,
          style: 'destructive',
          onPress: () => deleteHabit(habit.id),
        },
      ]
    );
  };

  const renderHabitCard = ({ item }) => (
    <HabitCard
      habit={item}
      onPress={() => navigation.navigate('HabitDetail', { habit: item })}
      onDelete={() => handleDeleteHabit(item)}
    />
  );

  return (
    <View style={styles.container}>
      {habits.length === 0 ? (
        <EmptyState
          {...EMPTY_STATES.NO_HABITS}
          onAction={() => navigation.navigate('AddHabit')}
        />
      ) : (
        <>
          <FlatList
            data={habits}
            renderItem={renderHabitCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <FloatingActionButton
            onPress={() => navigation.navigate('AddHabit')}
            icon="add"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
});

