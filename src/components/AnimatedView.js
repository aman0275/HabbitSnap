import React from 'react';
import { Animated, View } from 'react-native';
import { useSlideUp } from '../utils/animations';

/**
 * Animated View Component with slide-up animation
 * Uses React Native's built-in Animated API (compatible with Expo Go)
 */
const AnimatedView = ({ children, delay = 0, style, ...props }) => {
  const animatedStyle = useSlideUp(delay);

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
