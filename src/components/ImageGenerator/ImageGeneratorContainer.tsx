import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { Card, CardContent } from '../ui/card';
import { services, ServiceType } from '../../services/imageService';
import { ImageGenerationOptions } from '../../types/image';
import {
  imageUrlsAtom,
  isLoadingAtom,
  errorAtom,
  modelsAtom,
  updateActionResultAtom,
  resetGenerationAtom,
  isOpenAIServiceAtom,
  currentTaskIdAtom,
} from '../../atoms/imageGenerator';
import { useModelLoader } from '../../hooks/useModelLoader';
import { ImageGeneratorControls } from './ImageGeneratorControls';
import { ImageGeneratorDisplay } from './ImageGeneratorDisplay';
import { ImageGeneratorActions } from './ImageGeneratorActions';

interface ImageGeneratorContainerProps {
  reloadTrigger: number;
  selectedService: ServiceType;
}

export function ImageGeneratorContainer({ reloadTrigger, selectedService }: ImageGeneratorContainerProps) {
  const [, setImageUrls] = useAtom(imageUrlsAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [models] = useAtom(modelsAtom);
  const [isOpenAIService] = useAtom(isOpenAIServiceAtom);
  const [currentTaskId] = useAtom(currentTaskIdAtom);
  const [, resetGeneration] = useAtom(resetGenerationAtom);
  const [, updateActionResult] = useAtom(updateActionResultAtom);
  const abortController = useRef<AbortController | null>(null);

  const currentService = services[selectedService];

  // Load models using custom hook
  useModelLoader(reloadTrigger, selectedService);

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  const handleCancel = () => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
      setIsLoading(false);
      setError('Image generation cancelled');
    }
  };

  const handleAction = async (customId: string) => {
    if (!('submitAction' in currentService)) return;
    
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await currentService.submitAction!(customId, currentTaskId, abortController.current.signal);
      updateActionResult(result);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Error submitting action:', error);
      setError('Failed to process action. Please try again.');
    } finally {
      setIsLoading(false);
      abortController.current = null;
    }
  };

  const handleGenerate = async (options: ImageGenerationOptions) => {
    if (abortController.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController();
    setIsLoading(true);
    resetGeneration();
    
    try {
      const isMultiImageOpenAI = isOpenAIService && 
        options.numberOfImages > 1 && 
        options.model !== 'dall-e-3';

      if (isMultiImageOpenAI) {
        const results = await Promise.all(
          Array.from({ length: options.numberOfImages }, () =>
            currentService.generateImage(options, abortController.current!.signal)
          )
        );
        setImageUrls(results.map(result => result.imageUrl));
      } else {
        const result = await currentService.generateImage(options, abortController.current.signal);
        updateActionResult(result);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
      abortController.current = null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-screen-xl mx-auto border-0 dark:bg-gray-800/50 backdrop-blur-sm">
        <CardContent className="space-y-6">
          <ImageGeneratorControls
            models={models}
            selectedService={selectedService}
            onGenerate={handleGenerate}
            onCancel={handleCancel}
          />
          <ImageGeneratorDisplay />
          <ImageGeneratorActions onAction={handleAction} />
        </CardContent>
      </Card>
    </div>
  );
}