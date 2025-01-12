import { useAtom } from 'jotai';
import { Card, CardContent } from '../ui/card';
import { ServiceType } from '../../services/imageService';
import {
  errorAtom,
  modelsAtom,
} from '../../atoms/imageGenerator';
import { useModelLoader } from '../../hooks/useModelLoader';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { useTaskProgress } from '../../hooks/useTaskProgress';
import { ImageGeneratorFormWrapper } from './ImageGeneratorFormWrapper';
import { ImageGeneratorDisplay } from './ImageGeneratorDisplay';
import { ImageGeneratorActions } from './ImageGeneratorActions';
import { TaskStatus } from './TaskStatus';
import { ProgressDisplay } from './ProgressDisplay';
import { ErrorDisplay } from './ErrorDisplay';

interface ImageGeneratorContainerProps {
  reloadTrigger: number;
  selectedService: ServiceType;
}

export function ImageGeneratorContainer({ reloadTrigger, selectedService }: ImageGeneratorContainerProps) {
  const [error] = useAtom(errorAtom);
  const [models] = useAtom(modelsAtom);
  const { progress, updateProgress } = useTaskProgress();
  
  const {
    generateImage,
    submitAction,
    cancelGeneration,
    isLoading
  } = useImageGeneration(selectedService, updateProgress);

  // Load models using custom hook
  useModelLoader(reloadTrigger, selectedService);

  return (
    <div className="container mx-auto px-4 py-8 transition-all duration-200">
      <Card className="max-w-screen-xl mx-auto border-0 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg transition-all duration-200">
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <ImageGeneratorFormWrapper
              models={models}
              selectedService={selectedService}
              onGenerate={generateImage}
              onCancel={cancelGeneration}
            />
            
            <ProgressDisplay
              isLoading={isLoading}
              progress={progress}
            />

            <div className="space-y-4">
              <TaskStatus />
              <ErrorDisplay error={error} />
            </div>

            <ImageGeneratorDisplay />
            <ImageGeneratorActions onAction={submitAction} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}