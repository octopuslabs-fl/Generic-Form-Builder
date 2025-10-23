
import React, { useState, useEffect } from 'react';
import { MultiStepForm } from './components/MultiStepForm';
import { FormConfig, FormData } from './types';

const App: React.FC = () => {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormConfig = async () => {
      try {
        const response = await fetch('./data/form-data.json');
        if (!response.ok) {
          throw new Error(`Failed to load form configuration. Status: ${response.status}`);
        }
        const data = await response.json();
        setFormConfig(data);
      } catch (err: any) {
        console.error("Error loading form configuration:", err);
        setError(err.message);
      }
    };
    loadFormConfig();
  }, []);

  const handleFormSubmit = (formData: FormData) => {
    console.log("--- Form Submitted ---");
    console.log("Collected Data:", formData);
    // In a real application, you would send this data to a server.
    // e.g., fetch('/api/submit-form', { method: 'POST', body: JSON.stringify(formData) });
    alert('Form submitted successfully! Check the browser console for the data.');
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 border border-slate-700 p-8 text-center text-red-400">
          <div className="flex flex-col justify-center items-center min-h-[350px]">
            <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
            <p>{error}</p>
          </div>
        </div>
      );
    }

    if (!formConfig) {
      return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 border border-slate-700 p-8">
            <div className="flex justify-center items-center min-h-[350px]">
                <p className="text-lg text-slate-300 animate-pulse">Loading Form...</p>
            </div>
        </div>
      );
    }
    
    return <MultiStepForm config={formConfig} onSubmit={handleFormSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;