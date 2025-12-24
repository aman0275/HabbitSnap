# AI Services Architecture

## Overview

The AI services are organized into modular, focused services following clean code principles. Each service has a single responsibility and can be tested, maintained, and extended independently.

## Structure

```
src/services/ai/
├── index.js                    # Unified API export
├── classifier.js               # Image classification
├── consistencyAnalyzer.js      # Consistency analysis
├── progressAnalyzer.js         # Progress tracking
├── tagGenerator.js             # Tag generation
├── suggestionGenerator.js      # Smart suggestions
└── qualityAssessor.js          # Photo quality assessment
```

## Service Responsibilities

### 1. Classifier (`classifier.js`)
**Responsibility**: Image classification and category detection

- Detects habit category from image/habit name
- Calculates confidence scores
- Generates category predictions
- Ready for TensorFlow Lite integration

### 2. ConsistencyAnalyzer (`consistencyAnalyzer.js`)
**Responsibility**: Analyze tracking consistency patterns

- Calculates consistency scores
- Determines consistency ratings
- Generates personalized messages
- Provides actionable insights

### 3. ProgressAnalyzer (`progressAnalyzer.js`)
**Responsibility**: Analyze long-term progress and trends

- Tracks progress metrics
- Detects milestones
- Identifies improvement trends
- Generates progress insights

### 4. TagGenerator (`tagGenerator.js`)
**Responsibility**: Generate relevant tags for entries

- Creates category-based tags
- Adds time-based tags
- Adds day-based tags

### 5. SuggestionGenerator (`suggestionGenerator.js`)
**Responsibility**: Generate smart, personalized suggestions

- Consistency-based suggestions
- Timing-based reminders
- Milestone-based recommendations

### 6. QualityAssessor (`qualityAssessor.js`)
**Responsibility**: Assess photo quality

- Evaluates photo quality
- Provides feedback
- Ready for computer vision integration

## Design Principles Applied

### ✅ Single Responsibility Principle
Each service class handles one specific AI operation.

### ✅ Separation of Concerns
- Business logic separated into focused services
- Configuration extracted to constants
- Utility functions in separate module

### ✅ DRY (Don't Repeat Yourself)
- Common calculations in `utils/aiHelpers.js`
- Shared constants in `constants/aiConfig.js`
- Reusable patterns across services

### ✅ Open/Closed Principle
Services can be extended without modification:
- Add new analyzers by creating new service classes
- Extend existing services through inheritance/composition
- Swap implementations (e.g., ML model) easily

### ✅ Dependency Inversion
- Services depend on abstractions (constants, utilities)
- Unified API through `index.js`
- Easy to mock for testing

## Usage

### Through Unified API
```javascript
import { aiService } from '../services/ai';

// Classify image
const classification = await aiService.classifyImage(imageUri, habitName);

// Analyze consistency
const consistency = await aiService.analyzeConsistency(entries);

// Get suggestions
const suggestions = await aiService.getSmartSuggestions(habit, entries);
```

### Direct Service Access (Advanced)
```javascript
import { classifier, consistencyAnalyzer } from '../services/ai';

const result = await classifier.classify(imageUri, habitName);
const analysis = await consistencyAnalyzer.analyze(entries);
```

## Configuration

All configuration is centralized in `constants/aiConfig.js`:
- Confidence thresholds
- Analysis weights
- Time thresholds
- Window sizes

## Utilities

Common utilities are in `utils/aiHelpers.js`:
- Date calculations
- Entry filtering/sorting
- Score calculations
- Tag generation helpers

## Error Handling

Each service handles errors gracefully:
- Returns default/fallback values
- Logs errors for debugging
- Never throws unhandled errors

## Testing

Each service can be tested independently:
- Pure functions in utilities (easy to test)
- Service classes can be mocked
- Clear inputs and outputs

## Extension Points

### Adding a New Analyzer
1. Create new service file (e.g., `moodAnalyzer.js`)
2. Implement analyzer class with `analyze()` method
3. Export from `index.js`
4. Use through unified API

### Integrating TensorFlow Lite
1. Update `classifier.js` `classify()` method
2. Keep same interface
3. No changes needed in other services

### Adding New Analysis Metrics
1. Add configuration to `constants/aiConfig.js`
2. Create utility functions in `utils/aiHelpers.js`
3. Use in relevant analyzer service

## Benefits

✅ **Maintainability**: Easy to understand and modify
✅ **Testability**: Each service can be tested in isolation
✅ **Extensibility**: Easy to add new features
✅ **Reusability**: Services can be used independently
✅ **Readability**: Clear structure and naming
✅ **Scalability**: Easy to optimize individual services

