import { useState, useEffect } from 'react'
import './App.css'
import { ImageGenerator } from './components/ImageGenerator'
import { SettingsModal } from './components/SettingsModal'
import { updateApiSettings, isConfigured } from './services/imageService'

function App() {
  const [baseUrl, setBaseUrl] = useState('https://api.yescale.io/v1')
  const [apiKey, setApiKey] = useState('')
  const [needsConfig, setNeedsConfig] = useState(true)
  const [reloadTrigger, setReloadTrigger] = useState(0)

  useEffect(() => {
    const checkConfig = async () => {
      const configured = await isConfigured()
      setNeedsConfig(!configured)
    }
    checkConfig()
  }, [])

  const handleSaveSettings = async (newBaseUrl: string, newApiKey: string) => {
    setBaseUrl(newBaseUrl)
    setApiKey(newApiKey)
    setNeedsConfig(false)
    await updateApiSettings(newBaseUrl, newApiKey)
    // Trigger model reload after settings are saved
    setReloadTrigger(prev => prev + 1)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Image Generator</h1>
        <div className="flex items-center gap-2">
          <SettingsModal 
            baseUrl={baseUrl}
            apiKey={apiKey}
            onSave={handleSaveSettings}
            forceOpen={needsConfig}
          />
        </div>
      </header>
      <main>
        <ImageGenerator reloadTrigger={reloadTrigger} />
      </main>
    </div>
  )
}

export default App
