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
  taskStatusAtom,
} from '../atoms/imageGenerator';
import { useAbortController } from './useAbortController';

export function useImageGeneration(
  selectedService: ServiceType,
  onProgress?: (taskId: string, progressText: string) => void
) {
  const [, setImageUrls] = useAtom(imageUrlsAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, setError] = useAtom(errorAtom);
  const [isOpenAIService] = useAtom(isOpenAIServiceAtom);
  const [currentTaskId] = useAtom(currentTaskIdAtom);
  const [, setProgress] = useAtom(progressAtom);
  const [, resetGeneration] = useAtom(resetGenerationAtom);
  const [, updateActionResult] = useAtom(updateActionResultAtom);
  const [, setTaskStatus] = useAtom(taskStatusAtom);
  
  const { getSignal, abort } = useAbortController();
  const currentService = services[selectedService];

  const handleProgress = (progressText: string) => {
    const percentMatch = progressText.match(/(\d+)%/);
    const progressValue = percentMatch ? parseInt(percentMatch[1], 10) : 0;
    setProgress({ value: progressValue, text: progressText });
    
    // Call the onProgress callback if provided
    if (onProgress && currentTaskId) {
      onProgress(currentTaskId, progressText);
    }
  };

  const generateImage = async (options: ImageGenerationOptions) => {
    setIsLoading(true);
    resetGeneration();
    setProgress({ value: 0, text: '' });
    setTaskStatus({
      status: 'PENDING',
      taskId: '',
      progress: 'Initializing generation...',
      estimatedWaitTime: undefined,
    });
    
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
        setTaskStatus(prev => ({
          ...prev,
          status: 'SUCCESS',
          progress: 'Generation completed successfully',
        }));
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setTaskStatus(prev => ({
          ...prev,
          status: 'FAILED',
          failReason: 'Generation was cancelled'
        }));
        return;
      }
      console.error('Error generating image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate image. Please try again.';
      setError(errorMessage);
      setTaskStatus(prev => ({
        ...prev,
        status: 'FAILED',
        failReason: errorMessage
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const submitAction = async (customId: string) => {
    if (!('submitAction' in currentService)) return;
    
    setIsLoading(true);
    setError('');
    setTaskStatus({
      status: 'PENDING',
      taskId: currentTaskId,
      progress: 'Processing action...',
      estimatedWaitTime: undefined,
    });
    
    try {
      const signal = getSignal();
      const result = await currentService.submitAction!(customId, currentTaskId, signal);
      updateActionResult(result);
      setTaskStatus(prev => ({
        ...prev,
        status: 'SUCCESS',
        progress: 'Action completed successfully',
      }));
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setTaskStatus(prev => ({
          ...prev,
          status: 'FAILED',
          failReason: 'Action was cancelled'
        }));
        return;
      }
      console.error('Error submitting action:', error);
      const errorMessage = 'Failed to process action. Please try again.';
      setError(errorMessage);
      setTaskStatus(prev => ({
        ...prev,
        status: 'FAILED',
        failReason: errorMessage
      }));
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