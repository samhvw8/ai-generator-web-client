import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { MidjourneyButton, MidjourneyTaskResponse } from '../types/image';
import { ServiceType } from '../services/imageService';

export const imageUrlsAtom = atom<string[]>([]);
export const isLoadingAtom = atom(false);
export const errorAtom = atom('');
export const modelsAtom = atom<string[]>([]);
export const isLoadingModelsAtom = atom(false);
export const currentTaskIdAtom = atom('');
export const actionButtonsAtom = atom<MidjourneyButton[]>([]);

// Task status atom to track detailed progress
export const taskStatusAtom = atom<{
  status: MidjourneyTaskResponse['status'];
  taskId: string;
  progress: string;
  failReason?: string;
  estimatedWaitTime?: number;
}>({
  status: 'PENDING',
  taskId: '',
  progress: '',
  failReason: undefined,
  estimatedWaitTime: undefined,
});

// Default base URLs for services
export const DEFAULT_BASE_URLS: Record<ServiceType, string> = {
  'OpenAI': 'https://api.openai.com/v1',
  'Midjourney': 'https://api.midjourney.com'
} as const;

// Persisted atoms using atomWithStorage
export const selectedServiceAtom = atomWithStorage<ServiceType>('selectedService', 'OpenAI');

// Service-specific storage atoms
const openAiBaseUrlStorage = atomWithStorage<string>('openAiBaseUrl', DEFAULT_BASE_URLS['OpenAI']);
const openAiApiKeyStorage = atomWithStorage<string>('openAiApiKey', '');
const mjBaseUrlStorage = atomWithStorage<string>('mjBaseUrl', DEFAULT_BASE_URLS['Midjourney']);
const mjApiKeyStorage = atomWithStorage<string>('mjApiKey', '');

// Dynamic atoms that select the correct storage based on service
export const baseUrlAtom = atom(
  (get) => get(get(selectedServiceAtom) === 'OpenAI' ? openAiBaseUrlStorage : mjBaseUrlStorage),
  (get, set, newValue: string) => {
    set(get(selectedServiceAtom) === 'OpenAI' ? openAiBaseUrlStorage : mjBaseUrlStorage, newValue);
  }
);

export const apiKeyAtom = atom(
  (get) => get(get(selectedServiceAtom) === 'OpenAI' ? openAiApiKeyStorage : mjApiKeyStorage),
  (get, set, newValue: string) => {
    set(get(selectedServiceAtom) === 'OpenAI' ? openAiApiKeyStorage : mjApiKeyStorage, newValue);
  }
);

export const progressAtom = atom<{ value: number; text: string }>({ value: 0, text: '' });

// Trigger atom for reloading
export const reloadTriggerAtom = atom(0);

export const forceSettingsOpenAtom = atom<boolean>(false);

// Derived atoms
export const isOpenAIServiceAtom = atom(
  (get) => get(selectedServiceAtom) === 'OpenAI'
);

export const isActionButtonsLoadingAtom = atom(
  (get) => get(isLoadingAtom) && get(currentTaskIdAtom) !== ''
);

// Action atoms
export const resetGenerationAtom = atom(
  null,
  (get, set) => {
    set(imageUrlsAtom, []);
    set(actionButtonsAtom, []);
    set(currentTaskIdAtom, '');
    set(errorAtom, '');
    set(progressAtom, { value: 0, text: '' });
    set(taskStatusAtom, {
      status: 'PENDING',
      taskId: '',
      progress: '',
      failReason: undefined,
      estimatedWaitTime: undefined,
    });
  }
);

export const updateActionResultAtom = atom(
  null,
  (get, set, result: { imageUrl: string; taskId: string; buttons: MidjourneyButton[] }) => {
    set(imageUrlsAtom, [result.imageUrl]);
    set(currentTaskIdAtom, result.taskId);
    set(actionButtonsAtom, result.buttons);
  }
);