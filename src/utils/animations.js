import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * Animation utilities using React Native's built-in Animated API
 * Compatible with Expo Go
 */

export const AnimationConfig = {
  timing: {
    duration: 300,
  },
  spring: {
    tension: 50,
    friction: 7,
  },
  stagger: 100, // Delay between staggered items
};

/**
 * Create a fade-in animation
 */
export const useFadeIn = (delay = 0, duration = 300) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return { opacity };
};

/**
 * Create a slide-up animation
 */
export const useSlideUp = (delay = 0, translateY = 20) => {
  const translate = useRef(new Animated.Value(translateY)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translate, {
        toValue: 0,
        ...AnimationConfig.spring,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        ...AnimationConfig.timing,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    opacity,
    transform: [{ translateY: translate }],
  };
};

/**
 * Create a scale animation
 */
export const useScale = (delay = 0, initialScale = 0.8) => {
  const scale = useRef(new Animated.Value(initialScale)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        ...AnimationConfig.spring,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        ...AnimationConfig.timing,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    opacity,
    transform: [{ scale }],
  };
};

/**
 * Create a staggered animation for list items
 */
export const useStaggerAnimation = (index, delay = 0) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const itemDelay = delay + (index * AnimationConfig.stagger);
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        ...AnimationConfig.spring,
        delay: itemDelay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        ...AnimationConfig.timing,
        delay: itemDelay,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        ...AnimationConfig.spring,
        delay: itemDelay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    opacity,
    transform: [
      { translateY },
      { scale },
    ],
  };
};

/**
 * Create a press scale animation
 */
export const usePressScale = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      ...AnimationConfig.spring,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      ...AnimationConfig.spring,
      useNativeDriver: true,
    }).start();
  };

  return {
    animatedStyle: {
      transform: [{ scale }],
    },
    handlePressIn,
    handlePressOut,
  };
};

/**
 * Create a pulse animation
 */
export const usePulse = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(pulse);
    };
    pulse();
  }, []);

  return {
    transform: [{ scale }],
  };
};
