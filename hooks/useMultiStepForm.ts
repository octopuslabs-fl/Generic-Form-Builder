import { useState, useMemo } from 'react';
import { FormConfig, FormStep, FormData, FormErrors, FormState } from '../types';

export const useMultiStepForm = (config: FormConfig, onSubmit?: (formData: FormData) => void) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1); // -1 for welcome screen
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const steps = useMemo(() => config.steps, [config.steps]);

  const isWelcomeScreen = currentStepIndex === -1;
  const isCompletionScreen = currentStepIndex === steps.length;
  const isFormActive = !isWelcomeScreen && !isCompletionScreen;

  const currentStep: FormStep | undefined = isFormActive ? steps[currentStepIndex] : undefined;
  
  const validateStep = (step: FormStep): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    for (const field of step.fields) {
      const value = formData[field.id] || '';
      if (field.required && !value.trim()) {
        newErrors[field.id] = field.errorMessage || 'This field is required.';
        isValid = false;
      } else if (value && field.validationRegex) {
        const regex = new RegExp(field.validationRegex);
        if (!regex.test(value)) {
          newErrors[field.id] = field.errorMessage || 'Invalid format.';
          isValid = false;
        }
      } else if (field.allowOther && value.includes('__other__')) {
        const otherValue = formData[`${field.id}_other`] || '';
        if (!otherValue.trim()) {
          newErrors[field.id] = 'Please specify your "Other" choice.';
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };
  
  const startForm = () => {
    setCurrentStepIndex(0);
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  const goToNextStep = () => {
    if (currentStep && validateStep(currentStep)) {
      if (isLastStep) {
        onSubmit?.(formData);
      }
      if (currentStepIndex < steps.length) {
        setCurrentStepIndex(index => index + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setErrors({});
      setCurrentStepIndex(index => index - 1);
    }
  };
  
  const updateFormData = (fieldId: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldId]: value,
    }));
    if (errors[fieldId]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const isFirstStep = currentStepIndex === 0;

  const resetForm = () => {
    setFormData({});
    setErrors({});
    setCurrentStepIndex(-1);
  };

  const setFormState = (state: FormState) => {
    setCurrentStepIndex(state.currentStepIndex);
    setFormData(state.formData);
    setErrors({}); // Clear errors on restore
  };

  return {
    currentStepIndex,
    currentStep,
    formData,
    errors,
    isWelcomeScreen,
    isCompletionScreen,
    isFormActive,
    isFirstStep,
    isLastStep,
    steps,
    startForm,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    resetForm,
    validateStep,
    setFormState,
  };
};
