import { useState, useEffect } from 'react'
import './App.css'
import { ImageGenerator } from './components/ImageGenerator'
import { SettingsModal } from './components/SettingsModal'
import { updateApiSettings, isConfigured } from './services/imageService'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import { useTheme } from './hooks/useTheme'

function App() {
  const [baseUrl, setBaseUrl] = useState('https://api.yescale.io/v1')
  const [apiKey, setApiKey] = useState('')
  const [needsConfig, setNeedsConfig] = useState(true)
  const [reloadTrigger, setReloadTrigger] = useState(0)
  const { theme, toggleTheme } = useTheme()

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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Image Generator
            </h1>
            <div className="h-6 w-px bg-border" />
            <p className="text-muted-foreground text-sm">
              Create AI-powered images instantly
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
            <SettingsModal
              baseUrl={baseUrl}
              apiKey={apiKey}
              onSave={handleSaveSettings}
              forceOpen={needsConfig}
            />
          </div>
        </header>
        <main className="animate-in fade-in-50 duration-500">
          <ImageGenerator reloadTrigger={reloadTrigger} />
        </main>
      </div>
    </div>
  )
}

export default App
