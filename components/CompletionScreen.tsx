
import React from 'react';
import { FormConfig, FormData } from '../types';
import { PartyPopperIcon } from './icons/PartyPopperIcon';

interface CompletionScreenProps {
  content: FormConfig['completion'];
  onRestart: () => void;
  formData: FormData;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ content, onRestart, formData }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
      <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
        <PartyPopperIcon />
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">{content.title}</h2>
      <p className="text-slate-300 max-w-md mb-8">{content.description}</p>
      
      {/* Optional: Display submitted data for review */}
      <div className="bg-slate-900/50 rounded-lg p-4 w-full max-w-sm text-left text-sm mb-8 border border-slate-700">
        <h4 className="font-semibold text-cyan-400 mb-2">Submission Summary:</h4>
        <ul className="space-y-1 text-slate-300">
          {Object.entries(formData).map(([key, value]) => (
            key !== 'password' && <li key={key}><strong className="font-medium text-slate-200 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold shadow-md hover:bg-slate-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        {content.buttonText}
      </button>
    </div>
  );
};
