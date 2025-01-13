import { ServiceType } from '../../services/imageService';
import { services } from '../../services/imageService';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';

interface SettingsFormProps {
  selectedService: ServiceType;
  setSelectedService: (service: ServiceType) => void;
  baseUrl: string;
  setBaseUrl: (url: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  validation: {
    baseUrl: boolean;
    apiKey: boolean;
  };
  getDefaultBaseUrl: (service: ServiceType) => string;
}

export function SettingsForm({
  selectedService,
  setSelectedService,
  baseUrl,
  setBaseUrl,
  apiKey,
  setApiKey,
  validation,
  getDefaultBaseUrl
}: SettingsFormProps) {
  const { t } = useTranslation();
  const { languages, currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="grid gap-6 py-4">
      <TooltipProvider>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Label className="required">{t('settings.language')}</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select your preferred language</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={currentLanguage}
            onValueChange={changeLanguage}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Label className="required">Service</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the AI service provider for image generation</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={selectedService}
            onValueChange={(value: ServiceType) => setSelectedService(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(services) as ServiceType[]).map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="baseUrl" className="required">API Base URL</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>The base URL for the API service</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Default: {getDefaultBaseUrl(selectedService)}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="baseUrl"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder={getDefaultBaseUrl(selectedService)}
            className={`col-span-3 ${!validation.baseUrl ? 'border-destructive' : ''}`}
            aria-invalid={!validation.baseUrl}
            aria-required="true"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="apiKey" className="required">API Key</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your authentication key for the selected service</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API key"
            className={`col-span-3 ${!validation.apiKey ? 'border-destructive' : ''}`}
            aria-invalid={!validation.apiKey}
            aria-required="true"
          />
        </div>
      </TooltipProvider>
    </div>
  );
}