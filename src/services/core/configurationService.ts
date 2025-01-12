import { getDefaultStore } from 'jotai';
import { baseUrlAtom, apiKeyAtom } from '../../atoms/imageGenerator';

export type ConfigKey = string;
export type ConfigValue = any;

export type ApiConfig = Record<ConfigKey, ConfigValue>;

export class ConfigurationService {
  private configKeys: string[];
  private store = getDefaultStore();

  constructor(configKeys: string[]) {
    this.configKeys = configKeys;
  }

  async getConfig(): Promise<ApiConfig> {
    const baseUrl = this.store.get(baseUrlAtom);
    const apiKey = this.store.get(apiKeyAtom);

    if (!baseUrl || !apiKey) {
      throw new Error('API configuration not found. Please configure the API settings first.');
    }

    return {
      baseUrl,
      apiKey
    };
  }

  async isConfigured(): Promise<boolean> {
    const config = await this.getConfig().catch(() => null);
    return config !== null && this.configKeys.every(key => config[key] !== undefined);
  }

  async updateApiSettings(config: ApiConfig): Promise<void> {
    // Validate that all required keys are present
    if (!this.configKeys.every(key => key in config)) {
      throw new Error(`Missing required configuration keys. Required: ${this.configKeys.join(', ')}`);
    }

    this.store.set(baseUrlAtom, config.baseUrl);
    this.store.set(apiKeyAtom, config.apiKey);
  }
}