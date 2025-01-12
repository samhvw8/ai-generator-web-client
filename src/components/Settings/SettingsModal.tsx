import { useState, useEffect } from "react";
import { useAtom } from 'jotai';
import { forceSettingsOpenAtom, apiKeyAtom } from '../../atoms/imageGenerator';
import { useSettingsForm } from '../../hooks/useSettingsForm';
import { Settings, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { SettingsForm } from "./SettingsForm";

export function SettingsModal() {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full w-8 h-8 text-slate-500 hover:text-slate-700 dark:text-slate-400"
        >
          <Settings className="h-[18px] w-[18px]" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
          {forceOpen && (
            <DialogDescription>
              Welcome! Please configure your API settings to get started.
            </DialogDescription>
          )}
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="my-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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

        <DialogFooter className="gap-2 sm:gap-0">
          {!forceOpen && (
            <DialogClose asChild>
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>
          )}
          <Button 
            onClick={onSave}
            className="px-8"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}