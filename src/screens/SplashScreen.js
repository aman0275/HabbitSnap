import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSplashAnimations } from "../hooks/useSplashAnimations";
import {
  SplashBackground,
  SplashLogo,
  SplashText,
} from "../components/splash";

/**
 * Splash Screen Component
 * Beautiful animated loading screen showing HabitSnap branding
 * Modular design with separated components and hooks
 */
const SplashScreen = ({ onFinish }) => {
  const animations = useSplashAnimations(onFinish);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <SplashBackground>
        <View style={styles.content}>
          <SplashLogo
            logoScale={animations.logoScale}
            logoOpacity={animations.logoOpacity}
            logoRotation={animations.logoRotation}
            iconScale={animations.iconScale}
            iconRotation={animations.iconRotation}
          />
          <SplashText
            titleOpacity={animations.titleOpacity}
            titleTranslateY={animations.titleTranslateY}
            subtitleOpacity={animations.subtitleOpacity}
            subtitleTranslateY={animations.subtitleTranslateY}
          />
        </View>
      </SplashBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default SplashScreen;

