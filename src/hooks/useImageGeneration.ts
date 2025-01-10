import { useAtom } from 'jotai';
import { services, ServiceType } from '../services/imageService';
import { ImageGenerationOptions } from '../types/image';
import {
  imageUrlsAtom,
  isLoadingAtom,
  errorAtom,
  isOpenAIServiceAtom,
  currentTaskIdAtom,
  progressAtom,
  resetGenerationAtom,
  updateActionResultAtom,
} from '../atoms/imageGenerator';
import { useAbortController } from './useAbortController';

export function useImageGeneration(selectedService: ServiceType) {
  const [, setImageUrls] = useAtom(imageUrlsAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [isOpenAIService] = useAtom(isOpenAIServiceAtom);
  const [currentTaskId] = useAtom(currentTaskIdAtom);
  const [, setProgress] = useAtom(progressAtom);
  const [, resetGeneration] = useAtom(resetGenerationAtom);
  const [, updateActionResult] = useAtom(updateActionResultAtom);
  
  const { getSignal, abort } = useAbortController();
  const currentService = services[selectedService];

  const handleProgress = (progressText: string) => {
    const percentMatch = progressText.match(/(\d+)%/);
    const progressValue = percentMatch ? parseInt(percentMatch[1], 10) : 0;
    setProgress({ value: progressValue, text: progressText });
  };

  const generateImage = async (options: ImageGenerationOptions) => {
    setIsLoading(true);
    resetGeneration();
    setProgress({ value: 0, text: '' });
    
    try {
      const signal = getSignal();
      const isMultiImageOpenAI = isOpenAIService &&
        options.numberOfImages > 1 &&
        options.model !== 'dall-e-3';

      if (isMultiImageOpenAI) {
        const results = await Promise.all(
          Array.from({ length: options.numberOfImages }, () =>
            currentService.generateImage(options, signal, handleProgress)
          )
        );
        setImageUrls(results.map(result => result.imageUrl));
      } else {
        const result = await currentService.generateImage(
          options,
          signal,
          handleProgress
        );
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
    }
  };

  const submitAction = async (customId: string) => {
    if (!('submitAction' in currentService)) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const signal = getSignal();
      const result = await currentService.submitAction!(customId, currentTaskId, signal);
      updateActionResult(result);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Error submitting action:', error);
      setError('Failed to process action. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateImage,
    submitAction,
    cancelGeneration: abort,
    isLoading,
  };
}