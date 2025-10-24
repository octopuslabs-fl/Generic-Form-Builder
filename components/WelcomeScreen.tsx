import React from 'react';
import { FormConfig } from '../types';

interface WelcomeScreenProps {
  content: FormConfig['welcome'];
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ content, onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-3xl font-bold text-white mb-3">{content.title}</h2>
      <p className="text-slate-300 max-w-md mb-8">{content.description}</p>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold shadow-lg hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        {content.buttonText}
      </button>
    </div>
  );
};