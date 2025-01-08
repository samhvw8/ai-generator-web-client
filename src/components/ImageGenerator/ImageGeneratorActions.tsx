import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useAtom } from 'jotai';
import { actionButtonsAtom, isActionButtonsLoadingAtom } from '../../atoms/imageGenerator';

interface ImageGeneratorActionsProps {
  onAction: (customId: string) => void;
}

export function ImageGeneratorActions({ onAction }: ImageGeneratorActionsProps) {
  const [actionButtons] = useAtom(actionButtonsAtom);
  const [isActionButtonsLoading] = useAtom(isActionButtonsLoadingAtom);

  if (actionButtons.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {actionButtons.map((button) => (
        <Button
          key={button.customId}
          onClick={() => onAction(button.customId)}
          disabled={isActionButtonsLoading}
          variant="outline"
          className="flex items-center gap-2"
        >
          {isActionButtonsLoading && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <span>{button.emoji}</span>
          <span>{button.label}</span>
        </Button>
      ))}
    </div>
  );
}
