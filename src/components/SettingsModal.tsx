import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { services, ServiceType } from '../services/imageService';

import { useAtom } from 'jotai';
import {
  selectedServiceAtom,
  baseUrlAtom,
  apiKeyAtom,
  forceSettingsOpenAtom,
  reloadTriggerAtom
} from '../atoms/imageGenerator';

interface SettingsModalProps {}

export function SettingsModal({}: SettingsModalProps) {
  const [selectedService, setSelectedService] = useAtom(selectedServiceAtom);
  const [baseUrl, setBaseUrl] = useAtom(baseUrlAtom);
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [forceOpen, setForceOpen] = useAtom(forceSettingsOpenAtom);
  const [open, setOpen] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useAtom(reloadTriggerAtom);

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
    }
  }, [forceOpen]);

  const handleSave = () => {
    // Trigger a reload
    setReloadTrigger((prev: number) => prev + 1);
    
    setOpen(false);
    setForceOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="bg-slate-100 hover:bg-slate-250 dark:hover:bg-slate-800 rounded-full w-8 h-8 text-slate-400"
        >
          <Settings className="h-[18px] w-[18px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl">Settings</DialogTitle>
          {forceOpen && (
            <DialogDescription>
              Welcome! Please configure your API settings to get started.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Service</Label>
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
            <Label htmlFor="baseUrl">API Base URL</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="Enter API base URL"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {!forceOpen && (
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          )}
          <Button onClick={handleSave} className="px-8">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}