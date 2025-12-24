# HabitSnap 📸

A beautiful visual habit tracker built with React Native. Track your habits with photos instead of checkboxes, creating a visual journey of your progress.

## Features ✨

- **Photo-Based Tracking**: Capture photos to mark habit completion
- **Visual Timeline**: See your progress through a gallery of photos
- **Streak Tracking**: Automatic streak calculation and display
- **Beautiful UI**: Modern, intuitive interface with gradient designs
- **Local Storage**: All data stored locally on your device
- **Habit Management**: Create, edit, and delete habits with custom colors
- **Photo Notes**: Add optional notes to your habit photos

## Tech Stack 🛠

- **React Native** with Expo
- **React Navigation** for navigation
- **Expo Camera** for photo capture
- **Expo Image Picker** for photo selection
- **AsyncStorage** for local data persistence
- **date-fns** for date formatting and calculations
- **Expo Linear Gradient** for beautiful gradients

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
```bash
cd HabbitSnap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Install the Expo Go app on your iOS or Android device
   - Scan the QR code from the terminal
   - Or press `i` for iOS simulator, `a` for Android emulator

## Project Structure 📁

```
HabitSnap/
├── App.js                 # Main app entry point
├── src/
│   ├── navigation/        # Navigation configuration
│   │   └── AppNavigator.js
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.js
│   │   ├── HabitDetailScreen.js
│   │   ├── AddHabitScreen.js
│   │   └── CameraScreen.js
│   ├── services/          # Data services
│   │   └── storage.js
│   └── utils/             # Helper functions
│       └── helpers.js
└── package.json
```

## Usage 📱

1. **Create a Habit**: Tap the "+" button to create a new habit with a custom name, description, and color.

2. **Capture Photos**: 
   - Open a habit and tap the camera button
   - Take a photo or select from gallery
   - Add an optional note
   - Save your entry

3. **View Progress**: 
   - Browse your habit timeline in a beautiful grid view
   - See your streak count and total photos
   - Long-press a photo to delete it

4. **Track Streaks**: Your streak is automatically calculated based on consecutive days with photos.

## Future Enhancements 🔮

- [ ] Cloud sync with Firebase
- [ ] AI-powered photo tagging
- [ ] Export photos as PDF journal
- [ ] Habit categories
- [ ] Detailed analytics and insights
- [ ] Reminder notifications
- [ ] Before/after comparisons
- [ ] Social sharing features

## License 📄

MIT License - feel free to use this project for learning or commercial purposes.

## Contributing 🤝

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using React Native and Expo

