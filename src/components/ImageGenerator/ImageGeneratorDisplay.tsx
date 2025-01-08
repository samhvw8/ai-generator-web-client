import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useAtom } from 'jotai';
import { errorAtom, imageUrlsAtom, isLoadingAtom } from '../../atoms/imageGenerator';
import { ImagePreview } from '../ImagePreview';

export function ImageGeneratorDisplay() {
  const [error] = useAtom(errorAtom);
  const [imageUrls] = useAtom(imageUrlsAtom);
  const [isLoading] = useAtom(isLoadingAtom);

  return (
    <>
      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ImagePreview isLoading={isLoading} imageUrls={imageUrls} />
    </>
  );
}