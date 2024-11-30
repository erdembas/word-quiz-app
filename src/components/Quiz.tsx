import React, { useState } from 'react';
import { FaArrowRight, FaChartBar, FaFileExport } from 'react-icons/fa';
import { Answer, Question } from '../App';
import Result from './Result';

interface QuizProps {
  data: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  onAnswer: (newAnswer: Answer) => void;
  language: 'english' | 'italian' | 'german';
  level: 'beginner' | 'intermediate' | 'advanced';
  onExportResults: () => void;
  onResetQuiz: () => void;
}

// Fisher-Yates Shuffle Algoritması
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomWrongAnswers = (data: any[], currentQuestionIndex: number, count: number) => {
  const wrongAnswers = data.filter((_, index) => index !== currentQuestionIndex);
  return shuffleArray(wrongAnswers).slice(0, count);
};

const Quiz: React.FC<QuizProps> = ({ data, currentQuestionIndex, answers, onAnswer, language, level, onExportResults, onResetQuiz }) => {
  const [showResultsModal, setShowResultsModal] = useState(false);
  const question = data[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    const isCorrect = option === question.turkish;
    const newAnswer: Answer = {
      word: question.word,
      selected: option,
      correct: isCorrect,
    };
    onAnswer(newAnswer);
  };

  if (data.length === currentQuestionIndex) {
    return <Result answers={answers} onResetQuiz={onResetQuiz} />;
  }

  const handleSkip = () => {
    const skippedAnswer: Answer = {
      word: question.word,
      selected: 'Unknown',
      correct: false,
    };
    onAnswer(skippedAnswer);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(question.word);

    switch (language) {
      case 'english':
        utterance.lang = 'en-US';
        break;
      case 'german':
        utterance.lang = 'de-DE';
        break;
      case 'italian':
        utterance.lang = 'it-IT';
        break;
    }

    // Hız, ton gibi ayarlar
    utterance.rate = 1;
    utterance.pitch = 1.1;

    // Konuşmayı başlat
    window.speechSynthesis.speak(utterance);
  };

  const wrongAnswers = getRandomWrongAnswers(data, currentQuestionIndex, 3);
  const options = shuffleArray([
    ...wrongAnswers.map((option) => ({ text: option.turkish, isCorrect: false })), // Yanlış cevaplar
    { text: question.turkish, isCorrect: true }, // Doğru cevap
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 relative">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md">
        {/* Title */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Question {currentQuestionIndex + 1} / {data.length}
          </h2>
          {/* Speak Button */}
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">{question.word}</h3>
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option.text)} className="py-3 px-5 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition">
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Language: <span className="font-semibold">{language === 'english' ? 'English 🇬🇧' : 'French 🇫🇷'}</span>
            </span>
            <span className="text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-full">
              Level: <span className="capitalize font-semibold">{level}</span>
            </span>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-4">
            {/* Skip Button */}
            <button onClick={handleSkip} className="flex-grow flex items-center justify-center py-2 px-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition">
              <FaArrowRight className="mr-2 text-gray-700" />
              <span className="text-gray-700 font-medium">Skip</span>
            </button>

            {/* Show Results Button */}
            <button
              onClick={() => setShowResultsModal(true)} // Modal logic
              className="flex-grow flex items-center justify-center py-2 px-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
            >
              <FaChartBar className="mr-2 text-gray-700" />
              <span className="text-gray-700 font-medium">Show Results</span>
            </button>

            {/* Export Results Button */}
            <button onClick={onExportResults} className="flex-grow flex items-center justify-center py-2 px-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition">
              <FaFileExport className="mr-2 text-gray-700" />
              <span className="text-gray-700 font-medium">Export</span>
            </button>
          </div>
        </div>
      </div>
      {showResultsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
            <Result answers={answers} onResetQuiz={onResetQuiz} />
            <button
              onClick={() => setShowResultsModal(false)} // Modal kapatma
              className="mt-4 py-2 px-4 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition w-full"
            >
              Back to Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
