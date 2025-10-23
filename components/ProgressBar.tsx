
import React from 'react';
import { FormStep } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface ProgressBarProps {
  steps: FormStep[];
  currentStepIndex: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStepIndex }) => {
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 my-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${isActive ? 'bg-cyan-500 text-white scale-110' : ''}
                  ${!isCompleted && !isActive ? 'bg-slate-700 text-slate-400 border-2 border-slate-600' : ''}
                `}
              >
                {isCompleted ? <CheckIcon /> : <span>{index + 1}</span>}
              </div>
              <p className={`mt-2 text-xs text-center transition-colors duration-300 ${isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 rounded-full transition-colors duration-500 ${isCompleted ? 'bg-green-500' : 'bg-slate-700'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
