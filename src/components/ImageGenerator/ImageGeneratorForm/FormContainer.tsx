import { FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { TooltipProvider } from '../../ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { ImageGenerationOptions } from '../../../types/image';
import { PromptField } from './PromptField';
import { ModelSelect } from './ModelSelect';
import { AdvancedOptions } from './AdvancedOptions';

interface FormContainerProps {
  formData: ImageGenerationOptions;
  showAdvanced: boolean;
  isLoading: boolean;
  isOpenAI: boolean;
  isDallE3: boolean;
  models: string[];
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  updateFormData: (field: keyof ImageGenerationOptions, value: string | number) => void;
  toggleAdvanced: () => void;
}

export function FormContainer({
  formData,
  showAdvanced,
  isLoading,
  isOpenAI,
  isDallE3,
  models,
  onSubmit,
  onCancel,
  updateFormData,
  toggleAdvanced
}: FormContainerProps) {
  return (
    <TooltipProvider>
      <form onSubmit={onSubmit}>
        <Card className="border-none shadow-none">
          <CardContent className="space-y-6 p-0">
            <PromptField
              prompt={formData.prompt}
              isOpenAI={isOpenAI}
              onChange={(value: string) => updateFormData('prompt', value)}
            />

            {isOpenAI && (
              <>
                <ModelSelect
                  model={formData.model}
                  models={models}
                  onChange={(value: string) => updateFormData('model', value)}
                />

                {!isDallE3 && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <label className="block text-sm font-medium">Number of Images</label>
                    </div>
                    <Select
                      value={formData.numberOfImages.toString()}
                      onValueChange={(value: string) => updateFormData('numberOfImages', parseInt(value))}
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

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleAdvanced}
                    className="w-full"
                  >
                    {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                  </Button>
                </div>

                {showAdvanced && (
                  <AdvancedOptions
                    formData={formData}
                    isDallE3={isDallE3}
                    updateFormData={updateFormData}
                  />
                )}
              </>
            )}

            <Button
              type={isLoading ? 'button' : 'submit'}
              variant={isLoading ? 'destructive' : 'default'}
              className={`w-full flex items-center justify-center gap-2 mt-6 ${isLoading ? 'animate-in fade-in-50' : ''}`}
              onClick={isLoading ? onCancel : undefined}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? 'Cancel Generation' : 'Generate'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </TooltipProvider>
  );
}