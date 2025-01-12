import { useState } from 'react';
import { ServiceType } from '../../../services/imageService';
import { ImageGenerationOptions } from '../../../types/image';

interface UseImageGeneratorFormProps {
  models: string[];
  selectedService: ServiceType;
  onSubmit: (options: ImageGenerationOptions) => void;
}

export function useImageGeneratorForm({ 
  models, 
  selectedService, 
  onSubmit 
}: UseImageGeneratorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState<ImageGenerationOptions>({
    prompt: '',
    model: models[0] || 'dall-e-3',
    numberOfImages: 1,
    size: '1024x1024',
    quality: 'standard',
    style: 'vivid',
  });

  const isOpenAI = selectedService === 'OpenAI';
  const isDallE3 = formData.model === 'dall-e-3';

  const handleSubmit = () => {
    if (selectedService === 'Midjourney') {
      // For Midjourney service, only send the prompt
      onSubmit({
        prompt: formData.prompt,
        model: 'midjourney',
        numberOfImages: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid'
      });
    } else {
      onSubmit(formData);
    }
  };

  const updateFormData = (field: keyof ImageGenerationOptions, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAdvanced = () => setShowAdvanced(!showAdvanced);

  return {
    formData,
    showAdvanced,
    isOpenAI,
    isDallE3,
    handleSubmit,
    updateFormData,
    toggleAdvanced
  };
}