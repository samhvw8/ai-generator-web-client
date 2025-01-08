import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useAtom } from 'jotai';
import { isLoadingAtom, isLoadingModelsAtom } from '../../atoms/imageGenerator';
import { ImageGeneratorForm } from '../ImageGeneratorForm';
import { ServiceType } from '../../services/imageService';
import { ImageGenerationOptions } from '../../types/image';

interface ImageGeneratorControlsProps {
  models: string[];
  selectedService: ServiceType;
  onGenerate: (options: ImageGenerationOptions) => void;
  onCancel: () => void;
}

export function ImageGeneratorControls({
  models,
  selectedService,
  onGenerate,
  onCancel
}: ImageGeneratorControlsProps) {
  const [isLoading] = useAtom(isLoadingAtom);
  const [isLoadingModels] = useAtom(isLoadingModelsAtom);

  return (
    <>
      <ImageGeneratorForm
        models={models}
        isLoading={isLoading || isLoadingModels}
        onSubmit={onGenerate}
        onCancel={onCancel}
        selectedService={selectedService}
      />
    </>
  );
}