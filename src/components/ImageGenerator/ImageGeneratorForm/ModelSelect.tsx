import { HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

interface ModelSelectProps {
  model: string;
  models: string[];
  onChange: (value: string) => void;
}

export function ModelSelect({ model, models, onChange }: ModelSelectProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <label className="block text-sm font-medium">{t('imageGenerator.model')}</label>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('imageGenerator.modelTooltip')}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Select 
        onValueChange={onChange}
        defaultValue={model}
      >
        <SelectTrigger>
          <SelectValue placeholder={t('common.select.model')} />
        </SelectTrigger>
        <SelectContent>
          {models.map((modelOption) => (
            <SelectItem key={modelOption} value={modelOption}>
              {modelOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}