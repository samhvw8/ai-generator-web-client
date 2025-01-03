import { useState } from 'react';
import { Loader2, HelpCircle, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { ImageGenerationOptions, ImageQuality, ImageSize, ImageStyle } from '../types/image';

interface ImageGeneratorFormProps {
  readonly models: string[];
  readonly isLoading: boolean;
  readonly onSubmit: (options: ImageGenerationOptions) => void;
}

export function ImageGeneratorForm({ models, isLoading, onSubmit }: ImageGeneratorFormProps) {
  const initialState: ImageGenerationOptions = {
    prompt: '',
    model: 'dall-e-3',
    style: 'vivid',
    quality: 'standard',
    size: '1024x1024',
    numberOfImages: 1
  };

  const [formState, setFormState] = useState<ImageGenerationOptions>(initialState);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 4000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.prompt.trim()) return;
    onSubmit(formState);
  };

  const updateField = <K extends keyof ImageGenerationOptions>(
    field: K,
    value: ImageGenerationOptions[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    if (field === 'prompt') {
      setCharCount(String(value).length);
    }
  };

  const handleReset = () => {
    setFormState(initialState);
    setCharCount(0);
  };

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="model">Model</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>Choose the AI model to generate your images</TooltipContent>
              </Tooltip>
            </div>
            <Select value={formState.model} onValueChange={(value) => updateField('model', value)}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formState.model === 'dall-e-3' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="style">Style</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>Choose between vivid or natural-looking images</TooltipContent>
                </Tooltip>
              </div>
              <Select value={formState.style} onValueChange={(value) => updateField('style', value as ImageStyle)}>
                <SelectTrigger id="style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vivid">Vivid</SelectItem>
                  <SelectItem value="natural">Natural</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="size">Size</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>Choose the dimensions of your generated images</TooltipContent>
              </Tooltip>
            </div>
            <Select value={formState.size} onValueChange={(value) => updateField('size', value as ImageSize)}>
              <SelectTrigger id="size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256x256">256x256</SelectItem>
                <SelectItem value="512x512">512x512</SelectItem>
                <SelectItem value="1024x1024">1024x1024</SelectItem>
                <SelectItem value="1792x1024">1792x1024</SelectItem>
                <SelectItem value="1024x1792">1024x1792</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formState.model === 'dall-e-3' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="quality">Quality</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>Choose between standard or high-definition quality</TooltipContent>
                </Tooltip>
              </div>
              <Select value={formState.quality} onValueChange={(value) => updateField('quality', value as ImageQuality)}>
                <SelectTrigger id="quality">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="hd">HD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {formState.model !== 'dall-e-3' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="number">Number of Images</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>Choose how many images to generate (1-10)</TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="number"
                type="number"
                min="1"
                max="10"
                value={formState.numberOfImages}
                onChange={(e) => updateField('numberOfImages', Math.min(Math.max(1, Number(e.target.value)), 10))}
                className="w-20"
              />
            </div>
          )}

          <div className="space-y-2 md:col-span-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>Describe the image you want to generate</TooltipContent>
                </Tooltip>
              </div>
              <span className={`text-sm ${charCount > maxChars ? 'text-destructive' : 'text-muted-foreground'}`}>
                {charCount}/{maxChars}
              </span>
            </div>
            <Input
              id="prompt"
              value={formState.prompt}
              onChange={(e) => updateField('prompt', e.target.value)}
              placeholder="Enter your image prompt..."
              className="w-full"
              maxLength={maxChars}
            />
          </div>

          <div className="flex gap-4 md:col-span-3">
            <Button
              type="submit"
              disabled={isLoading || !formState.prompt.trim() || charCount > maxChars}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </form>
    </TooltipProvider>
  );
}