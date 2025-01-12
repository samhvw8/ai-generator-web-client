import { LoadingState } from './LoadingState';
import { ImageGrid } from './ImageGrid';

interface ImagePreviewProps {
  isLoading: boolean;
  imageUrls: string[];
}

export function ImagePreview({ isLoading, imageUrls }: ImagePreviewProps) {
  if (!isLoading && !imageUrls.length) return null;

  return (
    <section 
      className="mt-8 space-y-8"
      aria-label="Image preview section"
    >
      {isLoading ? (
        <LoadingState />
      ) : (
        <ImageGrid imageUrls={imageUrls} />
      )}
    </section>
  );
}

export type { ImagePreviewProps };