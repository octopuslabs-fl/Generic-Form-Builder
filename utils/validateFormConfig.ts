import { FormConfig } from '../types';

export function validateFormConfig(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data) {
    return { isValid: false, errors: ['Form configuration is null or undefined.'] };
  }

  // Check top-level properties
  const topLevelKeys: (keyof FormConfig)[] = ['formId', 'title', 'welcome', 'completion', 'steps'];
  for (const key of topLevelKeys) {
    if (data[key] === undefined) errors.push(`Missing top-level property: "${key}".`);
  }

  if (!Array.isArray(data.steps)) {
    errors.push('"steps" property must be an array.');
    // Stop here if steps isn't an array, as subsequent checks will fail
    return { isValid: errors.length === 0, errors };
  }

  // Check each step
  data.steps.forEach((step: any, stepIndex: number) => {
    if (!step.id) errors.push(`Step ${stepIndex + 1} is missing an "id".`);
    if (!step.title) errors.push(`Step ${stepIndex + 1} (id: ${step.id || 'N/A'}) is missing a "title".`);
    if (!Array.isArray(step.fields)) {
      errors.push(`"fields" property in step (id: ${step.id || 'N/A'}) must be an array.`);
      return; // Continue to next step if fields array is missing
    }

    // Check each field in the step
    step.fields.forEach((field: any, fieldIndex: number) => {
      if (!field.id) errors.push(`Field ${fieldIndex + 1} in step (id: ${step.id}) is missing an "id".`);
      if (field.label === undefined) errors.push(`Field (id: ${field.id || 'N/A'}) is missing a "label".`);
      if (!field.type) errors.push(`Field (id: ${field.id || 'N/A'}) is missing a "type".`);
      if (field.required === undefined) errors.push(`Field (id: ${field.id || 'N/A'}) is missing a "required" property.`);

      const optionBasedTypes = ['select', 'radio-group', 'checkbox-group'];
      if (optionBasedTypes.includes(field.type)) {
        if (!Array.isArray(field.options) || field.options.length === 0) {
          errors.push(`Field (id: ${field.id}) is of type "${field.type}" but is missing or has an empty "options" array.`);
        } else {
          field.options.forEach((option: any, optionIndex: number) => {
            if (typeof option.label === 'undefined' || typeof option.value === 'undefined') {
              errors.push(`Option ${optionIndex + 1} for field (id: ${field.id}) is malformed. Missing "label" or "value".`);
            }
          });
        }
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
