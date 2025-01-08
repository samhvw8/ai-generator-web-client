import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { ServiceType, services } from '../services/imageService';
import { modelsAtom, isLoadingModelsAtom, errorAtom } from '../atoms/imageGenerator';

export function useModelLoader(reloadTrigger: number, selectedService: ServiceType) {
  const [, setModels] = useAtom(modelsAtom);
  const [, setIsLoadingModels] = useAtom(isLoadingModelsAtom);
  const [, setError] = useAtom(errorAtom);

  useEffect(() => {
    const loadModels = async () => {
      if (selectedService !== 'OpenAI') {
        setModels([]);
        return;
      }

      const currentService = services[selectedService];

      try {
        setIsLoadingModels(true);
        setError('');
        const availableModels = await currentService.fetchModels();
        setModels(availableModels);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('Failed to load available models');
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, [reloadTrigger, selectedService, setError, setIsLoadingModels, setModels]);
}