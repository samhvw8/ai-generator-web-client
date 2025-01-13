import { HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { ImageGenerationOptions } from '../../../types/image';

interface AdvancedOptionsProps {
  formData: ImageGenerationOptions;
  isDallE3: boolean;
  updateFormData: (field: keyof ImageGenerationOptions, value: string) => void;
}

export function AdvancedOptions({ formData, isDallE3, updateFormData }: AdvancedOptionsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 animate-in fade-in-50">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className="block text-sm font-medium">
            {t('imageGenerator.form.advancedOptions.size')}
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('imageGenerator.form.advancedOptions.sizeTooltip')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Select 
          onValueChange={(value) => updateFormData('size', value)}
          defaultValue={formData.size}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('common.select.size')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1024x1024">{t('imageGenerator.form.advancedOptions.sizeOptions.square')} (1024x1024)</SelectItem>
            <SelectItem value="1024x1792">{t('imageGenerator.form.advancedOptions.sizeOptions.portrait')} (1024x1792)</SelectItem>
            <SelectItem value="1792x1024">{t('imageGenerator.form.advancedOptions.sizeOptions.landscape')} (1792x1024)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isDallE3 && (
        <>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-medium">
                {t('imageGenerator.form.advancedOptions.quality')}
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('imageGenerator.form.advancedOptions.qualityTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select 
              onValueChange={(value) => updateFormData('quality', value)}
              defaultValue={formData.quality}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('common.select.quality')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">{t('imageGenerator.form.advancedOptions.qualityOptions.standard')}</SelectItem>
                <SelectItem value="hd">{t('imageGenerator.form.advancedOptions.qualityOptions.hd')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-medium">
                {t('imageGenerator.form.advancedOptions.style')}
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('imageGenerator.form.advancedOptions.styleTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select 
              onValueChange={(value) => updateFormData('style', value)}
              defaultValue={formData.style}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('common.select.style')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vivid">{t('imageGenerator.form.advancedOptions.styleOptions.vivid')}</SelectItem>
                <SelectItem value="natural">{t('imageGenerator.form.advancedOptions.styleOptions.natural')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}