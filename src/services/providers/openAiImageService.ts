import { ImageGenerationOptions, GenerateImageResponse } from '../../types/image';
import { ConfigurationService } from '../core/configurationService';
import { ApiService } from '../core/apiService';
import { ImageService } from '../types';

export class OpenAiImageService implements ImageService {
  private configService: ConfigurationService;
  private apiService: ApiService;

  constructor() {
    this.configService = new ConfigurationService('openAiBaseUrl', 'openAiApiKey');
    this.apiService = new ApiService(this.configService);
  }

  async isConfigured(): Promise<boolean> {
    return this.configService.isConfigured();
  }

  async updateApiSettings(baseUrl: string, apiKey: string): Promise<void> {
    await this.configService.updateApiSettings(baseUrl, apiKey);
  }

  async fetchModels(): Promise<string[]> {
    const data = await this.apiService.makeRequest<{ data: Array<{ id: string }> }>('/models');
    return data.data.map(model => model.id);
  }

  async generateImage(options: ImageGenerationOptions, signal?: AbortSignal): Promise<GenerateImageResponse> {
    const data = await this.apiService.makeRequest<{ data: Array<{ url: string }> }>(
      '/images/generations',
      {
        method: 'POST',
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
      }
    );

    return {
      imageUrl: data.data[0].url,
      buttons: [],
      taskId: ''
    };
  }
}