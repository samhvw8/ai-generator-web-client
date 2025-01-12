# Technical Context

## Technologies Used
- React 18 with TypeScript
- Jotai for state management
- Tailwind CSS for styling
- Shadcn/UI for component library
- Lucide React for icons
- Radix UI for accessible components

## Development Setup
- Vite for build tooling
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## Technical Constraints
- Browser cookie storage for API configuration
- Cross-browser compatibility requirements
- Mobile-responsive design requirements
- Type-safe service implementations
- Progress tracking requirements
- Dynamic configuration validation

## State Management
### Jotai Atoms
```typescript
interface ProgressState {
  value: number;
  text: string;
}

// Core atoms
imageUrlsAtom: Atom<string[]>
isLoadingAtom: Atom<boolean>
errorAtom: Atom<string>
modelsAtom: Atom<string[]>
progressAtom: Atom<ProgressState>
currentTaskIdAtom: Atom<string>
resetGenerationAtom: Atom<null>
updateActionResultAtom: Atom<null>
isOpenAIServiceAtom: Atom<boolean>
```

## Service Layer Implementation
### ConfigurationService
```typescript
export type ConfigKey = string;
export type ConfigValue = any;

export type ApiConfig = Record<ConfigKey, ConfigValue>;

export class ConfigurationService {
  constructor(configKeys: string[]);
  getConfig(): Promise<ApiConfig>;
  isConfigured(): Promise<boolean>;
  updateApiSettings(config: ApiConfig): Promise<void>;
}
```

### ImageService Interface
```typescript
interface ImageService {
  isConfigured(): Promise<boolean>;
  updateApiSettings(baseUrl: string, apiKey: string): Promise<void>;
  fetchModels(): Promise<string[]>;
  generateImage(
    options: ImageGenerationOptions, 
    signal?: AbortSignal,
    onProgress?: (text: string) => void
  ): Promise<GenerationResult>;
  submitAction?(
    customId: string,
    taskId: string,
    signal: AbortSignal
  ): Promise<ActionResult>;
}
```

### Service Implementations
1. OpenAiImageService
   - Compatible with OpenAI API v1
   - Supports DALL-E 2 and 3 models
   - Handles quality and style parameters
   - Supports multiple image generation
   - Real-time progress tracking
   - Action submission support
   - Dynamic configuration management

2. NekoImageService
   - Compatible with Neko API
   - Supports custom model selection
   - Handles parallel image generation
   - Progress tracking integration
   - Custom action handling
   - Dynamic configuration management

### Progress Tracking
- Real-time progress updates via callback
- Percentage extraction from text updates
- Progress bar visualization
- Service-agnostic implementation

### Configuration Management
- Dynamic configuration using Record<string, any>
- Required config keys validation
- Cookie-based storage per service
- Separate base URL and API key storage
- Encrypted storage for sensitive data
- Type-safe configuration handling
- Runtime config validation
- Extensible config structure

### Error Handling
- Custom error types for API failures
- Request cancellation support
- Error message normalization
- Type-safe error handling
- Progress state error handling
- Configuration validation errors

## Performance Considerations
- Lazy loading of components
- Image optimization
- Request cancellation for abandoned operations
- Parallel request handling for multiple images
- Progress update throttling
- State updates optimization
- Configuration validation caching

## Security Measures
- API keys stored in encrypted cookies
- HTTPS-only API communication
- Request validation before submission
- Sanitized error messages
- Type-safe request handling
- Configuration data encryption

## Future Technical Considerations
- Service switching mechanism
- Retry logic implementation
- Rate limiting handling
- Error recovery strategies
- Caching layer for responses
- Progress tracking standardization
- Service discovery mechanism
- Action result caching
- Batch operation support
- Configuration migration system
- Config backup/restore mechanism

## Development Guidelines
1. State Management
   - Use Jotai atoms for global state
   - Keep component state minimal
   - Implement atomic updates
   - Handle state reset properly

2. Service Implementation
   - Follow ImageService interface
   - Implement progress tracking
   - Handle cancellation properly
   - Normalize error messages
   - Type all responses
   - Validate configuration

3. Component Development
   - Follow container pattern
   - Implement progress feedback
   - Handle loading states
   - Manage error states
   - Support cancellation
   - Handle config updates

4. Progress Tracking
   - Implement onProgress callback
   - Parse progress text
   - Update progress state
   - Handle edge cases
   - Provide visual feedback

5. Configuration Management
   - Validate required keys
   - Handle dynamic configs
   - Implement type checking
   - Secure sensitive data
   - Support config extensions