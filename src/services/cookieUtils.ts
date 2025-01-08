export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  return null;
}

export function setCookie(name: string, value: string, days = 365): void {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
}

export async function getStoredConfig(baseUrlKey: string, apiKeyKey: string): Promise<ApiConfig | null> {
  const baseUrl = getCookie(baseUrlKey);
  const apiKey = getCookie(apiKeyKey);
  
  if (baseUrl && apiKey) {
    return {
      baseUrl,
      apiKey
    };
  }
  return null;
}

export async function updateApiSettings(
  baseUrlKey: string,
  apiKeyKey: string,
  baseUrl: string,
  apiKey: string
): Promise<void> {
  setCookie(baseUrlKey, baseUrl);
  setCookie(apiKeyKey, apiKey);
}