
import React from 'react';
import { FormField } from '../types';

interface FormControlProps {
  field: FormField;
  value: string;
  otherValue?: string;
  error?: string;
  updateFormData: (fieldId: string, value: string) => void;
}

export const FormControl: React.FC<FormControlProps> = ({ field, value, otherValue, error, updateFormData }) => {
  const commonClasses = "w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow";
  const errorClasses = "border-red-500 ring-red-500";
  
  const isOtherSelected = field.allowOther && (
    (field.type === 'radio-group' && value === '__other__') ||
    (field.type === 'checkbox-group' && value.includes('__other__'))
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: optionValue, checked } = e.target;
    const currentValues = value ? value.split(',') : [];

    let newValues;
    if (checked) {
      newValues = [...currentValues, optionValue];
    } else {
      newValues = currentValues.filter(v => v !== optionValue);
    }
    
    const newValueString = newValues.filter(v => v).join(',');
    updateFormData(field.id, newValueString);
    
    if (optionValue === '__other__' && !checked) {
      updateFormData(`${field.id}_other`, '');
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateFormData(field.id, newValue);
    if (value === '__other__' && newValue !== '__other__') {
      updateFormData(`${field.id}_other`, '');
    }
  };

  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.id}
            name={field.id}
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={`${commonClasses} min-h-[100px] ${error ? errorClasses : ''}`}
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            name={field.id}
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            required={field.required}
            className={`${commonClasses} ${error ? errorClasses : ''}`}
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value} disabled={option.value === ""}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'radio-group':
      case 'checkbox-group':
        const isRadio = field.type === 'radio-group';
        const currentValues = value ? value.split(',') : [];

        return (
            <div className="space-y-2">
                {field.options?.map(option => (
                    <div key={option.value} className="flex items-center">
                        <input
                            type={isRadio ? 'radio' : 'checkbox'}
                            id={`${field.id}-${option.value}`}
                            name={field.id}
                            value={option.value}
                            checked={isRadio ? value === option.value : currentValues.includes(option.value)}
                            onChange={isRadio ? handleRadioChange : handleCheckboxChange}
                            className={isRadio ? "form-radio h-4 w-4 text-cyan-600 bg-slate-700 border-slate-600 focus:ring-cyan-500" : "form-checkbox h-4 w-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"}
                        />
                        <label htmlFor={`${field.id}-${option.value}`} className="ml-3 text-sm text-slate-300">
                            {option.label}
                        </label>
                    </div>
                ))}
                {field.allowOther && (
                     <div className="flex items-center">
                        <input
                            type={isRadio ? 'radio' : 'checkbox'}
                            id={`${field.id}-__other__`}
                            name={field.id}
                            value="__other__"
                            checked={isRadio ? value === '__other__' : currentValues.includes('__other__')}
                            onChange={isRadio ? handleRadioChange : handleCheckboxChange}
                            className={isRadio ? "form-radio h-4 w-4 text-cyan-600 bg-slate-700 border-slate-600 focus:ring-cyan-500" : "form-checkbox h-4 w-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"}
                        />
                        <label htmlFor={`${field.id}-__other__`} className="ml-3 text-sm text-slate-300">
                            Other
                        </label>
                    </div>
                )}
                {isOtherSelected && (
                    <div className="pl-7 pt-1">
                        <input
                            type="text"
                            placeholder="Please specify"
                            value={otherValue}
                            onChange={(e) => updateFormData(`${field.id}_other`, e.target.value)}
                            className={`${commonClasses} text-sm`}
                        />
                    </div>
                )}
            </div>
        );
      default:
        return (
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={`${commonClasses} ${error ? errorClasses : ''}`}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={field.id} className="block text-sm font-medium text-slate-300 mb-2">
        {field.label}
      </label>
      {renderInput()}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};