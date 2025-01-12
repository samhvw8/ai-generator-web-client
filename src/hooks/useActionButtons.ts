import { useAtom } from 'jotai';
import { actionButtonsAtom, isActionButtonsLoadingAtom } from '../atoms/imageGenerator';

export interface ActionButton {
  customId: string;
  emoji: string;
  label: string;
}

export function useActionButtons() {
  const [actionButtons] = useAtom(actionButtonsAtom);
  const [isLoading] = useAtom(isActionButtonsLoadingAtom);

  return {
    actionButtons,
    isLoading,
    hasActions: actionButtons.length > 0
  };
}