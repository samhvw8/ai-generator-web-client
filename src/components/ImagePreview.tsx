import { Loader2 } from 'lucide-react';

interface ImagePreviewProps {
  isLoading: boolean;
  imageUrls: string[];
}

export function ImagePreview({ isLoading, imageUrls }: ImagePreviewProps) {
  if (!isLoading && !imageUrls.length) return null;

  return (
    <div className="mt-8 space-y-8">
      {isLoading ? (
        <div className="rounded-lg overflow-hidden shadow-xl bg-gray-50 dark:bg-gray-900/50">
          <div className="flex flex-col items-center justify-center h-[640px]">
            <Loader2 className="h-12 w-12 animate-spin opacity-50 mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Generating your images...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {imageUrls.map((url, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-xl bg-gray-50 dark:bg-gray-900/50">
              <div className="relative">
                <img
                  src={url}
                  alt={`Generated ${index + 1}`}
                  className="w-full h-auto object-cover max-h-[640px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}