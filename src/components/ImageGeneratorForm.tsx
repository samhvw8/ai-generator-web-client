import { useState, FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { ServiceType } from '../services/imageService';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageGenerationOptions } from '../types/image';

export interface ImageGeneratorFormProps {
  models: string[];
  isLoading: boolean;
  onSubmit: (options: ImageGenerationOptions) => void;
  onCancel: () => void;
  selectedService: ServiceType;
}

export function ImageGeneratorForm({ models, isLoading, onSubmit, onCancel, selectedService }: ImageGeneratorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState<ImageGenerationOptions>({
    prompt: '',
    model: models[0] || 'dall-e-3',
    numberOfImages: 1,
    size: '1024x1024',
    quality: 'standard',
    style: 'vivid',
  });

  const isOpenAI = selectedService === 'OpenAI';
  const isDallE3 = formData.model === 'dall-e-3';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedService === 'Neko') {
      // For Neko service, only send the prompt
      onSubmit({
        prompt: formData.prompt,
        model: 'neko',
        numberOfImages: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid'
      });
    } else {
      onSubmit(formData);
    }
  };

  const updateFormData = (field: keyof ImageGenerationOptions, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Prompt</label>
        <Input 
          placeholder={isOpenAI ? "A serene lake at sunset..." : "A magical forest with glowing mushrooms /imagine"}
          value={formData.prompt}
          onChange={(e) => updateFormData('prompt', e.target.value)}
          required
        />
      </div>

      {isOpenAI && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <Select 
              onValueChange={(value) => updateFormData('model', value)}
              defaultValue={formData.model}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!isDallE3 && (
            <div>
              <label className="block text-sm font-medium mb-1">Number of Images</label>
              <Select
                onValueChange={(value) => updateFormData('numberOfImages', parseInt(value))}
                defaultValue={formData.numberOfImages.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of images" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </Button>

          {showAdvanced && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <Select 
                  onValueChange={(value) => updateFormData('size', value)}
                  defaultValue={formData.size}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1024x1024">1024x1024</SelectItem>
                    <SelectItem value="1024x1792">1024x1792</SelectItem>
                    <SelectItem value="1792x1024">1792x1024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isDallE3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Quality</label>
                    <Select 
                      onValueChange={(value) => updateFormData('quality', value)}
                      defaultValue={formData.quality}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="hd">HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Style</label>
                    <Select 
                      onValueChange={(value) => updateFormData('style', value)}
                      defaultValue={formData.style}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vivid">Vivid</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}

      <Button
        type={isLoading ? 'button' : 'submit'}
        variant={isLoading ? 'destructive' : 'default'}
        className={`w-full flex items-center justify-center gap-2 ${isLoading ? 'animate-in fade-in-50' : ''}`}
        onClick={isLoading ? onCancel : undefined}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLoading ? 'Cancel Generation' : 'Generate'}
      </Button>
    </form>
  );
}