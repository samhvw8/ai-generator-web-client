import { useTranslation } from 'react-i18next';

interface ImageGridProps {
  imageUrls: string[];
}

export function ImageGrid({ imageUrls }: ImageGridProps) {
  const { t } = useTranslation();

  return (
    <div 
      className="flex flex-wrap justify-center gap-8 mx-auto max-w-5xl"
      role="grid"
      aria-label={t('imageGenerator.preview.grid')}
    >
      {imageUrls.map((url, index) => (
        <div 
          key={url}
          className="rounded-lg overflow-hidden shadow-xl bg-gray-50 dark:bg-gray-900/50"
          role="gridcell"
        >
          <figure className="relative flex items-center justify-center">
            <img
              src={url}
              alt={t('imageGenerator.preview.imageAlt', { number: index + 1 })}
              className="w-full h-auto object-contain max-h-[640px]"
              loading="lazy"
            />
            <figcaption className="sr-only">
              {t('imageGenerator.preview.imageAlt', { number: index + 1 })}
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}