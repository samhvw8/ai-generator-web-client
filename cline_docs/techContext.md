# Technical Context

## Technologies Used
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/UI for component library
- Lucide React for icons

## Development Setup
- Vite for build tooling
- ESLint for code linting
- Prettier for code formatting

## Technical Constraints
- Browser cookie storage for API configuration
- Cross-browser compatibility requirements
- Mobile-responsive design requirements

## Service Layer Implementation
### ImageService Interface
```typescript
interface ImageService {
  isConfigured(): Promise<boolean>;
  updateApiSettings(baseUrl: string, apiKey: string): Promise<void>;
  fetchModels(): Promise<string[]>;
  generateImage(options: ImageGenerationOptions, signal?: AbortSignal): Promise<string>;
}
```

### Service Implementations
1. OpenAiImageService
   - Compatible with OpenAI API v1
   - Supports DALL-E 2 and 3 models
   - Handles quality and style parameters
   - Supports multiple image generation

2. NekoImageService
   - Compatible with Neko API
   - Supports custom model selection
   - Handles parallel image generation

### Configuration Management
- Cookie-based storage per service
- Separate base URL and API key storage
- Encrypted storage for sensitive data

### Error Handling
- Custom error types for API failures
- Request cancellation support
- Error message normalization

## Performance Considerations
- Lazy loading of components
- Image optimization
- Request cancellation for abandoned operations
- Parallel request handling for multiple images

## Security Measures
- API keys stored in encrypted cookies
- HTTPS-only API communication
- Request validation before submission
- Sanitized error messages

## Future Technical Considerations
- Service switching mechanism
- Retry logic implementation
- Rate limiting handling
- Error recovery strategies
- Caching layer for responses