import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Animated,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useHabits } from "../hooks/useHabits";
import { ALERTS, EMPTY_STATES } from "../constants/messages";
import { useColors } from "../utils/colors";
import {
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";
import HabitCard from "../components/HabitCard";
import EmptyState from "../components/EmptyState";
import FloatingActionButton from "../components/FloatingActionButton";
import AnimatedView from "../components/AnimatedView";
import { useStaggerAnimation } from "../utils/animations";

export default function HomeScreen() {
  const navigation = useNavigation();
  const COLORS = useColors();
  const insets = useSafeAreaInsets();
  const styles = createStyles(COLORS, insets);
  const { habits, deleteHabit } = useHabits();

  const handleDeleteHabit = (habit) => {
    Alert.alert(
      ALERTS.DELETE_HABIT.title,
      ALERTS.DELETE_HABIT.message(habit.name),
      [
        { text: ALERTS.DELETE_HABIT.cancel, style: "cancel" },
        {
          text: ALERTS.DELETE_HABIT.confirm,
          style: "destructive",
          onPress: () => deleteHabit(habit.id),
        },
      ]
    );
  };

  const HabitCardWrapper = ({ item, index }) => {
    const animatedStyle = useStaggerAnimation(index, 0);
    return (
      <Animated.View style={animatedStyle}>
        <HabitCard
          habit={item}
          onPress={() => navigation.navigate("HabitDetail", { habit: item })}
          onDelete={() => handleDeleteHabit(item)}
        />
      </Animated.View>
    );
  };

  const renderHabitCard = ({ item, index }) => (
    <HabitCardWrapper item={item} index={index} />
  );

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
            <Text style={styles.headerTitle}>My Habits</Text>
            <Text style={styles.headerSubtitle}>
              {habits.length} active {habits.length === 1 ? "habit" : "habits"}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </AnimatedView>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      {habits.length > 0 && renderHeader()}
      {habits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyState
            {...EMPTY_STATES.NO_HABITS}
            onAction={() => navigation.navigate("AddHabit")}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={habits}
            renderItem={renderHabitCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<View style={styles.listHeader} />}
          />
          <FloatingActionButton
            onPress={() => navigation.navigate("AddHabit")}
            icon="add"
          />
        </>
      )}
    </SafeAreaView>
  );
}

const createStyles = (COLORS, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      marginTop: -insets.top,
      paddingTop: insets.top + SPACING.xl,
      paddingBottom: SPACING.xl,
      paddingHorizontal: SPACING.lg,
      ...SHADOWS.md,
    },
    headerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    listHeader: {
      height: SPACING.md,
    },
    listContent: {
      padding: SPACING.lg,
      paddingBottom: 100,
    },
  });
