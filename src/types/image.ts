export interface ImageGenerationOptions {
  prompt: string;
  model: string;
  numberOfImages: number;
  size: string;
  quality: string;
  style: string;
}

export interface MidjourneyButton {
  customId: string;
  label: string;
  emoji: string;
}

export interface MidjourneySubmitResponse {
  code: number;
  description: string;
  result: string;
}

export interface MidjourneyActionResponse {
  code: number;
  description: string;
  result: string;
}

export interface MidjourneyTaskResponse {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED';
  imageUrl: string;
  buttons: MidjourneyButton[];
  failReason?: string;
  progress?: string;
}

export interface GenerateImageResponse {
  imageUrl: string;
  buttons: MidjourneyButton[];
  taskId: string;
}