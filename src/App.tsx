import { useState, useEffect } from 'react';
import { ServiceType } from './services/imageService';
import { ImageGenerator } from './components/ImageGenerator';
import { SettingsModal } from './components/SettingsModal';
import { getCookie } from './services/cookieUtils';

function App() {
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceType>('OpenAI');
  const [baseUrl, setBaseUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    const storedBaseUrl = getCookie('baseUrl');
    const storedApiKey = getCookie('apiKey');
    
    if (!storedBaseUrl || !storedApiKey) {
      setForceOpen(true);
    } else {
      setBaseUrl(storedBaseUrl);
      setApiKey(storedApiKey);
    }
  }, []);

  const handleReload = () => {
    setReloadTrigger(prev => prev + 1);
  };

  const handleSaveSettings = (newBaseUrl: string, newApiKey: string) => {
    setBaseUrl(newBaseUrl);
    setApiKey(newApiKey);
    handleReload();
  };

  return (
    <div className="min-h-screen bg-background min-w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end mb-4">
          <SettingsModal
            baseUrl={baseUrl}
            apiKey={apiKey}
            selectedService={selectedService}
            onSave={handleSaveSettings}
            onServiceChange={setSelectedService}
            forceOpen={forceOpen}
          />
        </div>
      </div>

      <ImageGenerator
        reloadTrigger={reloadTrigger}
        selectedService={selectedService}
      />
    </div>
  );
}

export default App;
