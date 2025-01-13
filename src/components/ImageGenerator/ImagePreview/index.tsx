import { LoadingState } from './LoadingState';
import { ImageGrid } from './ImageGrid';
import { useEffect } from 'react';

interface ImagePreviewProps {
  isLoading: boolean;
  imageUrls: string[];
}

export function ImagePreview({ isLoading, imageUrls }: ImagePreviewProps) {
  useEffect(() => {
    if (imageUrls.length === 1) {
      // Add preload link
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageUrls[0];
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [imageUrls]);

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