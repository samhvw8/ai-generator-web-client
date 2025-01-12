import { useLoadingState } from '../../hooks/useLoadingState';
import { ImageGeneratorForm } from './ImageGeneratorForm';
import { ServiceType } from '../../services/imageService';
import { ImageGenerationOptions } from '../../types/image';

interface ImageGeneratorFormWrapperProps {
  models: string[];
  selectedService: ServiceType;
  onGenerate: (options: ImageGenerationOptions) => void;
  onCancel: () => void;
}

export function ImageGeneratorFormWrapper({
  models,
  selectedService,
  onGenerate,
  onCancel
}: ImageGeneratorFormWrapperProps) {
  const { isLoading } = useLoadingState();

  return (
    <ImageGeneratorForm
      models={models}
      isLoading={isLoading}
      onSubmit={onGenerate}
      onCancel={onCancel}
      selectedService={selectedService}
    />
  );
}