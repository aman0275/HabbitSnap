import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { BORDER_RADIUS, SHADOWS } from "../constants/theme";

const FloatingActionButton = ({ onPress, icon = "add", colors, size = 64 }) => {
  const buttonColors = colors || [COLORS.primary, COLORS.primaryLight];
  const iconSize = size * 0.4375; // ~28 for 64, scales proportionally

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.spring(scale, {
      toValue: 1,
      tension: 100,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
      tension: 150,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 8,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale }],
  };

  return (
    <Animated.View
      style={[
        styles.fab,
        { width: size, height: size, borderRadius: size / 2 },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{ width: "100%", height: "100%" }}
      >
        <LinearGradient
          colors={buttonColors}
          style={[styles.gradient, { borderRadius: size / 2 }, SHADOWS.lg]}
        >
          <Ionicons name={icon} size={iconSize} color={COLORS.textWhite} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    zIndex: 10,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingActionButton;
