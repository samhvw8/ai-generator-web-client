import { HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Textarea } from '../../ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

interface PromptFieldProps {
  prompt: string;
  isOpenAI: boolean;
  onChange: (value: string) => void;
}

export function PromptField({ prompt, isOpenAI, onChange }: PromptFieldProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-medium">{t('imageGenerator.prompt')}</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{isOpenAI
                ? t('imageGenerator.form.prompt.helpOpenAI')
                : t('imageGenerator.form.prompt.helpMJ')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="text-xs text-muted-foreground">
          {t('imageGenerator.form.prompt.characterCount', { length: prompt.length })}
        </span>
      </div>
      <Textarea
        placeholder={isOpenAI
          ? t('imageGenerator.form.prompt.placeholderOpenAI')
          : t('imageGenerator.form.prompt.placeholderMJ')}
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
        required
        rows={4}
        maxLength={4000}
        className="resize-none transition-all duration-200 focus:shadow-md"
      />
      <p className="mt-1 text-xs text-muted-foreground">
        {isOpenAI
          ? t('imageGenerator.form.prompt.helpOpenAI')
          : t('imageGenerator.form.prompt.helpMJ')}
      </p>
    </div>
  );
}