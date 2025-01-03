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

interface SettingsModalProps {
  baseUrl: string;
  apiKey: string;
  onSave: (baseUrl: string, apiKey: string) => void;
  forceOpen?: boolean;
}

export function SettingsModal({ baseUrl, apiKey, onSave, forceOpen = false }: SettingsModalProps) {
  const [localBaseUrl, setLocalBaseUrl] = useState(baseUrl);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [open, setOpen] = useState(forceOpen);

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
    }
  }, [forceOpen]);

  const handleSave = () => {
    onSave(localBaseUrl, localApiKey);
    setOpen(false);
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
            <Label htmlFor="baseUrl">API Base URL</Label>
            <Input
              id="baseUrl"
              value={localBaseUrl}
              onChange={(e) => setLocalBaseUrl(e.target.value)}
              placeholder="Enter API base URL"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
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