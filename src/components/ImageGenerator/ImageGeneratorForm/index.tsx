import { FormEvent } from 'react';
import { ServiceType } from '../../../services/imageService';
import { ImageGenerationOptions } from '../../../types/image';
import { FormContainer } from './FormContainer';
import { useImageGeneratorForm } from './useImageGeneratorForm';

export interface ImageGeneratorFormProps {
  models: string[];
  isLoading: boolean;
  onSubmit: (options: ImageGenerationOptions) => void;
  onCancel: () => void;
  selectedService: ServiceType;
}

export function ImageGeneratorForm({ 
  models, 
  isLoading, 
  onSubmit, 
  onCancel, 
  selectedService 
}: ImageGeneratorFormProps) {
  const {
    formData,
    showAdvanced,
    isOpenAI,
    isDallE3,
    handleSubmit: handleFormSubmit,
    updateFormData,
    toggleAdvanced
  } = useImageGeneratorForm({
    models,
    selectedService,
    onSubmit
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <FormContainer
      formData={formData}
      showAdvanced={showAdvanced}
      isLoading={isLoading}
      isOpenAI={isOpenAI}
      isDallE3={isDallE3}
      models={models}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      updateFormData={updateFormData}
      toggleAdvanced={toggleAdvanced}
    />
  );
}

export type { ImageGenerationOptions } from '../../../types/image';