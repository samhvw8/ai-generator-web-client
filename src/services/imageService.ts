import { ImageGenerationOptions } from '../types/image';

interface ApiConfig {
  baseUrl: string;
  apiKey: string;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  return null;
}

function setCookie(name: string, value: string, days = 365): void {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

export async function isConfigured(): Promise<boolean> {
  const baseUrl = getCookie('apiBaseUrl');
  const apiKey = getCookie('apiKey');
  return Boolean(baseUrl && apiKey);
}

async function getStoredConfig(): Promise<ApiConfig | null> {
  const baseUrl = getCookie('apiBaseUrl');
  const apiKey = getCookie('apiKey');
  
  if (baseUrl && apiKey) {
    return {
      baseUrl,
      apiKey
    };
  }
  return null;
}

export async function updateApiSettings(baseUrl: string, apiKey: string): Promise<void> {
  setCookie('apiBaseUrl', baseUrl);
  setCookie('apiKey', apiKey);
}

async function getConfig(): Promise<ApiConfig> {
  const config = await getStoredConfig();
  if (!config) {
    throw new Error('API configuration not found. Please configure the API settings first.');
  }
  return config;
}

export async function fetchModels(): Promise<string[]> {
  const config = await getConfig();
  const response = await fetch(`${config.baseUrl}/models`, {
    headers: {
      'Authorization': `Bearer ${config.apiKey}`
    }
  });
  const data = await response.json();
  return data.data.map((model: { id: string }) => model.id);
}

export async function generateImage(
  options: ImageGenerationOptions,
  signal?: AbortSignal
): Promise<string> {
  const config = await getConfig();
  const response = await fetch(`${config.baseUrl}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      prompt: options.prompt,
      model: options.model,
      n: options.model === 'dall-e-3' ? 1 : options.numberOfImages,
      quality: options.model === 'dall-e-3' ? options.quality : 'standard',
      response_format: 'url',
      size: options.size,
      style: options.model === 'dall-e-3' ? options.style : 'vivid',
      user: 'user-1234'
    }),
    signal
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error occurred' } }));
    throw new Error(error.error?.message || 'Failed to generate image');
  }
  
  const data = await response.json();
  return data.data[0].url;
}