import { useState, useEffect } from "react";
import { useAtom } from 'jotai';
import { forceSettingsOpenAtom, apiKeyAtom } from '../../atoms/imageGenerator';
import { useSettingsForm } from '../../hooks/useSettingsForm';
import { Settings, AlertCircle } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { SettingsForm } from "./SettingsForm";
import { useTranslation } from "react-i18next";

export function SettingsModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [forceOpen, setForceOpen] = useAtom(forceSettingsOpenAtom);
  const {
    selectedService,
    setSelectedService,
    baseUrl,
    setBaseUrl,
    apiKey,
    setApiKey,
    isLoading,
    error,
    validation,
    handleSave,
    getDefaultBaseUrl
  } = useSettingsForm();

  const [storedApiKey] = useAtom(apiKeyAtom);

  useEffect(() => {
    // Only force open if there's no API key set
    if (forceOpen && !storedApiKey) {
      setOpen(true);
    }
  }, [forceOpen, storedApiKey]);

  const onSave = async () => {
    await handleSave();
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full w-8 h-8 text-slate-500 hover:text-slate-700 dark:text-slate-400"
        >
          <Settings className="h-[18px] w-[18px]" />
          <span className="sr-only">{t('settings.title')}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader className="relative">
          <DrawerTitle className="text-xl flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('settings.title')}
          </DrawerTitle>
          {forceOpen && (
            <DrawerDescription>
              {t('settings.welcome')}
            </DrawerDescription>
          )}
        </DrawerHeader>

        {error && (
          <Alert variant="destructive" className="my-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="px-4">
          <SettingsForm
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            baseUrl={baseUrl}
            setBaseUrl={setBaseUrl}
            apiKey={apiKey}
            setApiKey={setApiKey}
            validation={validation}
            getDefaultBaseUrl={getDefaultBaseUrl}
          />
        </div>

        <DrawerFooter className="gap-2 sm:gap-0">
          {!forceOpen && (
            <DrawerClose asChild>
              <Button variant="outline">
                {t('common.cancel')}
              </Button>
            </DrawerClose>
          )}
          <Button
            onClick={onSave}
            className="px-8"
            disabled={isLoading}
          >
            {isLoading ? t('common.saving') : t('common.save')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}