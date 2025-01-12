import { HelpCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { ImageGenerationOptions } from '../../../types/image';

interface AdvancedOptionsProps {
  formData: ImageGenerationOptions;
  isDallE3: boolean;
  updateFormData: (field: keyof ImageGenerationOptions, value: string) => void;
}

export function AdvancedOptions({ formData, isDallE3, updateFormData }: AdvancedOptionsProps) {
  return (
    <div className="space-y-4 animate-in fade-in-50">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className="block text-sm font-medium">Size</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose image dimensions - affects composition and detail level</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Select 
          onValueChange={(value) => updateFormData('size', value)}
          defaultValue={formData.size}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
            <SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
            <SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isDallE3 && (
        <>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-medium">Quality</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>HD offers more detail but costs more credits</p>
                </TooltipContent>
              </Tooltip>
            </div>
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
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-medium">Style</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Vivid creates more dramatic images, Natural is more photorealistic</p>
                </TooltipContent>
              </Tooltip>
            </div>
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
  );
}