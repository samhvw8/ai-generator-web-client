import { useAtom } from 'jotai';
import { ImageGenerator } from './components/ImageGenerator';
import { SettingsModal } from './components/SettingsModal';
import { selectedServiceAtom, reloadTriggerAtom } from './atoms/imageGenerator';

function App() {
  const [selectedService] = useAtom(selectedServiceAtom);
  const [reloadTrigger] = useAtom(reloadTriggerAtom);

  return (
    <div className="min-h-screen bg-background min-w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end mb-4">
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
