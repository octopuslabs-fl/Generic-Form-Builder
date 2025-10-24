import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { FormConfig, FormData, MultiStepFormHandle, FormState } from '../types';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import { ProgressBar } from './ProgressBar';
import { FormStep } from './FormStep';
import { WelcomeScreen } from './WelcomeScreen';
import { CompletionScreen } from './CompletionScreen';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CheckIcon } from './icons/CheckIcon';

interface MultiStepFormProps {
  config: FormConfig;
  onSubmit?: (formData: FormData) => void;
}

export const MultiStepForm = forwardRef<MultiStepFormHandle, MultiStepFormProps>(({ config, onSubmit }, ref) => {
  const {
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
    setFormState,
  } = useMultiStepForm(config, onSubmit);

  const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    getState: (): FormState => ({
      currentStepIndex,
      formData,
    }),
    restoreState: (state: FormState) => {
      setFormState(state);
    },
  }));

  useEffect(() => {
    // If we are on a form step, observe its height to animate the container
    if (isFormActive && currentStepIndex >= 0) {
      const currentStepElement = stepRefs.current[currentStepIndex];
      
      if (currentStepElement) {
        const resizeObserver = new ResizeObserver(() => {
          // When the observed element's size changes, update the container height
          if (stepRefs.current[currentStepIndex]) {
            setContainerHeight(stepRefs.current[currentStepIndex]!.offsetHeight);
          }
        });

        resizeObserver.observe(currentStepElement);

        // Set initial height
        setContainerHeight(currentStepElement.offsetHeight);

        return () => resizeObserver.disconnect();
      }
    } else {
      // For Welcome and Completion screens, height is automatic.
      setContainerHeight('auto');
    }
  }, [currentStepIndex, isFormActive, formData]); // formData dependency to recalculate on "Other" field appearance

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 border border-slate-700 overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-cyan-400 mb-2">{config.title}</h2>
        {isFormActive && (
          <ProgressBar steps={steps} currentStepIndex={currentStepIndex} />
        )}
      </div>

      <div
        className="relative overflow-hidden transition-[height] duration-500 ease-in-out"
        style={{ height: containerHeight }}
      >
        {isWelcomeScreen && (
            <WelcomeScreen content={config.welcome} onStart={startForm} />
        )}

        {isCompletionScreen && (
            <CompletionScreen content={config.completion} onRestart={resetForm} formData={formData} />
        )}

        {isFormActive &&
          steps.map((step, index) => (
            <div
              key={step.id}
              // FIX: Changed ref callback from implicit return to block body to conform to Ref<T> type.
              ref={el => { stepRefs.current[index] = el; }}
              className="absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${(index - currentStepIndex) * 100}%)`,
              }}
              aria-hidden={index !== currentStepIndex}
            >
              <FormStep
                step={step}
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
              />
            </div>
          ))}
      </div>
      
      {isFormActive && (
        <div className="bg-slate-900/50 p-6 flex justify-between items-center border-t border-slate-700">
          <button
            onClick={goToPreviousStep}
            disabled={isFirstStep}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg font-semibold shadow-md hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Go to previous step"
          >
            <ArrowLeftIcon />
            <span>Previous</span>
          </button>
          
          <button
            onClick={goToNextStep}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-offset-2 focus:ring-offset-slate-900 ${
              isLastStep
                ? 'bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-400'
                : 'bg-cyan-600 hover:bg-cyan-500 focus:ring-2 focus:ring-cyan-400'
            }`}
            aria-label={isLastStep ? 'Submit form' : 'Go to next step'}
          >
            <span>{isLastStep ? 'Submit' : 'Next'}</span>
            {isLastStep ? <CheckIcon /> : <ArrowRightIcon />}
          </button>
        </div>
      )}
    </div>
  );
});