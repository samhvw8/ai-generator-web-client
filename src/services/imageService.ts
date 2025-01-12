import { OpenAiImageService } from './providers/openAiImageService';
import { MjWrapperService } from './providers/mjWrapperService';
import type { ImageService } from './types';

export * from './types';
export * from './providers/openAiImageService';
export * from './providers/mjWrapperService';

export const services = {
  'OpenAI': new OpenAiImageService(),
  'Midjourney': new MjWrapperService()
} as const;

export type ServiceType = keyof typeof services;

// Helper function to get the current service instance
export const getCurrentService = (type: ServiceType): ImageService => services[type];

// Current service management
let currentServiceType: ServiceType = 'OpenAI';

export const setCurrentService = (type: ServiceType) => {
  currentServiceType = type;
};

// Wrapper functions that use the current service
export const isConfigured = () => getCurrentService(currentServiceType).isConfigured();
export const updateApiSettings = (baseUrl: string, apiKey: string) => 
  getCurrentService(currentServiceType).updateApiSettings(baseUrl, apiKey);