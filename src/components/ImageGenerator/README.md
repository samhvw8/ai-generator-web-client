# ImageGenerator Component Structure

The ImageGenerator component has been split into several smaller, more focused components for better maintainability and separation of concerns:

## Components

- `ImageGeneratorContainer`: Main container component that manages state and coordinates child components
- `ImageGeneratorControls`: Handles the form and cancel button for image generation
- `ImageGeneratorDisplay`: Manages the display of generated images and error messages
- `ImageGeneratorActions`: Handles action buttons for services like Midjourney

## State Management

State is managed using Jotai atoms defined in `src/atoms/imageGenerator.ts`. This includes:
- Basic state (images, loading, errors)
- Derived state (OpenAI service detection, action button loading)
- Action atoms for complex state updates

## Usage

```tsx
import { ImageGenerator } from './components/ImageGenerator';

function App() {
  return (
    <ImageGenerator
      reloadTrigger={reloadTrigger}
      selectedService={selectedService}
    />
  );
}