import { ImageGenerationOptions, GenerateImageResponse } from '../types/image';

export interface ImageService {
  isConfigured(): Promise<boolean>;
  updateApiSettings(baseUrl: string, apiKey: string): Promise<void>;
  fetchModels(): Promise<string[]>;
  generateImage(
    options: ImageGenerationOptions,
    signal?: AbortSignal,
    onProgress?: (progress: string) => void
  ): Promise<GenerateImageResponse>;
  submitAction?(customId: string, taskId: string, signal?: AbortSignal): Promise<GenerateImageResponse>;
}