import { useAtom } from 'jotai';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { ServiceType } from '../../services/imageService';
import {
  errorAtom,
  modelsAtom,
  progressAtom,
} from '../../atoms/imageGenerator';
import { useModelLoader } from '../../hooks/useModelLoader';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { ImageGeneratorControls } from './ImageGeneratorControls';
import { ImageGeneratorDisplay } from './ImageGeneratorDisplay';
import { ImageGeneratorActions } from './ImageGeneratorActions';

interface ImageGeneratorContainerProps {
  reloadTrigger: number;
  selectedService: ServiceType;
}

export function ImageGeneratorContainer({ reloadTrigger, selectedService }: ImageGeneratorContainerProps) {
  const [error] = useAtom(errorAtom);
  const [models] = useAtom(modelsAtom);
  const [progress] = useAtom(progressAtom);
  
  const {
    generateImage,
    submitAction,
    cancelGeneration,
    isLoading
  } = useImageGeneration(selectedService);

  // Load models using custom hook
  useModelLoader(reloadTrigger, selectedService);

  return (
    <div className="container mx-auto px-4 py-8 transition-all duration-200">
      <Card className="max-w-screen-xl mx-auto border-0 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg transition-all duration-200">
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <ImageGeneratorControls
              models={models}
              selectedService={selectedService}
              onGenerate={generateImage}
              onCancel={cancelGeneration}
            />
            {/* Preserve space for progress bar to prevent layout shifts */}
            <div className={`min-h-[4rem] transition-opacity duration-200 ${isLoading && progress.text ? 'opacity-100' : 'opacity-0'}`}>
              {isLoading && progress.text && (
                <div className="w-full space-y-2" role="status" aria-label="Generation Progress">
                  <Progress
                    value={progress.value}
                    className="w-full"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress.value}
                    aria-valuetext={progress.text}
                  />
                  <div className="text-center text-sm text-muted-foreground" aria-live="polite">
                    {progress.text}
                  </div>
                </div>
              )}
            </div>
            {/* Error message display */}
            <div
              className={`transition-opacity duration-200 ${error ? 'opacity-100' : 'opacity-0'}`}
              role="alert"
              aria-live="polite"
            >
              {error && (
                <div className="p-4 rounded-lg bg-destructive/15 text-destructive dark:bg-destructive/10 dark:text-destructive-foreground">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
            <ImageGeneratorDisplay />
            <ImageGeneratorActions onAction={submitAction} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}