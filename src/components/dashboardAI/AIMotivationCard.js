import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../../utils/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../../constants/theme";

const AIMotivationCard = ({ motivationalInsight }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  if (!motivationalInsight) return null;

  return (
    <View style={styles.container}>
      <Ionicons name={motivationalInsight.icon} size={24} color={COLORS.primary} />
      <Text style={styles.text}>{motivationalInsight.message}</Text>
    </View>
  );
};

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  text: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginLeft: SPACING.md,
    flex: 1,
  },
});

export default AIMotivationCard;


