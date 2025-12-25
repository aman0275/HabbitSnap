import React from "react";
import { Text, StyleSheet, Animated } from "react-native";
import { COLORS } from "../../constants/colors";
import { TYPOGRAPHY } from "../../constants/theme";
import { SPLASH_CONFIG } from "../../constants/splash";

/**
 * Splash Text Component
 * Animated title and subtitle text
 * Uses React Native's built-in Animated API (compatible with Expo Go)
 */
const SplashText = ({
  titleOpacity,
  titleTranslateY,
  subtitleOpacity,
  subtitleTranslateY,
}) => {
  const titleAnimatedStyle = {
    opacity: titleOpacity,
    transform: [{ translateY: titleTranslateY }],
  };

  const subtitleAnimatedStyle = {
    opacity: subtitleOpacity,
    transform: [{ translateY: subtitleTranslateY }],
  };

  return (
    <>
      <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
        <Text style={styles.title}>{SPLASH_CONFIG.TITLE.text}</Text>
      </Animated.View>

      <Animated.View style={[styles.subtitleContainer, subtitleAnimatedStyle]}>
        <Text style={styles.subtitle}>{SPLASH_CONFIG.SUBTITLE.text}</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: SPLASH_CONFIG.TITLE_MARGIN_BOTTOM,
  },
  title: {
    ...TYPOGRAPHY.display,
    color: COLORS.textWhite,
    fontSize: SPLASH_CONFIG.TITLE.fontSize,
    fontWeight: SPLASH_CONFIG.TITLE.fontWeight,
    letterSpacing: SPLASH_CONFIG.TITLE.letterSpacing,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitleContainer: {
    marginTop: SPLASH_CONFIG.SUBTITLE_MARGIN_TOP,
  },
  subtitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textWhite,
    fontSize: SPLASH_CONFIG.SUBTITLE.fontSize,
    fontWeight: SPLASH_CONFIG.SUBTITLE.fontWeight,
    opacity: SPLASH_CONFIG.SUBTITLE.opacity,
    letterSpacing: SPLASH_CONFIG.SUBTITLE.letterSpacing,
  },
});

export default SplashText;
