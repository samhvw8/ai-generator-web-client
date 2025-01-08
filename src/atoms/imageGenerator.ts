import { atom } from 'jotai';
import { MidjourneyButton } from '../types/image';
import { ServiceType } from '../services/imageService';

export const imageUrlsAtom = atom<string[]>([]);
export const isLoadingAtom = atom(false);
export const errorAtom = atom('');
export const modelsAtom = atom<string[]>([]);
export const isLoadingModelsAtom = atom(false);
export const currentTaskIdAtom = atom('');
export const actionButtonsAtom = atom<MidjourneyButton[]>([]);
export const selectedServiceAtom = atom<ServiceType>('OpenAI');

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