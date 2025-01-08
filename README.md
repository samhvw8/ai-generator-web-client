# AI Image Generator Client

A modern web application for generating AI-powered images using various models and providers.

## Features

- 🎨 Support for multiple AI image generation providers (OpenAI, Neko)
- 🔄 Dynamic model selection based on provider
- 📱 Responsive design with dark/light theme support
- ⚡ Real-time generation status and cancellation
- 🔒 Secure API key management
- 🎯 Error handling and validation

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/UI components
- Vite for build tooling

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

### Configuration

The application requires API configuration for image generation services:

1. Open the settings modal
2. Configure your provider's base URL and API key
3. Save settings (stored securely in cookies)

## Architecture

The application uses a service-based architecture with:

- Interface-based design using `ImageService`
- Provider-specific implementations (OpenAI, Neko)
- Component-based UI with React
- Cookie-based configuration storage
- Cancellable request support

## Project Structure

```
src/
├── atoms/          # State management
├── components/     # React components
├── hooks/          # Custom React hooks
├── services/       # API integration
│   ├── core/       # Core services
│   └── providers/  # Provider implementations
├── types/          # TypeScript types
└── lib/           # Utility functions
```

## Development

- Uses ESLint for code linting
- TypeScript for type safety
- Prettier for code formatting
- Follows React best practices

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
