/**
 * Splash Screen Constants
 * Centralized configuration for splash screen animations and styling
 */
export const SPLASH_CONFIG = {
  // Timing constants
  DISPLAY_DURATION: 3000, // Total time splash screen is visible (ms)
  FADE_OUT_DURATION: 300, // Time for fade out animation (ms)
  
  // Animation delays (ms)
  LOGO_DELAY: 100,
  ICON_DELAY: 300,
  TITLE_DELAY: 400,
  SUBTITLE_DELAY: 600,
  
  // Animation durations (ms)
  LOGO_FADE_DURATION: 600,
  TITLE_FADE_DURATION: 500,
  SUBTITLE_FADE_DURATION: 500,
  ICON_ROTATION_DURATION: 800,
  
  // Spring animation configs
  LOGO_SPRING: {
    damping: 10,
    stiffness: 100,
  },
  LOGO_ROTATION_SPRING: {
    damping: 12,
    stiffness: 150,
  },
  ICON_SCALE_SPRING: {
    damping: 8,
    stiffness: 200,
  },
  ICON_ROTATION_SPRING: {
    damping: 15,
    stiffness: 100,
  },
  TEXT_SPRING: {
    damping: 15,
    stiffness: 150,
  },
  
  // Icon configuration
  ICON: {
    name: "camera",
    size: 80,
    containerSize: 140,
    pulseScale: 1.2,
    initialRotation: -10,
  },
  
  // Text configuration
  TITLE: {
    text: "HabitSnap",
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: -1.5,
  },
  SUBTITLE: {
    text: "by Anay",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
    opacity: 0.9,
  },
  
  // Layout spacing
  LOGO_MARGIN_BOTTOM: 40,
  TITLE_MARGIN_BOTTOM: 12,
  SUBTITLE_MARGIN_TOP: 4,
  BOTTOM_DECORATION_OFFSET: 60,
};

