import React, { useRef, useEffect } from 'react';
import { FormStep } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface ProgressBarProps {
  steps: FormStep[];
  currentStepIndex: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStepIndex }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Effect to scroll the active step into the center of the view
  useEffect(() => {
    const activeStepElement = stepRefs.current[currentStepIndex];
    const container = scrollContainerRef.current;

    if (activeStepElement && container) {
      const containerWidth = container.clientWidth;
      const stepOffsetLeft = activeStepElement.offsetLeft;
      const stepWidth = activeStepElement.offsetWidth;

      // Calculate the scroll position to center the active step
      const scrollLeft = stepOffsetLeft - (containerWidth / 2) + (stepWidth / 2);

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentStepIndex]);


  return (
    <div ref={scrollContainerRef} className="w-full overflow-x-auto pb-3 scrollbar-hide">
      <div className="flex items-center justify-between my-6 flex-nowrap min-w-max px-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div
                // FIX: Changed ref callback from implicit return to block body to conform to Ref<T> type.
                ref={el => { stepRefs.current[index] = el; }}
                // Increased width to better fit longer step titles
                className="flex flex-col items-center flex-shrink-0 w-32 text-center px-2"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${isActive ? 'bg-cyan-500 text-white scale-110' : ''}
                    ${!isCompleted && !isActive ? 'bg-slate-700 text-slate-400 border-2 border-slate-600' : ''}
                  `}
                >
                  {isCompleted ? <CheckIcon /> : <span>{index + 1}</span>}
                </div>
                <p className={`mt-2 text-xs transition-colors duration-300 ${isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                 <div className={`flex-1 h-1 rounded-full transition-colors duration-500 ${isCompleted ? 'bg-green-500' : 'bg-slate-700'}`} style={{minWidth: '1.5rem'}}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};