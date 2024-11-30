import React, { useState } from 'react';
import Alert from './Alert';

type languages = 'english' | 'german' | 'italian';

interface LanguageLevelSelectProps {
  onSelect: (language: languages, level: 'beginner' | 'intermediate' | 'advanced') => void;
}

const getLanguageFlag = (language: languages) => {
  switch (language) {
    case 'english':
      return '🇬🇧';

    case 'italian':
      return '🇮🇹';
    case 'german':
      return '🇩🇪';
  }
};

const LanguageLevelSelect: React.FC<LanguageLevelSelectProps> = ({ onSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'german' | 'italian' | null>(null);

  if (!selectedLanguage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Your Language</h1>

          <Alert type="warning" message="Henüz İtalyanca ve Almancayı ekleyemedim :)" />

          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => setSelectedLanguage('english')} className="flex flex-col items-center py-4 px-6 bg-gray-100 hover:bg-gray-200 transition rounded-lg shadow">
              <span className="text-4xl mb-2">🇬🇧</span>
              <span className="font-medium text-gray-800">English</span>
            </button>
            <button onClick={() => setSelectedLanguage('italian')} className="flex flex-col items-center py-4 px-6 bg-gray-100 hover:bg-gray-200 transition rounded-lg shadow">
              <span className="text-4xl mb-2">🇮🇹</span>
              <span className="font-medium text-gray-800">Italian</span>
            </button>
            <button onClick={() => setSelectedLanguage('german')} className="flex flex-col items-center py-4 px-6 bg-gray-100 hover:bg-gray-200 transition rounded-lg shadow">
              <span className="text-4xl mb-2">🇩🇪</span>
              <span className="font-medium text-gray-800">German</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Your Level ({getLanguageFlag(selectedLanguage)})</h1>
        <div className="grid grid-cols-1 gap-4">
          <Alert type="warning" message="Henüz sadece Beginner seviyesi ekli :)" />

          <button onClick={() => onSelect(selectedLanguage, 'beginner')} className="py-3 px-6 bg-gray-100 hover:bg-gray-200 transition rounded-lg shadow text-center font-medium text-gray-800">
            Beginner
          </button>
          <button onClick={() => onSelect(selectedLanguage, 'intermediate')} className="py-3 px-6 bg-gray-100 hover:bg-gray-200 transition rounded-lg shadow text-center font-medium text-gray-800">
            Intermediate
          </button>
          <button onClick={() => onSelect(selectedLanguage, 'advanced')} className="py-3 px-6 bg-gray-100 hover:bg-gray-200 transition rounded-lg shadow text-center font-medium text-gray-800">
            Advanced
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageLevelSelect;
