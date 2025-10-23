
import React from 'react';
import { FormStep as FormStepType, FormData, FormErrors } from '../types';
import { FormControl } from './FormControl';

interface FormStepProps {
  step: FormStepType;
  formData: FormData;
  errors: FormErrors;
  updateFormData: (fieldId: string, value: string) => void;
}

export const FormStep: React.FC<FormStepProps> = ({ step, formData, errors, updateFormData }) => {
  return (
    <div className="px-6 sm:px-8 pb-8">
      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
      <p className="text-slate-400 mb-6 mt-1">{step.description}</p>
      <div className="space-y-6">
        {step.fields.map(field => (
          <FormControl
            key={field.id}
            field={field}
            value={formData[field.id] || ''}
            otherValue={formData[`${field.id}_other`] || ''}
            error={errors[field.id]}
            updateFormData={updateFormData}
          />
        ))}
      </div>
    </div>
  );
};