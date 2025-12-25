import React from "react";
import { View, StyleSheet } from "react-native";
import { SPLASH_CONFIG } from "../../constants/splash";

/**
 * Splash Decoration Component
 * Bottom decorative dots
 */
const SplashDecoration = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <View style={[styles.dot, styles.dotDelay1]} />
      <View style={[styles.dot, styles.dotDelay2]} />
    </View>
  );
};

const DOT_CONFIG = {
  size: 8,
  opacity: {
    default: 0.6,
    delay1: 0.7,
    delay2: 0.5,
  },
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: SPLASH_CONFIG.BOTTOM_DECORATION_OFFSET,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: DOT_CONFIG.size,
    height: DOT_CONFIG.size,
    borderRadius: DOT_CONFIG.size / 2,
    backgroundColor: `rgba(255, 255, 255, ${DOT_CONFIG.opacity.default})`,
  },
  dotDelay1: {
    opacity: DOT_CONFIG.opacity.delay1,
  },
  dotDelay2: {
    opacity: DOT_CONFIG.opacity.delay2,
  },
});

export default SplashDecoration;

