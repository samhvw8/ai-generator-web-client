import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  selectedServiceAtom,
  baseUrlAtom,
  apiKeyAtom,
  forceSettingsOpenAtom,
  reloadTriggerAtom,
  DEFAULT_BASE_URLS
} from '../atoms/imageGenerator';
import { ServiceType, getCurrentService } from '../services/imageService';

interface ValidationState {
  baseUrl: boolean;
  apiKey: boolean;
}

interface UseSettingsFormReturn {
  selectedService: ServiceType;
  setSelectedService: (service: ServiceType) => void;
  baseUrl: string;
  setBaseUrl: (url: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isLoading: boolean;
  error: string | null;
  validation: ValidationState;
  handleSave: () => Promise<void>;
  getDefaultBaseUrl: (service: ServiceType) => string;
}

export function useSettingsForm(): UseSettingsFormReturn {
  const [selectedService, setSelectedService] = useAtom(selectedServiceAtom);
  const [baseUrl, setBaseUrl] = useAtom(baseUrlAtom);
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [, setForceOpen] = useAtom(forceSettingsOpenAtom);
  const [, setReloadTrigger] = useAtom(reloadTriggerAtom);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationState>({
    baseUrl: true,
    apiKey: true
  });

  const getDefaultBaseUrl = (service: ServiceType) => DEFAULT_BASE_URLS[service];

  const validateFields = () => {
    const newValidation = {
      baseUrl: Boolean(baseUrl && baseUrl.trim()),
      apiKey: Boolean(apiKey && apiKey.trim())
    };
    setValidation(newValidation);
    return Object.values(newValidation).every(Boolean);
  };

  const handleSave = async () => {
    if (!validateFields()) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const service = getCurrentService(selectedService);
      await service.updateApiSettings(baseUrl, apiKey);
      const isValid = await service.isConfigured();
      
      if (!isValid) {
        throw new Error("Invalid configuration. Please check your settings.");
      }

      setReloadTrigger((prev: number) => prev + 1);
      setForceOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedService,
    setSelectedService,
    baseUrl,
    setBaseUrl,
    apiKey,
    setApiKey,
    isLoading,
    error,
    validation,
    handleSave,
    getDefaultBaseUrl
  };
}