# System Patterns

## Architecture

### Image Generation Service Layer
- Interface-based design using `ImageService` interface
- Service implementations for different providers:
  - `OpenAiImageService`: OpenAI API integration
  - `NekoImageService`: Neko API integration
- Default service instance with wrapper functions for backward compatibility
- Cookie-based configuration storage per service

### Component Architecture
- App.tsx: Top-level component managing API configuration
- ImageGenerator: Main component handling image generation flow
- ImageGeneratorForm: Form component for generation options
- ImagePreview: Display component for generated images

### Data Flow
1. User configures API settings via SettingsModal
2. Settings stored in cookies per service
3. User inputs generation options in ImageGeneratorForm
4. ImageGenerator handles generation via service layer
5. Results displayed in ImagePreview component

### State Management
- React useState for component-level state
- Cookie storage for API configuration
- Props for component communication

### Error Handling
- Service-level error handling with custom error messages
- Component-level error display
- Request cancellation support via AbortController

### API Integration
- Separate service implementations per provider
- Common interface ensuring consistent behavior
- Configuration management per service
- Request/response normalization

## Best Practices
- Interface-driven development
- Separation of concerns
- Single responsibility principle
- Dependency injection ready
- Error boundary implementation
- Progressive enhancement
- Responsive design
- Dark mode support