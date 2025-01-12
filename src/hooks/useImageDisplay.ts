import { useAtom } from 'jotai';
import { imageUrlsAtom, isLoadingAtom } from '../atoms/imageGenerator';

export function useImageDisplay() {
  const [imageUrls] = useAtom(imageUrlsAtom);
  const [isLoading] = useAtom(isLoadingAtom);

  return {
    imageUrls,
    isLoading
  };
}