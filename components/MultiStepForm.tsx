
import React from 'react';
import { FormConfig, FormData } from '../types';
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

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ config, onSubmit }) => {
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
  } = useMultiStepForm(config, onSubmit);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 border border-slate-700 overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-cyan-400 mb-2">{config.title}</h2>
        {isFormActive && (
          <ProgressBar steps={steps} currentStepIndex={currentStepIndex} />
        )}
      </div>

      <div className="relative overflow-hidden min-h-[350px]">
        {isWelcomeScreen && (
            <WelcomeScreen content={config.welcome} onStart={startForm} />
        )}

        {isCompletionScreen && (
            <CompletionScreen content={config.completion} onRestart={resetForm} formData={formData} />
        )}

        {isFormActive && (
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${steps.length * 100}%`,
              transform: `translateX(-${currentStepIndex * (100 / steps.length)}%)`,
            }}
          >
            {steps.map((step) => (
              <div
                key={step.id}
                className="w-full flex-shrink-0"
                style={{ width: `${100 / steps.length}%` }}
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
        )}
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
};