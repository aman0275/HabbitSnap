# HabitSnap - Comprehensive Design Document

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Overview](#product-overview)
3. [Core Features](#core-features)
4. [Habit Tracking System](#habit-tracking-system)
5. [AI Model Architecture](#ai-model-architecture)
6. [Technical Architecture](#technical-architecture)
7. [Data Models](#data-models)
8. [User Interface Design](#user-interface-design)
9. [Data Flow Architecture](#data-flow-architecture)
10. [Privacy & Security](#privacy--security)
11. [Performance Considerations](#performance-considerations)
12. [Future Roadmap](#future-roadmap)

---

## Executive Summary

**HabitSnap** is a visual habit tracking mobile application built with React Native and Expo. Unlike traditional habit trackers that use checkboxes, HabitSnap uses photo-based tracking, allowing users to create a visual journey of their progress. The app features an advanced AI-powered analytics system that provides personalized insights, predictions, and recommendations to help users build and maintain better habits.

### Key Differentiators

- **Visual Tracking**: Photo-based habit tracking for more engaging and meaningful progress visualization
- **AI-Powered Insights**: Comprehensive AI analytics system providing consistency analysis, trend detection, predictive analytics, and personalized recommendations
- **Privacy-First**: All processing happens on-device; no data sent to external servers
- **Beautiful UI/UX**: Modern, intuitive interface with gradient designs, animations, and dark mode support
- **Offline-First**: Full functionality without internet connection

---

## Product Overview

### Vision

Empower users to build lasting habits through visual documentation and intelligent insights, making habit formation more engaging, motivating, and effective.

### Target Audience

- Individuals seeking to build positive daily habits
- People who prefer visual documentation over text-based tracking
- Users who want data-driven insights into their habit patterns
- Anyone interested in understanding their behavioral patterns through AI analysis

### Core Value Propositions

1. **Visual Progress Tracking**: See your journey through photos rather than abstract data points
2. **Intelligent Insights**: AI-powered analysis provides actionable feedback and predictions
3. **Privacy & Control**: Complete data ownership with on-device processing
4. **Motivation Through Achievement**: Recognition of milestones and achievements
5. **Pattern Recognition**: Understanding when and how you track habits best

---

## Core Features

### 1. Habit Management

#### Create & Edit Habits

- **Custom Habit Creation**: Users can create habits with:
  - Custom name and description
  - Color selection from predefined palette
  - Automatic category detection based on name
- **Edit Capabilities**: Modify habit name, description, and color after creation
- **Delete Functionality**: Remove habits with confirmation dialog

#### Habit Suggestions

- **Popular Habits**: Suggests common habits (Exercise, Reading, Meditation, etc.)
- **Category-Based Suggestions**: Recommends habits based on existing habit categories
- **Paired Habits**: Suggests complementary habits that work well together
  - Example: "Morning Exercise" → suggests "Post-Workout Protein"
  - Example: "Daily Reading" → suggests "Reading Notes"
- **Smart Filtering**: Automatically excludes existing habits from suggestions

### 2. Photo-Based Entry System

#### Camera Integration

- **Native Camera Capture**: Built-in camera interface with:
  - Front/back camera toggle
  - Photo preview with retake option
  - Gallery picker for selecting existing photos
  - Optional note attachment
- **Entry Metadata**:
  - Automatic timestamp (full date and time)
  - Date string for grouping (YYYY-MM-DD)
  - Multiple entries per day support
  - AI classification data (category, confidence, tags)

#### Photo Management

- **Timeline View**: Chronological display of all habit entries
- **Grid Layout**: Visual grid showing progress photos
- **Entry Deletion**: Long-press to delete individual entries
- **Entry Details**: View full-size photo with note and metadata

### 3. Streak Tracking

#### Automatic Calculation

- **Consecutive Day Tracking**: Calculates current streak based on consecutive days with entries
- **Streak Display**: Shows current streak count on habit cards
- **Streak Preservation**: Handles multiple entries per day correctly
- **Visual Indicators**: Badge showing "Today" for habits with entries today

#### Streak Logic

- Streak = consecutive days from today backwards with at least one entry
- Multiple entries on same day count as one day for streak purposes
- Streak resets when a day is missed

### 4. Dashboard & Analytics

#### Overview Statistics

- **Total Habits**: Count of active habits
- **Total Entries**: Aggregate entry count across all habits
- **Total Streak Days**: Sum of all habit streaks
- **Total Days Active**: Total unique days with at least one entry

#### Visual Charts

- **Activity Over Time (Line Chart)**: Shows entry frequency trends
- **Weekly Pattern (Bar Chart)**: Displays which days of week are most active
- **Habit Distribution (Pie Chart)**: Visual representation of entry distribution across habits

#### Top Habits Display

- Shows up to 3 highest-performing habits
- Displayed with name, thumbnail, and key metrics

### 5. AI-Powered Insights (Comprehensive)

The AI system is the most advanced feature of HabitSnap, providing deep analysis across multiple dimensions:

#### 5.1 Consistency Analysis

**Purpose**: Evaluate how consistently users track their habits

**Metrics Calculated**:

- **Frequency Score** (0-1): Based on entries per week
  - Formula: `min(entries_per_week / 7, 1.0)`
  - Weight: 60%
- **Recency Score** (0-1): Based on time since last entry
  - Formula: `max(0, 1 - (days_since_last / 7))`
  - Weight: 40%
- **Overall Consistency Score**: Weighted average of frequency and recency

**Ratings**:

- **Excellent**: Score ≥ 0.8
- **Good**: Score ≥ 0.6
- **Fair**: Score ≥ 0.4
- **Needs Improvement**: Score < 0.4

**Outputs**:

- Personalized messages based on rating
- Actionable insights (e.g., "Last entry was X days ago")
- Consistency trends over time

#### 5.2 Progress Analysis

**Purpose**: Track long-term progress and milestones

**Metrics**:

- **Total Days Tracked**: Unique days with entries
- **Consistency Rate**: Percentage of days with entries
- **Entry Frequency**: Average entries per week
- **Duration**: Days since first entry

**Milestone Detection**:

- 7-day milestone: "First week complete!"
- 21-day milestone: "Habit formation achieved!" (based on research)
- 30-day milestone: "One month strong!"
- 50, 100, 365-day milestones

**Trend Detection**:

- Compares recent performance (last 2 weeks) with previous period
- Identifies improvement, decline, or stability patterns

#### 5.3 Pattern Analysis

**Purpose**: Identify optimal tracking times and patterns

**Time of Day Analysis**:

- Detects most common tracking hours
- Identifies optimal tracking times
- Provides recommendations for timing

**Day of Week Analysis**:

- Identifies which days of week users track most consistently
- Detects weekday vs. weekend patterns
- Suggests optimal days for tracking

**Frequency Patterns**:

- Detects tracking frequency patterns
- Identifies consistency patterns (daily, every other day, etc.)

#### 5.4 Trend Analysis

**Purpose**: Advanced trend detection with period comparisons

**Trend Directions**:

- **Improving**: Recent performance better than previous period
- **Declining**: Recent performance worse than previous period
- **Stable**: No significant change

**Comparison Metrics**:

- Week-over-week comparison
- Entry frequency trends
- Consistency score trends
- Visual trend indicators (up/down arrows)

#### 5.5 Habit Strength Analysis

**Purpose**: Assess how "strong" a habit has become (automaticity)

**Strength Factors**:

- **Duration Factor**: Longer habits are stronger (max at 30 days)
- **Consistency Factor**: More consistent habits are stronger
- **Recent Activity Factor**: Recent activity indicates strength maintenance
- **Frequency Factor**: Daily habits score higher than occasional ones

**Strength Score** (0-1):

- **Strong**: ≥ 0.7 (habit is well-established)
- **Moderate**: 0.5-0.7 (habit is forming)
- **Weak**: < 0.5 (habit needs more consistency)

#### 5.6 Predictive Analytics

**Purpose**: Predict potential issues and suggest preventive actions

**Risk Assessment**:

- **Streak Risk**: Likelihood of breaking current streak
  - Based on recent patterns
  - Days since last entry
  - Historical streak patterns
- **Success Probability**: Probability of habit success
  - Recent consistency (last 7 days): 50% weight
  - Overall duration: 30% weight
  - Trend factor: 20% weight

**Predictions**:

- **Optimal Next Time**: Predicted best time for next entry
- **Potential Break Points**: Days when streak is at risk
- **Success Forecast**: Likelihood of maintaining habit

**Alerts Generated**:

- **Urgent**: High risk of streak break (last entry > 3 days ago)
- **Warning**: Moderate risk (last entry 2-3 days ago)
- **Info**: Preventive suggestions

#### 5.7 Achievement Recognition

**Purpose**: Celebrate milestones and motivate users

**Achievement Types**:

- **Streak Achievements**: 7, 14, 21, 30, 50, 100, 365 day streaks
- **Entry Count Achievements**: 10, 25, 50, 100, 250, 500 entries
- **Consistency Achievements**: Perfect week, perfect month
- **Special Achievements**: First entry, habit formation (21 days)

**Upcoming Milestones**:

- Shows next milestones within reach
- Provides motivation to continue

#### 5.8 Motivational Insights

**Purpose**: Provide personalized encouragement and motivation

**Context-Aware Messages**:

- Based on current performance
- Considers recent trends
- Adapts to user's situation

**Message Types**:

- Encouragement for good performance
- Motivation for struggling users
- Celebration of achievements
- Gentle reminders for missed entries

#### 5.9 Image Classification

**Purpose**: Automatically categorize photos and provide context

**Current Implementation** (Heuristic-Based):

- Keyword matching from habit name
- Category detection (Fitness, Food, Workspace, Reading, Outdoor, Other)
- Confidence scoring based on keyword matches

**Categories**:

- **Fitness**: gym, exercise, workout, running, yoga, etc.
- **Food**: meal, breakfast, lunch, dinner, cooking, etc.
- **Workspace**: work, office, desk, computer, study, etc.
- **Reading**: book, read, library, etc.
- **Outdoor**: walk, park, nature, hike, etc.
- **Other**: Default category

**Future Ready**:

- Architecture prepared for TensorFlow Lite integration
- MobileNet V3 Small model integration planned
- Real-time image classification capability

#### 5.10 Tag Generation

**Purpose**: Automatically tag entries for better organization

**Tag Types**:

- **Category Tags**: Based on detected category
- **Time Tags**: Morning, Afternoon, Evening, Night
- **Day Tags**: Weekday, Weekend
- **Custom Tags**: Category-specific tags

#### 5.11 Dashboard Aggregation

**Purpose**: Provide holistic view across all habits

**Aggregated Metrics**:

- **Overall Consistency**: Average consistency across all habits
- **Overall Strength**: Average habit strength
- **Trend Overview**: Count of improving, declining, stable habits
- **Total Achievements**: All achievements across habits
- **Risk Alerts**: Aggregated alerts from all habits

**Top Performing Habits**:

- Ranked by performance score
- Shows top 3-5 habits
- Displays with percentage score

**Habits Needing Attention**:

- Identifies habits with urgent alerts
- Highlights declining trends
- Suggests focus areas

---

## Habit Tracking System

### Data Flow for Habit Creation

```
User Input (Name, Description, Color)
    ↓
Habit Service (validate & enrich)
    ↓
Storage Service (save to AsyncStorage)
    ↓
Habit List Updated
```

### Data Flow for Entry Creation

```
User Captures Photo
    ↓
Entry Service (create entry object)
    ↓
AI Service (classify image, generate tags)
    ↓
Entry Object (with AI metadata)
    ↓
Storage Service (save entry)
    ↓
Habit Stats Updated (streak, latest photo, etc.)
```

### Streak Calculation Algorithm

```javascript
function calculateStreak(entries) {
  // Sort entries by date (newest first)
  // Group by date (YYYY-MM-DD)
  // Starting from today, count consecutive days backwards
  // Stop when a day is missing

  const today = new Date().toDateString();
  const groupedByDate = groupEntriesByDate(entries);

  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const dateString = currentDate.toDateString();
    if (groupedByDate[dateString]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break; // Missing day, streak breaks
    }
  }

  return streak;
}
```

### Entry Grouping Logic

- Entries are grouped by date string (YYYY-MM-DD)
- Multiple entries per day are allowed and stored separately
- For display purposes, latest entry per day is shown as thumbnail
- All entries are accessible in timeline view

---

## AI Model Architecture

### Architecture Overview

The AI system follows a **modular, service-oriented architecture** with clear separation of concerns:

```
AI Service Layer (Unified API)
├── Individual Analyzer Services
│   ├── ConsistencyAnalyzer
│   ├── ProgressAnalyzer
│   ├── PatternAnalyzer
│   ├── TrendAnalyzer
│   ├── HabitStrengthAnalyzer
│   ├── PredictiveAnalyzer
│   ├── AchievementRecognizer
│   ├── ImageClassifier
│   ├── TagGenerator
│   ├── SuggestionGenerator
│   ├── QualityAssessor
│   └── MotivationalInsights
├── Dashboard Aggregation Services
│   ├── InsightAggregator
│   ├── TrendAggregator
│   ├── AchievementAggregator
│   ├── AlertAggregator
│   ├── HabitSelector
│   ├── MotivationGenerator
│   └── HabitInsightsLoader
└── Configuration & Utilities
    ├── aiConfig.js (thresholds, weights)
    ├── aiHelpers.js (calculation utilities)
    └── aiAggregationHelpers.js (aggregation utilities)
```

### Service Responsibilities

#### 1. ConsistencyAnalyzer

**Input**: Array of habit entries
**Output**: Consistency analysis object

**Process**:

1. Filter and sort recent entries (last 7 days)
2. Calculate metrics:
   - Days with entries
   - Days since last entry
3. Calculate scores:
   - Frequency score: `min(entries_per_week / 7, 1.0)`
   - Recency score: `max(0, 1 - (days_since_last / 7))`
4. Weighted average: `frequency * 0.6 + recency * 0.4`
5. Generate rating and message

**Configuration**:

- Analysis window: 7 days
- Frequency weight: 0.6
- Recency weight: 0.4
- Rating thresholds defined in `aiConfig.js`

#### 2. ProgressAnalyzer

**Input**: Array of habit entries
**Output**: Progress analysis object

**Process**:

1. Calculate total days tracked
2. Calculate consistency rate
3. Identify milestones (7, 21, 30, 50, 100, 365 days)
4. Detect trends (comparing recent vs. previous period)
5. Generate progress insights

**Milestone Detection**:

- Checks total unique days tracked
- Compares against milestone thresholds
- Marks achieved milestones
- Identifies upcoming milestones

#### 3. PatternAnalyzer

**Input**: Array of habit entries
**Output**: Pattern analysis object

**Process**:

1. **Time of Day Analysis**:

   - Extract hour from each entry timestamp
   - Count entries per hour
   - Identify most common hours
   - Calculate optimal tracking time

2. **Day of Week Analysis**:

   - Extract day of week from each entry
   - Count entries per day
   - Identify most consistent days
   - Detect weekday vs. weekend patterns

3. **Frequency Patterns**:

   - Calculate average entries per week
   - Detect regularity patterns
   - Identify tracking frequency consistency

4. **Optimal Times Detection**:
   - Find time slots with highest consistency
   - Recommend best tracking times

#### 4. TrendAnalyzer

**Input**: Array of habit entries
**Output**: Trend analysis object

**Process**:

1. **Period Comparison**:

   - Recent period: Last 2 weeks
   - Previous period: 2 weeks before that
   - Compare entry frequencies

2. **Trend Direction**:

   - **Improving**: Recent entries > Previous entries
   - **Declining**: Recent entries < Previous entries
   - **Stable**: Similar entry counts

3. **Comparison Metrics**:

   - Entry count change
   - Consistency score change
   - Frequency change percentage

4. **Trend Confidence**:
   - Based on data volume
   - Statistical significance

#### 5. HabitStrengthAnalyzer

**Input**: Array of habit entries
**Output**: Habit strength analysis

**Process**:

1. **Calculate Duration Factor**:

   - Days since first entry
   - Capped at 30 days (max factor = 1.0)

2. **Calculate Consistency Factor**:

   - Based on consistency score
   - Higher consistency = stronger habit

3. **Calculate Frequency Factor**:

   - Entries per week
   - Daily habits score highest

4. **Calculate Recent Activity Factor**:

   - Recent entries (last 7 days)
   - Active habits are stronger

5. **Combined Strength Score**:
   - Weighted combination of all factors
   - Score range: 0-1

**Strength Levels**:

- **Strong** (≥0.7): Habit is well-established, likely automatic
- **Moderate** (0.5-0.7): Habit is forming, needs maintenance
- **Weak** (<0.5): Habit needs more consistency

#### 6. PredictiveAnalyzer

**Input**: Array of entries, habit object
**Output**: Predictive analysis with risk assessment

**Process**:

1. **Streak Risk Assessment**:

   - Calculate days since last entry
   - Analyze historical streak patterns
   - Assess risk level (Low, Medium, High)

2. **Optimal Next Time Prediction**:

   - Analyze historical tracking times
   - Find most common hour
   - Predict best time for next entry

3. **Success Probability Calculation**:

   - Recent consistency (last 7 days): 50% weight
   - Overall duration: 30% weight
   - Trend factor: 20% weight
   - Combined probability score

4. **Potential Break Points**:

   - Identify days when streak is at risk
   - Based on historical patterns
   - Time since last entry

5. **Alert Generation**:
   - Urgent: High risk (last entry > 3 days ago)
   - Warning: Moderate risk (last entry 2-3 days ago)
   - Info: Preventive suggestions

#### 7. AchievementRecognizer

**Input**: Array of habit entries
**Output**: Achievement analysis

**Process**:

1. **Streak Achievements**:

   - Check current streak
   - Compare against milestone thresholds (7, 14, 21, 30, 50, 100, 365)
   - Mark achieved milestones

2. **Entry Count Achievements**:

   - Count total entries
   - Check against thresholds (10, 25, 50, 100, 250, 500)
   - Mark achieved milestones

3. **Consistency Achievements**:

   - Perfect week (7 entries in 7 days)
   - Perfect month (entries every day for 30 days)

4. **Upcoming Milestones**:
   - Calculate next milestone
   - Show progress toward next milestone
   - Provide motivation

#### 8. ImageClassifier

**Input**: Image URI, habit name
**Output**: Classification result

**Current Implementation (Heuristic)**:

1. Extract keywords from habit name
2. Match against category keyword lists
3. Calculate confidence based on keyword matches
4. Generate category prediction

**Category Detection**:

```javascript
Categories:
- Fitness: gym, exercise, workout, run, yoga, fitness, train
- Food: meal, eat, breakfast, lunch, dinner, cook, food
- Workspace: work, office, desk, computer, study, code
- Reading: book, read, reading, library, learn
- Outdoor: walk, park, nature, hike, outdoor, run
- Other: default category
```

**Future ML Integration**:

- Architecture ready for TensorFlow Lite
- MobileNet V3 Small model planned
- Real-time image classification
- Higher accuracy predictions

#### 9. TagGenerator

**Input**: Category ID, entry metadata
**Output**: Array of tags

**Tag Types**:

1. **Category Tags**: Based on detected category
2. **Time Tags**:
   - Morning (5:00-12:00)
   - Afternoon (12:00-17:00)
   - Evening (17:00-21:00)
   - Night (21:00-5:00)
3. **Day Tags**: Weekday, Weekend
4. **Custom Tags**: Category-specific tags

#### 10. SuggestionGenerator

**Input**: Habit object, entries array
**Output**: Array of smart suggestions

**Suggestion Types**:

1. **Consistency-Based**:

   - Remind if inconsistent
   - Praise if consistent
   - Suggest improvements

2. **Timing-Based**:

   - Suggest optimal tracking times
   - Remind based on historical patterns

3. **Milestone-Based**:
   - Encourage approaching milestones
   - Celebrate achievements

#### 11. MotivationalInsights

**Input**: Habit insights, overall performance
**Output**: Personalized motivational message

**Context-Aware Messages**:

- Performance-based encouragement
- Trend-aware motivation
- Achievement celebration
- Supportive reminders

### Dashboard Aggregation System

The dashboard aggregates insights from all habits to provide a holistic view:

#### InsightAggregator

**Purpose**: Aggregate consistency and strength metrics

**Consistency Aggregation**:

- Average consistency score across all habits
- Count of excellent, good, fair, needs-improvement habits
- Overall consistency rating

**Strength Aggregation**:

- Average habit strength
- Count of strong habits (score ≥ 0.7)
- Percentage of strong habits

#### TrendAggregator

**Purpose**: Aggregate trend data across habits

**Aggregation**:

- Count of improving habits
- Count of declining habits
- Count of stable habits
- Overall trend direction

#### AchievementAggregator

**Purpose**: Collect and prioritize achievements

**Process**:

1. Collect all achievements from all habits
2. Sort by importance (milestone value)
3. Show recent achievements (top N)
4. Show upcoming milestones

#### AlertAggregator

**Purpose**: Aggregate and prioritize risk alerts

**Process**:

1. Collect alerts from all habits
2. Filter relevant alerts (urgent, warnings)
3. Sort by priority
4. Group by type (urgent, warnings)

#### HabitSelector

**Purpose**: Identify top and bottom performing habits

**Top Performing Habits**:

- Ranked by performance score
- Score = (consistency _ 0.4) + (strength _ 0.3) + (trend \* 0.3)
- Returns top N habits

**Habits Needing Attention**:

- Habits with urgent alerts
- Habits with declining trends
- Habits with low consistency

#### MotivationGenerator

**Purpose**: Generate overall motivational message

**Process**:

1. Analyze overall performance
2. Consider recent achievements
3. Assess overall trends
4. Generate contextual message
5. Select appropriate icon

### Configuration System

All AI parameters are centralized in configuration files:

**`aiConfig.js`**:

- Confidence thresholds
- Consistency weights
- Score thresholds
- Time thresholds
- Analysis window sizes

**`aiAggregation.js`**:

- Aggregation thresholds
- Dashboard limits
- Alert types
- Trend directions

### Utility Functions

**`aiHelpers.js`**:

- Date calculations
- Entry filtering/sorting
- Score calculations
- Frequency/recency calculations

**`aiAggregationHelpers.js`**:

- Average score calculations
- Rating conversions
- Alert sorting
- Trend determination

---

## Technical Architecture

### Technology Stack

#### Frontend

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tooling
- **React Navigation**: Navigation library
  - Stack Navigator: Screen navigation
  - Tab Navigator: Bottom tab navigation
- **React Native Animated**: Built-in animation API
- **React Native SVG**: Custom chart rendering

#### State Management

- **React Hooks**: useState, useEffect, useMemo, useCallback
- **Custom Hooks**:
  - `useHabits`: Habit data management
  - `useHabitEntries`: Entry data management
  - `useDashboard`: Dashboard data aggregation
  - `useAIInsights`: AI insights management

#### Data Persistence

- **AsyncStorage**: Local key-value storage
- **JSON Serialization**: Data stored as JSON strings
- **Storage Keys**:
  - `habits`: Array of habit objects
  - `habit_entries`: Array of entry objects

#### UI Components

- **Expo Linear Gradient**: Gradient backgrounds
- **Expo Camera**: Camera integration
- **Expo Image Picker**: Photo library access
- **@expo/vector-icons**: Icon library (Ionicons)

#### Utilities

- **date-fns**: Date manipulation and formatting
- **React Native Safe Area Context**: Safe area handling

### Project Structure

```
HabitSnap/
├── App.js                    # Main app entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── babel.config.js           # Babel configuration
│
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js   # Navigation structure
│   │
│   ├── screens/
│   │   ├── SplashScreen.js   # Splash screen
│   │   ├── HomeScreen.js     # Habits list
│   │   ├── HabitDetailScreen.js  # Habit timeline
│   │   ├── AddHabitScreen.js     # Create/edit habit
│   │   ├── CameraScreen.js       # Camera capture
│   │   └── DashboardScreen.js    # Dashboard/analytics
│   │
│   ├── components/
│   │   ├── HabitCard.js          # Habit list item
│   │   ├── PhotoGridItem.js      # Photo grid item
│   │   ├── StatCard.js           # Statistics card
│   │   ├── DashboardAICard.js    # AI insights container
│   │   ├── Button.js             # Reusable button
│   │   ├── Input.js              # Text input component
│   │   ├── Badge.js              # Badge component
│   │   ├── EmptyState.js         # Empty state component
│   │   ├── FloatingActionButton.js  # FAB component
│   │   ├── ColorPicker.js        # Color selection
│   │   ├── HabitSuggestionCard.js   # Suggestion card
│   │   ├── HabitSuggestionsList.js  # Suggestions list
│   │   │
│   │   ├── charts/               # Custom chart components
│   │   │   ├── LineChart.js
│   │   │   ├── BarChart.js
│   │   │   └── PieChart.js
│   │   │
│   │   ├── dashboardAI/          # AI insight cards
│   │   │   ├── AIMotivationCard.js
│   │   │   ├── AIConsistencyCard.js
│   │   │   ├── AIStrengthCard.js
│   │   │   ├── AIAlertsCard.js
│   │   │   ├── AIAchievementsCard.js
│   │   │   ├── AITopHabitsCard.js
│   │   │   ├── AIHabitsNeedingAttentionCard.js
│   │   │   └── AITrendsCard.js
│   │   │
│   │   └── splash/               # Splash screen components
│   │       ├── SplashLogo.js
│   │       ├── SplashText.js
│   │       └── SplashBackground.js
│   │
│   ├── services/
│   │   ├── storage.js            # AsyncStorage wrapper
│   │   ├── habitService.js       # Habit business logic
│   │   ├── entryService.js       # Entry business logic
│   │   ├── dashboardService.js   # Dashboard data aggregation
│   │   ├── habitSuggestionService.js  # Habit suggestions
│   │   │
│   │   ├── ai/                   # AI services
│   │   │   ├── index.js          # Unified AI API
│   │   │   ├── classifier.js
│   │   │   ├── consistencyAnalyzer.js
│   │   │   ├── progressAnalyzer.js
│   │   │   ├── patternAnalyzer.js
│   │   │   ├── trendAnalyzer.js
│   │   │   ├── habitStrengthAnalyzer.js
│   │   │   ├── predictiveAnalyzer.js
│   │   │   ├── achievementRecognizer.js
│   │   │   ├── tagGenerator.js
│   │   │   ├── suggestionGenerator.js
│   │   │   ├── qualityAssessor.js
│   │   │   └── motivationalInsights.js
│   │   │
│   │   └── dashboardAI/          # Dashboard aggregation
│   │       ├── index.js
│   │       ├── insightAggregator.js
│   │       ├── trendAggregator.js
│   │       ├── achievementAggregator.js
│   │       ├── alertAggregator.js
│   │       ├── habitSelector.js
│   │       ├── motivationGenerator.js
│   │       └── habitInsightsLoader.js
│   │
│   ├── hooks/
│   │   ├── useHabits.js          # Habit data hook
│   │   ├── useHabitEntries.js    # Entry data hook
│   │   ├── useDashboard.js       # Dashboard data hook
│   │   ├── useAIInsights.js      # AI insights hook
│   │   └── useSplashAnimations.js # Splash animations
│   │
│   ├── constants/
│   │   ├── colors.js             # Color definitions
│   │   ├── theme.js              # Theme (spacing, typography, shadows)
│   │   ├── messages.js           # User-facing messages
│   │   ├── aiConfig.js           # AI configuration
│   │   ├── aiCategories.js       # Category definitions
│   │   ├── aiAggregation.js      # Aggregation constants
│   │   ├── charts.js             # Chart configuration
│   │   └── splash.js             # Splash configuration
│   │
│   └── utils/
│       ├── helpers.js            # General utilities
│       ├── validation.js         # Form validation
│       ├── colors.js             # Color utilities (theme-aware)
│       ├── animations.js         # Animation utilities
│       ├── aiHelpers.js          # AI calculation utilities
│       ├── aiAggregationHelpers.js  # Aggregation utilities
│       └── chartHelpers.js       # Chart utilities
│
└── assets/                   # Images, fonts, etc.
```

### Navigation Architecture

```
AppNavigator (Root)
├── TabNavigator
│   ├── Home Tab
│   │   └── HomeStack
│   │       ├── HomeScreen (Habits list)
│   │       └── HabitDetailScreen (Timeline)
│   │
│   └── Dashboard Tab
│       └── DashboardScreen
│
└── RootStack (Modal)
    └── AddHabitScreen (Modal)
        └── CameraScreen (Modal)
```

### Data Flow Architecture

#### Habit Creation Flow

```
AddHabitScreen
    ↓ (user input)
habitService.createHabit()
    ↓
storage.saveHabit()
    ↓
AsyncStorage.setItem()
    ↓
useHabits hook (refresh)
    ↓
HomeScreen (update UI)
```

#### Entry Creation Flow

```
CameraScreen
    ↓ (capture photo)
entryService.createEntry()
    ↓
aiService.classifyImage()
    ↓
aiService.generateTags()
    ↓
storage.saveHabitEntry()
    ↓
AsyncStorage.setItem()
    ↓
useHabits hook (refresh stats)
    ↓
HabitDetailScreen (update timeline)
```

#### AI Insights Flow

```
DashboardScreen
    ↓
useDashboard hook
    ↓
dashboardAIService.getOverallAIInsights()
    ↓
HabitInsightsLoader.loadAllHabitInsights()
    ↓ (for each habit)
aiService.analyzeConsistency()
aiService.analyzeHabitStrength()
aiService.analyzeTrends()
aiService.recognizeAchievements()
aiService.analyzePredictions()
    ↓
Aggregation Services
    ↓
DashboardAICard (render insights)
```

---

## Data Models

### Habit Object

```javascript
{
  id: string,              // Unique identifier (UUID)
  name: string,            // Habit name
  description: string,     // Optional description
  color: string,           // Hex color code
  createdAt: string,       // ISO timestamp

  // Enriched fields (computed)
  streak: number,          // Current streak count
  latestPhoto: string,     // URI of latest photo
  latestPhotoDate: string, // Date of latest photo (YYYY-MM-DD)
  totalEntries: number     // Total entry count
}
```

### Entry Object

```javascript
{
  id: string,              // Unique identifier (UUID)
  habitId: string,         // Reference to habit
  date: string,            // Date string (YYYY-MM-DD)
  photo: string,           // Photo URI
  note: string,            // Optional note
  createdAt: string,       // ISO timestamp
  timestamp: number,       // Unix timestamp (for sorting)

  // AI metadata
  aiData: {
    category: string,      // Category ID
    categoryName: string,  // Category display name
    confidence: number,    // Confidence score (0-1)
    tags: Array<string>    // Generated tags
  }
}
```

### Consistency Analysis Object

```javascript
{
  score: number,           // Consistency score (0-1)
  consistency: string,     // Rating: 'excellent' | 'good' | 'fair' | 'needs-improvement'
  message: string,         // Personalized message
  insights: Array<string>, // Actionable insights
  metrics: {
    daysWithEntries: number,
    daysSinceLastEntry: number
  }
}
```

### Progress Analysis Object

```javascript
{
  totalDaysTracked: number,
  consistencyRate: number,      // Percentage (0-1)
  entryFrequency: number,       // Entries per week
  duration: number,             // Days since first entry
  milestones: Array<{
    days: number,
    achieved: boolean,
    message: string
  }>,
  upcomingMilestones: Array<{
    days: number,
    progress: number,
    message: string
  }>,
  trend: {
    direction: 'improving' | 'declining' | 'stable',
    change: number,
    message: string
  }
}
```

### Trend Analysis Object

```javascript
{
  trends: {
    overall: {
      direction: 'improving' | 'declining' | 'stable',
      change: number,
      confidence: number
    },
    comparison: {
      recentCount: number,
      previousCount: number,
      change: number,
      isBetter: boolean
    }
  },
  insights: Array<string>,
  recommendations: Array<string>
}
```

### Habit Strength Analysis Object

```javascript
{
  score: number,           // Strength score (0-1)
  level: 'strong' | 'moderate' | 'weak',
  factors: {
    duration: number,      // Duration factor (0-1)
    consistency: number,   // Consistency factor (0-1)
    frequency: number,     // Frequency factor (0-1)
    recentActivity: number // Recent activity factor (0-1)
  },
  message: string
}
```

### Predictive Analysis Object

```javascript
{
  predictions: {
    streakRisk: {
      level: 'low' | 'medium' | 'high',
      daysSinceLastEntry: number,
      message: string
    },
    optimalNextTime: {
      hour: number,        // 0-23
      confidence: number,
      message: string
    },
    successProbability: {
      probability: number, // 0-1
      confidence: number,
      message: string
    },
    potentialBreakPoints: Array<{
      date: string,
      risk: number,
      reason: string
    }>
  },
  alerts: Array<{
    type: 'urgent' | 'warning' | 'info',
    title: string,
    message: string,
    icon: string
  }>,
  suggestions: Array<string>
}
```

### Achievement Object

```javascript
{
  id: string,
  type: 'streak' | 'entries' | 'consistency',
  milestone: number,       // Milestone value (days, count, etc.)
  title: string,
  message: string,
  icon: string,
  achieved: boolean,
  achievedAt: string       // ISO timestamp (if achieved)
}
```

### Dashboard AI Insights Object

```javascript
{
  overallConsistency: {
    averageScore: number,
    rating: string,
    excellentCount: number,
    goodCount: number,
    totalHabits: number,
    message: string
  },
  overallStrength: {
    averageStrength: number,
    strongHabitsCount: number,
    totalHabits: number,
    percentage: number
  },
  overallTrends: {
    improvingCount: number,
    decliningCount: number,
    stableCount: number,
    totalHabits: number,
    overallDirection: string
  },
  totalAchievements: {
    total: number,
    recent: Array<Achievement>,
    upcoming: Array<Milestone>
  },
  riskAlerts: {
    urgent: Array<Alert>,
    warnings: Array<Alert>,
    total: number
  },
  motivationalInsight: {
    message: string,
    icon: string
  },
  topPerformingHabits: Array<{
    habit: Habit,
    score: number
  }>,
  habitsNeedingAttention: Array<{
    habit: Habit,
    hasUrgentAlert: boolean
  }>
}
```

---

## User Interface Design

### Design Principles

1. **Visual Hierarchy**: Clear information hierarchy with cards, sections, and spacing
2. **Consistency**: Unified design language across all screens
3. **Accessibility**: High contrast, readable fonts, touch-friendly targets
4. **Dark Mode**: Full support for system dark mode
5. **Animations**: Smooth, purposeful animations for feedback
6. **Responsiveness**: Adapts to different screen sizes

### Color System

**Primary Colors**:

- Primary: Purple gradient (#667EEA to #764BA2)
- Primary Light: Lighter purple variant
- Success: Green (#48BB78)
- Warning: Orange (#F6AD55)
- Error: Red (#F56565)

**Theme-Aware Colors**:

- Background: White (light) / Dark gray (dark)
- Surface: Light gray (light) / Darker gray (dark)
- Text Primary: Dark (light) / White (dark)
- Text Secondary: Medium gray
- Text Tertiary: Light gray
- Border: Light gray

### Typography

**Heading Styles**:

- H1: 32px, 800 weight (Large titles)
- H2: 28px, 700 weight (Screen titles)
- H3: 24px, 700 weight (Section titles)
- H4: 20px, 600 weight (Card titles)
- H5: 18px, 600 weight (Subsection titles)

**Body Styles**:

- Body: 16px, 400 weight (Main content)
- Body Medium: 15px, 500 weight (Emphasized content)
- Body Small: 14px, 400 weight (Secondary content)
- Caption: 12px, 400 weight (Labels, metadata)

### Spacing System

```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
xxl: 24px
xxxl: 32px
```

### Component Library

#### HabitCard

- Displays habit information in list
- Shows thumbnail, name, streak, entry count
- Includes delete action
- Animated press feedback

#### StatCard

- Displays statistics with icon
- Supports gradient backgrounds
- Large number display
- Label text

#### DashboardAICard

- Container for AI insights
- Composed of smaller insight cards
- Scrollable content
- Header with icon and title

#### Button

- Primary, secondary, gradient variants
- Icon support
- Loading states
- Touch feedback

#### Input

- Text input with label
- Error states
- Dark mode support
- Multiline support

### Screen Layouts

#### HomeScreen

- Header: Gradient background with title and subtitle
- Habit List: Scrollable list of habit cards
- FAB: Floating action button for adding habits
- Empty State: Message when no habits exist

#### HabitDetailScreen

- Header: Habit information with gradient
- Photo Grid: Timeline view of entries
- Empty State: Message when no entries exist

#### DashboardScreen

- Header: Title and subtitle
- Stats Grid: 2-column grid of stat cards
- AI Insights: Scrollable cards with insights
- Charts: Activity over time, weekly pattern, distribution

#### AddHabitScreen

- Form: Name, description inputs
- Color Picker: Grid of color options
- Suggestions: List of habit suggestions
- Save Button: Primary action button

#### CameraScreen

- Camera View: Full-screen camera preview
- Controls: Capture, flip, gallery, close buttons
- Preview: Photo preview with retake/save actions
- Note Input: Optional note field

---

## Data Flow Architecture

### Entry Creation Complete Flow

```
1. User opens habit detail
   ↓
2. Taps camera button
   ↓
3. CameraScreen mounts
   ↓
4. User captures/selects photo
   ↓
5. Photo preview shown
   ↓
6. User adds optional note
   ↓
7. User taps Save
   ↓
8. entryService.createEntry() called
   ↓
9. AI Service classifies image:
   - classifier.classify() → category detection
   - tagGenerator.generate() → tag generation
   ↓
10. Entry object created with:
    - Photo URI
    - Note
    - Timestamp
    - AI metadata (category, tags, confidence)
   ↓
11. storage.saveHabitEntry() saves to AsyncStorage
   ↓
12. useHabits hook refreshes habit data:
    - Recalculates streaks
    - Updates latest photo
    - Updates entry counts
   ↓
13. UI updates:
    - HabitDetailScreen shows new entry
    - HomeScreen updates habit card
    - Dashboard recalculates stats
```

### AI Insights Generation Flow

```
1. User navigates to Dashboard
   ↓
2. useDashboard hook triggers
   ↓
3. dashboardAIService.getOverallAIInsights() called
   ↓
4. Loads all habits and entries from storage
   ↓
5. HabitInsightsLoader.loadAllHabitInsights():
   For each habit:
   a. Filters entries for that habit
   b. Calls AI services in parallel:
      - analyzeConsistency()
      - analyzeHabitStrength()
      - analyzeTrends()
      - recognizeAchievements()
      - analyzePredictions()
   c. Combines results into habit insight object
   ↓
6. Aggregation services process insights:
   a. InsightAggregator.aggregateConsistency()
      - Calculates average consistency
      - Counts by rating
   b. InsightAggregator.aggregateStrength()
      - Calculates average strength
      - Counts strong habits
   c. TrendAggregator.aggregateTrends()
      - Counts improving/declining/stable
   d. AchievementAggregator.aggregateAchievements()
      - Collects all achievements
      - Sorts by importance
   e. AlertAggregator.aggregateRiskAlerts()
      - Collects all alerts
      - Sorts by priority
   f. HabitSelector.getTopPerformingHabits()
      - Calculates performance scores
      - Returns top N
   g. HabitSelector.getHabitsNeedingAttention()
      - Identifies habits with issues
   h. MotivationGenerator.getOverallMotivation()
      - Generates contextual message
   ↓
7. Combined insights object returned
   ↓
8. DashboardAICard renders insights:
   - AIMotivationCard
   - AIConsistencyCard
   - AIStrengthCard
   - AIAlertsCard
   - AIAchievementsCard
   - AITopHabitsCard
   - AIHabitsNeedingAttentionCard
   - AITrendsCard
```

### Streak Calculation Flow

```
1. Habit entries loaded from storage
   ↓
2. Entries sorted by date (newest first)
   ↓
3. Entries grouped by date (YYYY-MM-DD)
   ↓
4. calculateStreak() function:
   a. Starts from today
   b. Checks if entry exists for today
   c. If yes, increment streak, move to yesterday
   d. Repeat until day with no entry found
   e. Return streak count
   ↓
5. Streak value attached to habit object
   ↓
6. Displayed in HabitCard component
```

---

## Privacy & Security

### Data Storage

- **Local-Only**: All data stored locally using AsyncStorage
- **No Cloud Sync**: No data transmission to external servers
- **User Control**: Users have full control over their data
- **No Analytics**: No usage analytics or tracking

### AI Processing

- **On-Device**: All AI processing happens on the device
- **No External APIs**: No calls to external AI services
- **Privacy-Preserving**: User photos never leave the device
- **Heuristic-Based**: Current implementation uses rule-based algorithms (no data collection)

### Permissions

- **Camera**: Required for photo capture
- **Photo Library**: Required for selecting existing photos
- **Minimal Permissions**: Only essential permissions requested

### Data Structure

- **Encrypted Storage**: AsyncStorage uses device encryption (iOS/Android native)
- **No Sensitive Data**: No passwords, payment info, or personal identifiers stored
- **User-Generated Content**: Only user-created habits and photos stored

---

## Performance Considerations

### Optimization Strategies

#### Data Loading

- **Lazy Loading**: Habit insights loaded on-demand
- **Parallel Processing**: AI analyses run in parallel using Promise.all()
- **Caching**: Habit data cached in React state
- **Debouncing**: Search and filter operations debounced

#### Rendering Optimization

- **FlatList**: Used for large lists (virtualization)
- **Memoization**: useMemo for expensive calculations
- **Callback Optimization**: useCallback for stable function references
- **Image Optimization**: Photo thumbnails used in lists

#### AI Processing

- **Async Processing**: All AI operations are async
- **Error Handling**: Graceful degradation if AI processing fails
- **Batch Processing**: Multiple insights processed together
- **Efficient Algorithms**: Optimized calculation algorithms

#### Storage Optimization

- **JSON Serialization**: Efficient data serialization
- **Selective Updates**: Only updated data saved
- **Storage Limits**: Awareness of AsyncStorage size limits

### Performance Metrics

**Target Performance**:

- App launch: < 2 seconds
- Screen navigation: < 300ms
- Photo capture: < 1 second
- AI insights generation: < 2 seconds (for 10 habits)
- List scrolling: 60 FPS

---

## Future Roadmap

### Phase 1: Enhanced AI (Short Term)

#### TensorFlow Lite Integration

- Integrate MobileNet V3 Small model
- Real-time image classification
- Improved accuracy over keyword matching
- Model size: ~5-7 MB

#### Advanced Image Analysis

- Photo quality assessment
- Duplicate detection
- Visual progress comparison
- Activity recognition within categories

### Phase 2: Features (Medium Term)

#### Reminders & Notifications

- Push notifications for optimal tracking times
- Reminder system based on patterns
- Streak protection reminders

#### Export & Sharing

- Export photos as PDF journal
- Share progress to social media
- Export analytics as CSV

#### Enhanced Analytics

- Custom date ranges
- Comparative analysis (period over period)
- Goal setting and tracking
- Progress projections

### Phase 3: Advanced Features (Long Term)

#### Cloud Sync

- Optional cloud backup (Firebase)
- Multi-device sync
- Account system

#### Social Features

- Share habits with friends
- Community challenges
- Leaderboards

#### Personalization

- Custom categories
- Learning user preferences
- Adaptive recomm
