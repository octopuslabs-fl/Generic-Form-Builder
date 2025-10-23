# Interactive JSON-Driven Multi-Step Form

This project is a flexible React library that creates interactive step-by-step forms with beautiful and smooth transitions, all driven by a structured `form-data.json` file.

It offers a seamless user experience with features like a progress bar, client-side validation, and elegant animations, making it easy to build complex onboarding flows, surveys, or registration processes.

## Features

- **JSON-Powered**: Define your entire form structure—steps, fields, and validation—in a single JSON file. No need to write new components for different forms.
- **Smooth Transitions**: Fluid, animated transitions between form steps.
- **Progress Indicator**: A visual progress bar shows users where they are in the process.
- **Built-in Validation**: Supports `required` fields and custom `validationRegex` for robust data validation.
- **Rich Form Elements**: Includes support for text inputs, email, password, select dropdowns, textareas, radio button groups, and checkbox groups.
- **"Other" Option**: Automatically adds a text input when a user selects the "Other" option in radio or checkbox groups.
- **Easy Integration**: Drop the `MultiStepForm` component into your app and handle the final data with a simple `onSubmit` callback.

## How to Integrate and Use

Integrating the form into your React application is straightforward.

### 1. Configure Your Form

Modify `data/form-data.json` to define your form's structure. This is the single source of truth for your form.

- **`title`**, **`welcome`**, **`completion`**: Define the text for the main parts of the form shell.
- **`steps`**: An array where each object represents a step in the form.
- **`fields`**: Inside each step, an array of field objects defines the inputs. Key properties include:
    - **`id`**: A unique identifier used as the key for storing the field's data.
    - **`type`**: The type of input control to render (`text`, `email`, `select`, `radio-group`, `checkbox-group`, etc.).
    - **`required`**: A boolean for basic "is not empty" validation.
    - **`validationRegex`**: A string containing a regular expression for more complex validation.
    - **`allowOther`**: For `radio-group` and `checkbox-group`, set this to `true` to automatically add an "Other" option with a text input.

### 2. Render the Component

Import the `MultiStepForm` component into your application, pass the configuration to it, and provide an `onSubmit` handler.

```jsx
// In your main App component
import React, { useState, useEffect } from 'react';
import { MultiStepForm } from './components/MultiStepForm';
import { FormConfig } from './types';

const App: React.FC = () => {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);

  // Fetch the configuration asynchronously
  useEffect(() => {
    fetch('./data/form-data.json')
      .then(res => res.json())
      .then(data => setFormConfig(data))
      .catch(err => console.error("Failed to load form config", err));
  }, []);

  /**
   * This function is called when the form is successfully submitted.
   * @param {object} formData - An object containing all the collected form data.
   */
  const handleFormSubmit = (formData: { [key: string]: string }) => {
    // The form data is saved here!
    console.log('Form Submitted! Data:', formData);
    // You can now send this data to your server, an analytics service, etc.
    alert('Check the browser console for the submitted form data!');
  };

  if (!formConfig) {
    return <div>Loading Form...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <MultiStepForm config={formConfig} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
```

### 3. Data Handling

- **State Management**: All form state (current step, user input, validation errors) is managed internally by the `useMultiStepForm` custom hook. You don't need to wire up `useState` for every field.
- **Data Storage**: As the user fills out the form, their input is stored in a simple key-value JavaScript object (e.g., `{ fullName: 'Jane Doe', email: 'jane@example.com' }`). For multi-select checkboxes, values are stored as a comma-separated string.
- **`onSubmit` Callback**: This is the primary integration point. The `MultiStepForm` component accepts an `onSubmit` prop. This function is called only when the user clicks the final "Submit" button and all validations for the last step have passed. It receives the complete `formData` object, giving you full, clean access to the collected data.
