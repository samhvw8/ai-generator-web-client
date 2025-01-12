import { HelpCircle } from 'lucide-react';
import { Textarea } from '../../ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

interface PromptFieldProps {
  prompt: string;
  isOpenAI: boolean;
  onChange: (value: string) => void;
}

export function PromptField({ prompt, isOpenAI, onChange }: PromptFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-medium">Prompt</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{isOpenAI 
                ? "Describe your image in detail. Include setting, lighting, perspective, and style." 
                : "Add /imagine at the end of your prompt for best results."}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="text-xs text-muted-foreground">
          {prompt.length}/4000 characters
        </span>
      </div>
      <Textarea
        placeholder={isOpenAI 
          ? "A serene lake at sunset with golden light reflecting off the water, mountains in the background..." 
          : "A magical forest with glowing mushrooms /imagine"}
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
        required
        rows={4}
        maxLength={4000}
        className="resize-none transition-all duration-200 focus:shadow-md"
      />
      <p className="mt-1 text-xs text-muted-foreground">
        {isOpenAI 
          ? "Describe your image in detail. Include setting, lighting, perspective, and style." 
          : "Add /imagine at the end of your prompt for best results."}
      </p>
    </div>
  );
}