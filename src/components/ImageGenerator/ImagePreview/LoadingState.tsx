import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LoadingState() {
  const { t } = useTranslation();

  return (
    <div 
      className="rounded-lg overflow-hidden shadow-xl bg-gray-50 dark:bg-gray-900/50"
      role="status"
      aria-label={t('imageGenerator.preview.loading')}
    >
      <div className="flex flex-col items-center justify-center h-[640px]">
        <Loader2 
          className="h-12 w-12 animate-spin opacity-50 mb-4" 
          aria-hidden="true"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('imageGenerator.preview.loading')}
        </p>
      </div>
    </div>
  );
}