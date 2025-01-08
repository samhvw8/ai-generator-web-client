import { ApiConfig, getStoredConfig, updateApiSettings as updateSettings } from '../cookieUtils';

export class ConfigurationService {
  constructor(
    private baseUrlKey: string,
    private apiKeyKey: string
  ) {}

  async getConfig(): Promise<ApiConfig> {
    const config = await getStoredConfig(this.baseUrlKey, this.apiKeyKey);
    if (!config) {
      throw new Error('API configuration not found. Please configure the API settings first.');
    }
    return config;
  }

  async isConfigured(): Promise<boolean> {
    const config = await getStoredConfig(this.baseUrlKey, this.apiKeyKey);
    return config !== null;
  }

  async updateApiSettings(baseUrl: string, apiKey: string): Promise<void> {
    await updateSettings(this.baseUrlKey, this.apiKeyKey, baseUrl, apiKey);
  }
}