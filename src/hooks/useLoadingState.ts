import { useAtom } from 'jotai';
import { isLoadingAtom, isLoadingModelsAtom } from '../atoms/imageGenerator';

export function useLoadingState() {
  const [isLoading] = useAtom(isLoadingAtom);
  const [isLoadingModels] = useAtom(isLoadingModelsAtom);

  return {
    isLoading: isLoading || isLoadingModels,
    isProcessing: isLoading,
    isLoadingModels
  };
}