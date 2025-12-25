import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { SPLASH_CONFIG } from "../../constants/splash";

/**
 * Splash Logo Component
 * Animated camera icon with glassmorphism effect
 * Uses React Native's built-in Animated API (compatible with Expo Go)
 */
const SplashLogo = ({
  logoScale,
  logoOpacity,
  logoRotation,
  iconScale,
  iconRotation,
}) => {
  const logoAnimatedStyle = {
    transform: [
      { scale: logoScale },
      { 
        rotate: logoRotation.interpolate({
          inputRange: [-360, 0, 360],
          outputRange: ['-360deg', '0deg', '360deg'],
        }) 
      },
    ],
    opacity: logoOpacity,
  };

  const iconAnimatedStyle = {
    transform: [
      { scale: iconScale },
      { 
        rotate: iconRotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }) 
      },
    ],
  };

  return (
    <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
      <Animated.View style={iconAnimatedStyle}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={SPLASH_CONFIG.ICON.name}
            size={SPLASH_CONFIG.ICON.size}
            color={COLORS.textWhite}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: SPLASH_CONFIG.LOGO_MARGIN_BOTTOM,
  },
  iconWrapper: {
    width: SPLASH_CONFIG.ICON.containerSize,
    height: SPLASH_CONFIG.ICON.containerSize,
    borderRadius: SPLASH_CONFIG.ICON.containerSize / 2,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
});

export default SplashLogo;
