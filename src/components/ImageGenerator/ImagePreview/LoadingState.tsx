import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div 
      className="rounded-lg overflow-hidden shadow-xl bg-gray-50 dark:bg-gray-900/50"
      role="status"
      aria-label="Loading images"
    >
      <div className="flex flex-col items-center justify-center h-[640px]">
        <Loader2 
          className="h-12 w-12 animate-spin opacity-50 mb-4" 
          aria-hidden="true"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Generating your images...
        </p>
      </div>
    </div>
  );
}