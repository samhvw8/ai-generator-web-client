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
        selectedService={selectedService}
      />

      {isLoading && (
        <div className="flex justify-center">
          <Button 
            variant="destructive"
            onClick={onCancel}
            className="animate-in fade-in-50 flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Cancel Generation
          </Button>
        </div>
      )}
    </>
  );
}