# System Patterns

## Architecture

### State Management
- Jotai for global state management
  - `imageUrlsAtom`: Stores generated image URLs
  - `isLoadingAtom`: Tracks generation status
  - `errorAtom`: Manages error states
  - `modelsAtom`: Available AI models
  - `progressAtom`: Tracks generation progress
  - `currentTaskIdAtom`: Manages task identification
  - `resetGenerationAtom`: Handles state reset
  - `updateActionResultAtom`: Manages action results
  - `isOpenAIServiceAtom`: Service type indicator

### Container Pattern
The application implements a container pattern for the main image generator:
- `ImageGeneratorContainer`: Smart component that:
  - Manages state and business logic
  - Handles image generation flow
  - Controls progress updates
  - Manages service interactions
  - Coordinates child components
- Child Components:
  - `ImageGeneratorControls`: UI for generation options
  - `ImageGeneratorDisplay`: Image display component
  - `ImageGeneratorActions`: Action buttons component

### Configuration System
- Dynamic configuration using Record<string, any>
- ConfigurationService pattern:
  - Accepts array of required config keys
  - Validates config completeness
  - Type-safe config access
  - Extensible for new config options
- Per-service configuration:
  - Service-specific storage atoms
  - Dynamic atom selection based on service
  - Persistent storage via atomWithStorage
- Config validation:
  - Required keys validation
  - Runtime type checking
  - Error handling for missing configs

### Image Generation Service Layer
- Interface-based design using `ImageService` interface
- Service implementations for different providers:
  - `OpenAiImageService`: OpenAI API integration
    - Supports DALL-E 2 and 3
    - Handles multiple image generation
    - Progress tracking support
  - `NekoImageService`: Neko API integration
    - Custom model support
    - Progress tracking integration
- Service factory pattern with `services` object
- Type-safe service selection with `ServiceType`

### Progress Tracking
- Real-time progress visualization
- Percentage extraction from progress text
- Progress bar component integration
- Service-agnostic progress updates

### Data Flow
1. User configures API settings via SettingsModal
2. Settings stored in cookies per service
3. Container component loads models via useModelLoader
4. User inputs generation options
5. Container handles generation via selected service
6. Progress updates shown in real-time
7. Results displayed in ImageGeneratorDisplay

### Error Handling
- Service-level error handling with custom error messages
- Component-level error display
- Request cancellation support via AbortController
- Error state management through Jotai atoms
- Configuration validation errors

### API Integration
- Separate service implementations per provider
- Common interface ensuring consistent behavior
- Dynamic configuration management per service
- Request/response normalization
- Progress tracking standardization
- Config validation and error handling

## Best Practices
- Interface-driven development
- Container pattern for complex components
- Atomic state management with Jotai
- Separation of concerns
- Single responsibility principle
- Dependency injection ready
- Error boundary implementation
- Progressive enhancement
- Responsive design
- Dark mode support
- Type safety with TypeScript
- Real-time progress feedback
- Cancellable operations
- Dynamic configuration management
- Runtime validation

## Code Organization
```
src/
├── components/
│   ├── ImageGenerator/
│   │   ├── ImageGeneratorContainer.tsx   # Main container
│   │   ├── ImageGeneratorControls.tsx    # Generation options
│   │   ├── ImageGeneratorDisplay.tsx     # Image display
│   │   └── ImageGeneratorActions.tsx     # Action buttons
│   └── ui/                              # Shared UI components
├── services/
│   ├── core/
│   │   ├── configurationService.ts      # Dynamic config management
│   │   └── apiService.ts                # API integration
│   ├── providers/
│   │   ├── openAiImageService.ts        # OpenAI implementation
│   │   └── nekoImageService.ts          # Neko implementation
│   └── imageService.ts                  # Service interface & factory
├── atoms/
│   └── imageGenerator.ts                # Jotai state atoms
└── hooks/
    └── useModelLoader.ts                # Model loading logic