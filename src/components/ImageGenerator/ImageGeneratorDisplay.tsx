import { useImageDisplay } from '../../hooks/useImageDisplay';
import { ImagePreview } from './ImagePreview';

export function ImageGeneratorDisplay() {
  const { imageUrls, isLoading } = useImageDisplay();

  return (
    <ImagePreview 
      isLoading={isLoading} 
      imageUrls={imageUrls} 
    />
  );
}