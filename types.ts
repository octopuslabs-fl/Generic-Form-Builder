export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'number' | 'radio-group' | 'checkbox-group';
  placeholder?: string;
  required: boolean;
  options?: FormFieldOption[];
  allowOther?: boolean;
  validationRegex?: string;
  errorMessage?: string;
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormConfig {
  formId: string;
  title: string;
  welcome: {
    title: string;
    description: string;
    buttonText: string;
  };
  completion: {
    title: string;
    description: string;
    buttonText: string;
  };
  steps: FormStep[];
}

export interface FormData {
  [key: string]: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface FormState {
  currentStepIndex: number;
  formData: FormData;
}

export interface MultiStepFormHandle {
  getState: () => FormState;
  restoreState: (state: FormState) => void;
}
