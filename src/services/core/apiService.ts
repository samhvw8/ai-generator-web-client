import { ConfigurationService } from './configurationService';

export class ApiService {
  constructor(private configService: ConfigurationService) {}

  async makeRequest<T>(
    endpoint: string,
    options: Omit<RequestInit, 'headers'> & { headers?: Record<string, string> } = {}
  ): Promise<T> {
    const config = await this.configService.getConfig();
    const response = await fetch(`${config.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error occurred' } }));
      throw new Error(error.error?.message || 'Request failed');
    }

    return response.json();
  }
}