export type ImageStyle = 'vivid' | 'natural';
export type ImageQuality = 'standard' | 'hd';
export type ImageSize = '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';

export interface ImageGenerationOptions {
  prompt: string;
  model: string;
  style: ImageStyle;
  quality: ImageQuality;
  size: ImageSize;
  numberOfImages: number;
}