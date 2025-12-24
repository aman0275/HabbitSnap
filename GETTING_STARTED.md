# Getting Started with HabitSnap

## Quick Start Guide

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm start
```

This will start the Expo development server. You'll see a QR code in your terminal.

### 3. Run on Your Device

**For iOS:**
- Install the Expo Go app from the App Store
- Scan the QR code with your iPhone camera
- Open in Expo Go

**For Android:**
- Install the Expo Go app from Google Play Store
- Open Expo Go and scan the QR code from the terminal

**For Simulator/Emulator:**
- Press `i` for iOS simulator (requires Xcode on Mac)
- Press `a` for Android emulator (requires Android Studio setup)

## Important Notes

### Assets Required

You'll need to create these asset files for the app to run properly:

1. **assets/icon.png** - App icon (1024x1024px recommended)
2. **assets/splash.png** - Splash screen image
3. **assets/adaptive-icon.png** - Android adaptive icon
4. **assets/favicon.png** - Web favicon (optional)

You can use placeholder images for now, or create them later. The app will work without them, but you'll see errors in the console.

### Permissions

The app requires camera and photo library permissions:
- **iOS**: Configured in `app.json` (already set up)
- **Android**: Configured in `app.json` (already set up)

When you first use the camera, you'll be prompted to grant permissions.

## Project Structure

```
HabitSnap/
├── App.js                    # Main entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── src/
│   ├── navigation/           # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/              # Screen components
│   │   ├── HomeScreen.js     # Main habits list
│   │   ├── HabitDetailScreen.js  # Habit timeline view
│   │   ├── AddHabitScreen.js     # Create/edit habit
│   │   └── CameraScreen.js       # Camera capture
│   ├── services/             # Data services
│   │   └── storage.js        # AsyncStorage wrapper
│   └── utils/                # Helper functions
│       └── helpers.js        # Date, streak calculations
└── assets/                   # Images, fonts, etc.
```

## Features Implemented

✅ Photo-based habit tracking
✅ Create, edit, and delete habits
✅ Camera integration with photo capture
✅ Photo gallery/timeline view
✅ Streak tracking
✅ Local storage (AsyncStorage)
✅ Beautiful UI with gradients
✅ Custom habit colors
✅ Photo notes

## Next Steps

1. **Add Assets**: Create the icon and splash screen images
2. **Test on Device**: Run on a physical device to test camera functionality
3. **Customize**: Modify colors, styling, or add features
4. **Build**: When ready, build for production:
   ```bash
   expo build:ios
   expo build:android
   ```

## Troubleshooting

### Camera not working?
- Make sure you've granted camera permissions
- Test on a physical device (simulators may have camera issues)

### Images not displaying?
- Check that photo URIs are valid
- Ensure AsyncStorage is working properly

### Navigation errors?
- Make sure all dependencies are installed: `npm install`
- Clear cache: `expo start -c`

## Need Help?

Check the React Native and Expo documentation:
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)

