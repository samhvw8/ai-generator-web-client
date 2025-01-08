import { ImageGenerationOptions, GenerateImageResponse, MidjourneySubmitResponse, MidjourneyTaskResponse } from '../../types/image';
import { ConfigurationService } from '../core/configurationService';
import { ApiService } from '../core/apiService';
import { ImageService } from '../types';

export class NekoImageService implements ImageService {
  private configService: ConfigurationService;
  private apiService: ApiService;
  private currentTaskId: string | null = null;

  constructor() {
    this.configService = new ConfigurationService('nekoBaseUrl', 'nekoApiKey');
    this.apiService = new ApiService(this.configService);
  }

  async isConfigured(): Promise<boolean> {
    return this.configService.isConfigured();
  }

  async updateApiSettings(baseUrl: string, apiKey: string): Promise<void> {
    await this.configService.updateApiSettings(baseUrl, apiKey);
  }

  async fetchModels(): Promise<string[]> {
    return [""];
  }

  private async submitImagine(prompt: string): Promise<string> {
    const data = await this.apiService.makeRequest<MidjourneySubmitResponse>(
      '/mj/submit/imagine',
      {
        method: 'POST',
        body: JSON.stringify({ prompt })
      }
    );
    return data.result;
  }

  private async fetchTask(taskId: string): Promise<MidjourneyTaskResponse> {
    return this.apiService.makeRequest<MidjourneyTaskResponse>(`/mj/task/${taskId}/fetch`);
  }

  private async waitForTaskCompletion(taskId: string, signal?: AbortSignal): Promise<MidjourneyTaskResponse> {
    const waitConfig = {
      minWaitTime: 2000,
      maxWaitTime: 10000,
      increaseFactor: 1.5,
      decreaseFactor: 0.8
    };

    let previousProgress = '';
    let consecutiveSameStatus = 0;
    let currentWaitTime = waitConfig.minWaitTime;

    while (true) {
      if (signal?.aborted) {
        throw new Error('Task was aborted');
      }

      const taskStatus = await this.fetchTask(taskId);

      if (taskStatus.status === 'FAILED') {
        throw new Error(`Task failed: ${taskStatus.failReason}`);
      }

      if (taskStatus.status === 'SUCCESS') {
        return taskStatus;
      }

      if (taskStatus.progress === previousProgress) {
        consecutiveSameStatus++;
        if (consecutiveSameStatus >= 2) {
          currentWaitTime = Math.min(
            currentWaitTime * waitConfig.increaseFactor,
            waitConfig.maxWaitTime
          );
        }
      } else {
        consecutiveSameStatus = 0;
        currentWaitTime = Math.max(
          currentWaitTime * waitConfig.decreaseFactor,
          waitConfig.minWaitTime
        );
      }

      previousProgress = taskStatus.progress ?? "";
      await new Promise(resolve => setTimeout(resolve, currentWaitTime));
    }
  }

  async generateImage(options: ImageGenerationOptions, signal?: AbortSignal): Promise<GenerateImageResponse> {
    const taskId = await this.submitImagine(options.prompt);
    this.currentTaskId = taskId;

    const taskStatus = await this.waitForTaskCompletion(taskId, signal);
    
    return {
      imageUrl: taskStatus.imageUrl,
      buttons: taskStatus.buttons,
      taskId: taskStatus.id
    };
  }

  async submitAction(customId: string, taskId: string, signal?: AbortSignal): Promise<GenerateImageResponse> {
    const data = await this.apiService.makeRequest<MidjourneySubmitResponse>(
      '/mj/submit/action',
      {
        method: 'POST',
        body: JSON.stringify({ customId, taskId })
      }
    );

    const taskStatus = await this.waitForTaskCompletion(data.result, signal);
    
    return {
      imageUrl: taskStatus.imageUrl,
      buttons: taskStatus.buttons,
      taskId: taskStatus.id
    };
  }
}