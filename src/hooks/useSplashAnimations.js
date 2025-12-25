import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { SPLASH_CONFIG } from "../constants/splash";

/**
 * Custom hook for splash screen animations
 * Uses React Native's built-in Animated API (compatible with Expo Go)
 */
export const useSplashAnimations = (onFinish) => {
  // Animated values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(SPLASH_CONFIG.ICON.initialRotation)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;
  const iconScale = useRef(new Animated.Value(0)).current;
  const iconRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo scale and fade animation
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        ...SPLASH_CONFIG.LOGO_SPRING,
        delay: SPLASH_CONFIG.LOGO_DELAY,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: SPLASH_CONFIG.LOGO_FADE_DURATION,
        delay: SPLASH_CONFIG.LOGO_DELAY,
        useNativeDriver: true,
      }),
      Animated.spring(logoRotation, {
        toValue: 0,
        ...SPLASH_CONFIG.LOGO_ROTATION_SPRING,
        delay: SPLASH_CONFIG.LOGO_DELAY,
        useNativeDriver: true,
      }),
    ]).start();

    // Icon pulse and rotation animation
    Animated.sequence([
      Animated.spring(iconScale, {
        toValue: SPLASH_CONFIG.ICON.pulseScale,
        ...SPLASH_CONFIG.ICON_SCALE_SPRING,
        delay: SPLASH_CONFIG.ICON_DELAY,
        useNativeDriver: true,
      }),
      Animated.spring(iconScale, {
        toValue: 1,
        tension: 150,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(iconRotation, {
        toValue: 360,
        duration: SPLASH_CONFIG.ICON_ROTATION_DURATION,
        delay: SPLASH_CONFIG.ICON_DELAY,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(iconRotation, {
        toValue: 0,
        ...SPLASH_CONFIG.ICON_ROTATION_SPRING,
        useNativeDriver: true,
      }),
    ]).start();

    // Title fade in and slide up animation
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: SPLASH_CONFIG.TITLE_FADE_DURATION,
        delay: SPLASH_CONFIG.TITLE_DELAY,
        useNativeDriver: true,
      }),
      Animated.spring(titleTranslateY, {
        toValue: 0,
        ...SPLASH_CONFIG.TEXT_SPRING,
        delay: SPLASH_CONFIG.TITLE_DELAY,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtitle fade in and slide up animation
    Animated.parallel([
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: SPLASH_CONFIG.SUBTITLE_FADE_DURATION,
        delay: SPLASH_CONFIG.SUBTITLE_DELAY,
        useNativeDriver: true,
      }),
      Animated.spring(subtitleTranslateY, {
        toValue: 0,
        ...SPLASH_CONFIG.TEXT_SPRING,
        delay: SPLASH_CONFIG.SUBTITLE_DELAY,
        useNativeDriver: true,
      }),
    ]).start();

    // Fade out and finish after display duration
    const timer = setTimeout(() => {
      const fadeOut = Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: SPLASH_CONFIG.FADE_OUT_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 0,
          duration: SPLASH_CONFIG.FADE_OUT_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleOpacity, {
          toValue: 0,
          duration: SPLASH_CONFIG.FADE_OUT_DURATION,
          useNativeDriver: true,
        }),
      ]);

      fadeOut.start(() => {
        onFinish();
      });
    }, SPLASH_CONFIG.DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return {
    logoScale,
    logoOpacity,
    logoRotation,
    titleOpacity,
    titleTranslateY,
    subtitleOpacity,
    subtitleTranslateY,
    iconScale,
    iconRotation,
  };
};
