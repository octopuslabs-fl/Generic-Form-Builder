import React, { useState, useEffect, useRef } from 'react';
import { MultiStepForm } from './components/MultiStepForm';
import { FormConfig, FormData, MultiStepFormHandle } from './types';
import { validateFormConfig } from './utils/validateFormConfig';

const App: React.FC = () => {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<MultiStepFormHandle>(null);

  useEffect(() => {
    const loadFormConfig = async () => {
      try {
        const response = await fetch('./data/form-data.json');
        if (!response.ok) {
          throw new Error(`Failed to load form configuration. Status: ${response.status}`);
        }
        const data = await response.json();

        // Validate the structure of the JSON data
        const validationResult = validateFormConfig(data);
        if (!validationResult.isValid) {
          const errorMessages = validationResult.errors.join('\n- ');
          throw new Error(`Invalid form configuration found:\n- ${errorMessages}`);
        }

        setFormConfig(data as FormConfig);
      } catch (err: any) {
        console.error("Error loading form configuration:", err);
        // Check if the error is a JSON parsing error specifically
        if (err instanceof SyntaxError) {
          setError("Failed to parse form configuration. Please check for syntax errors (e.g., missing or extra commas) in the JSON file.");
        } else {
          setError(err.message);
        }
      }
    };
    loadFormConfig();
  }, []);

  const handleFormSubmit = (formData: FormData) => {
    console.log("--- Form Submitted ---");
    console.log("Collected Data:", formData);
    alert('Form submitted successfully! Check the browser console for the data.');
    // Clear saved progress on successful submission
    if (formConfig) {
      localStorage.removeItem(`formProgress-${formConfig.formId}`);
    }
  };

  const saveProgress = () => {
    if (formRef.current && formConfig) {
      const state = formRef.current.getState();
      localStorage.setItem(`formProgress-${formConfig.formId}`, JSON.stringify(state));
      alert('Progress saved!');
    }
  };

  const loadProgress = () => {
    if (!formConfig) return;
    const savedStateJSON = localStorage.getItem(`formProgress-${formConfig.formId}`);
    if (savedStateJSON && formRef.current) {
      try {
        const savedState = JSON.parse(savedStateJSON);
        formRef.current.restoreState(savedState);
        alert('Progress restored!');
      } catch (e) {
        console.error("Failed to load progress:", e);
        alert('Failed to load progress. Saved data might be corrupt.');
        localStorage.removeItem(`formProgress-${formConfig.formId}`);
      }
    } else {
      alert('No saved progress found.');
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 border border-slate-700 p-8 text-red-400">
          <div className="flex flex-col justify-center py-10">
            <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
            <pre className="text-left text-sm whitespace-pre-wrap">{error}</pre>
          </div>
        </div>
      );
    }

    if (!formConfig) {
      return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 border border-slate-700 p-8">
          <div className="flex justify-center items-center py-10">
            <p className="text-lg text-slate-300 animate-pulse">Loading Form...</p>
          </div>
        </div>
      );
    }
    
    return (
      <>
        <MultiStepForm ref={formRef} config={formConfig} onSubmit={handleFormSubmit} />
        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={saveProgress} 
            className="px-5 py-2 bg-sky-700 text-white rounded-lg font-semibold shadow-md hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Save Progress
          </button>
          <button 
            onClick={loadProgress} 
            className="px-5 py-2 bg-slate-600 text-white rounded-lg font-semibold shadow-md hover:bg-slate-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Load Progress
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
