import { useAtom } from 'jotai';
import { ImageGenerator } from './components/ImageGenerator';
import { SettingsModal } from './components/Settings/SettingsModal';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { selectedServiceAtom, reloadTriggerAtom, baseUrlAtom, apiKeyAtom, forceSettingsOpenAtom } from './atoms/imageGenerator';
import { useEffect } from 'react';

function App() {
  const [selectedService] = useAtom(selectedServiceAtom);
  const [reloadTrigger] = useAtom(reloadTriggerAtom);
  const [baseUrl] = useAtom(baseUrlAtom);
  const [apiKey] = useAtom(apiKeyAtom);
  const [, setForceOpen] = useAtom(forceSettingsOpenAtom);

  useEffect(() => {
    if (!baseUrl || !apiKey) {
      setForceOpen(true);
    }
  }, [baseUrl, apiKey, setForceOpen]);

  return (
    <div className="min-h-screen bg-background min-w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end mb-4 gap-2">
          <LanguageSwitcher />
          <SettingsModal />
        </div>
      </div>

      <ImageGenerator
        selectedService={selectedService}
        reloadTrigger={reloadTrigger}
      />
    </div>
  );
}

export default App;
