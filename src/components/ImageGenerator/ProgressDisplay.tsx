import { Progress } from '../ui/progress';

interface ProgressDisplayProps {
  isLoading: boolean;
  progress: {
    value: number;
    text: string;
  };
}

export function ProgressDisplay({ isLoading, progress }: ProgressDisplayProps) {
  return (
    <div className={`min-h-[4rem] transition-opacity duration-200 ${isLoading && progress.text ? 'opacity-100' : 'opacity-0'}`}>
      {isLoading && progress.text && (
        <div className="w-full space-y-2" role="status" aria-label="Generation Progress">
          <Progress
            value={progress.value}
            className="w-full"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress.value}
            aria-valuetext={progress.text}
          />
          <div className="text-center text-sm text-muted-foreground" aria-live="polite">
            {progress.text}
          </div>
        </div>
      )}
    </div>
  );
}