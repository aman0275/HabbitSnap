import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";

const { width, height } = Dimensions.get("window");

/**
 * Splash Background Component
 * Renders gradient background with decorative circles
 */
const SplashBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={COLORS.primaryGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {/* Decorative background circles for depth */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      {children}
    </LinearGradient>
  );
};

const CIRCLE_CONFIG = {
  circle1: {
    size: width * 1.5,
    top: -width * 0.5,
    right: -width * 0.3,
    opacity: 0.1,
  },
  circle2: {
    size: width * 1.2,
    bottom: -width * 0.4,
    left: -width * 0.2,
    opacity: 0.08,
  },
  circle3: {
    size: width * 0.8,
    top: height * 0.3,
    left: -width * 0.2,
    opacity: 0.05,
  },
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  circle1: {
    position: "absolute",
    width: CIRCLE_CONFIG.circle1.size,
    height: CIRCLE_CONFIG.circle1.size,
    borderRadius: CIRCLE_CONFIG.circle1.size / 2,
    backgroundColor: `rgba(255, 255, 255, ${CIRCLE_CONFIG.circle1.opacity})`,
    top: CIRCLE_CONFIG.circle1.top,
    right: CIRCLE_CONFIG.circle1.right,
  },
  circle2: {
    position: "absolute",
    width: CIRCLE_CONFIG.circle2.size,
    height: CIRCLE_CONFIG.circle2.size,
    borderRadius: CIRCLE_CONFIG.circle2.size / 2,
    backgroundColor: `rgba(255, 255, 255, ${CIRCLE_CONFIG.circle2.opacity})`,
    bottom: CIRCLE_CONFIG.circle2.bottom,
    left: CIRCLE_CONFIG.circle2.left,
  },
  circle3: {
    position: "absolute",
    width: CIRCLE_CONFIG.circle3.size,
    height: CIRCLE_CONFIG.circle3.size,
    borderRadius: CIRCLE_CONFIG.circle3.size / 2,
    backgroundColor: `rgba(255, 255, 255, ${CIRCLE_CONFIG.circle3.opacity})`,
    top: CIRCLE_CONFIG.circle3.top,
    left: CIRCLE_CONFIG.circle3.left,
  },
});

export default SplashBackground;

