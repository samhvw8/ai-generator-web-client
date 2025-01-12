import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useActionButtons } from '../../hooks/useActionButtons';

interface ImageGeneratorActionsProps {
  onAction: (customId: string) => void;
}

export function ImageGeneratorActions({ onAction }: ImageGeneratorActionsProps) {
  const { actionButtons, isLoading, hasActions } = useActionButtons();

  if (!hasActions) return null;

  return (
    <div 
      className="flex flex-wrap gap-2 justify-center mt-4"
      role="toolbar"
      aria-label="Image actions"
    >
      {actionButtons.map((button) => (
        <Button
          key={button.customId}
          onClick={() => onAction(button.customId)}
          disabled={isLoading}
          variant="outline"
          className="flex items-center gap-2"
          aria-label={`${button.label} action`}
          aria-busy={isLoading}
        >
          {isLoading && (
            <Loader2 
              className="h-4 w-4 animate-spin" 
              aria-hidden="true"
            />
          )}
          <span role="img" aria-label={button.emoji}>
            {button.emoji}
          </span>
          <span>{button.label}</span>
        </Button>
      ))}
    </div>
  );
}

// Re-export types
export type { ActionButton } from '../../hooks/useActionButtons';
