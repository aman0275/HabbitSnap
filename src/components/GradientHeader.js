import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../utils/colors";
import { SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from "../constants/theme";
import AnimatedView from "./AnimatedView";

/**
 * Reusable Gradient Header Component
 * Displays a consistent gradient header across screens with title, subtitle, and optional action button
 */
const GradientHeader = ({
  title,
  subtitle,
  rightButtonIcon,
  onRightButtonPress,
  animated = true,
}) => {
  const COLORS = useColors();
  const insets = useSafeAreaInsets();
  const styles = createStyles(COLORS, insets);

  const headerContent = (
    <LinearGradient
      colors={COLORS.primaryGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          )}
        </View>
        {rightButtonIcon && onRightButtonPress && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={onRightButtonPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={rightButtonIcon}
              size={24}
              color={COLORS.textWhite}
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );

  if (animated) {
    return <AnimatedView delay={0}>{headerContent}</AnimatedView>;
  }

  return headerContent;
};

const createStyles = (COLORS, insets) =>
  StyleSheet.create({
    header: {
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
    titleContainer: {
      flex: 1,
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
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default GradientHeader;

