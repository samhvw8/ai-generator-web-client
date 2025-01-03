import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, AlertTriangle } from 'lucide-react';
import { ImageGeneratorForm } from './ImageGeneratorForm';
import { ImagePreview } from './ImagePreview';
import { fetchModels, generateImage } from '../services/imageService';
import { ImageGenerationOptions } from '../types/image';
import { Button } from './ui/button';

interface ImageGeneratorProps {
  reloadTrigger: number;
}

export function ImageGenerator({ reloadTrigger }: ImageGeneratorProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoadingModels(true);
        setError('');
        const availableModels = await fetchModels();
        setModels(availableModels);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('Failed to load available models');
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, [reloadTrigger]);

  useEffect(() => {
    return () => {
      // Cleanup: abort any pending requests when component unmounts
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  const handleCancel = () => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
      setIsLoading(false);
      setError('Image generation cancelled');
    }
  };

  const handleGenerate = async (options: ImageGenerationOptions) => {
    // Cancel any existing requests
    if (abortController.current) {
      abortController.current.abort();
    }

    // Create new abort controller for this request
    abortController.current = new AbortController();
    setIsLoading(true);
    setError('');
    setImageUrls([]);
    
    try {
      if (options.numberOfImages > 1 && options.model !== 'dall-e-3') {
        const urls = await Promise.all(
          Array.from({ length: options.numberOfImages }, () => 
            generateImage(options, abortController.current!.signal)
          )
        );
        setImageUrls(urls);
      } else {
        const url = await generateImage(options, abortController.current.signal);
        setImageUrls([url]);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Don't set error message for user-initiated cancellation
        return;
      }
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
      abortController.current = null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-screen-xl mx-auto border-0 dark:bg-gray-800/50 backdrop-blur-sm">
        <CardContent className="space-y-6">
          {isLoadingModels ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin opacity-70" />
            </div>
          ) : (
            <>
              <ImageGeneratorForm
                models={models}
                isLoading={isLoading}
                onSubmit={handleGenerate}
              />

              {error && (
                <Alert variant="destructive" className="animate-in fade-in-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="flex justify-center">
                  <Button 
                    variant="destructive" 
                    onClick={handleCancel}
                    className="animate-in fade-in-50"
                  >
                    Cancel Generation
                  </Button>
                </div>
              )}

              <ImagePreview isLoading={isLoading} imageUrls={imageUrls} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}