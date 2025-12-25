import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../../utils/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../../constants/theme";

const AIAchievementsCard = ({ totalAchievements }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  if (!totalAchievements || totalAchievements.total === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Achievements 🏆</Text>
      {totalAchievements.recent.slice(0, 3).map((achievement, index) => (
        <View key={index} style={styles.achievement}>
          <Ionicons name={achievement.icon} size={20} color={COLORS.primary} />
          <Text style={styles.achievementText}>{achievement.title}</Text>
        </View>
      ))}
    </View>
  );
};

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  title: {
    ...TYPOGRAPHY.h5,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  achievementText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
});

export default AIAchievementsCard;


