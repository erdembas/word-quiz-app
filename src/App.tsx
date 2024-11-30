import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import LanguageLevelSelect from './components/LanguageLevelSelect';
import Quiz from './components/Quiz';
import { wordLists } from './data/words';

export interface Question {
  word: string;
  turkish: string;
}

export interface Answer {
  word: string;
  selected: string;
  correct: boolean;
}

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'german' | 'italian' | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answeredIndexes, setAnsweredIndexes] = useState<number[]>([]);

  const LOCAL_STORAGE_KEYS = {
    english: {
      beginner: 'quiz-progress-english-beginner',
      intermediate: 'quiz-progress-english-intermediate',
      advanced: 'quiz-progress-english-advanced',
    },
    german: {
      beginner: 'quiz-progress-german-beginner',
      intermediate: 'quiz-progress-german-intermediate',
      advanced: 'quiz-progress-german-advanced',
    },
    italian: {
      beginner: 'quiz-progress-italian-beginner',
      intermediate: 'quiz-progress-italian-intermediate',
      advanced: 'quiz-progress-italian-advanced',
    },
  };

  const handleResetQuiz = () => {
    // LocalStorage temizliği
    if (selectedLanguage && selectedLevel) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS[selectedLanguage][selectedLevel]);
    }

    // State sıfırlama
    setAnswers([]);
    setAnsweredIndexes([]);
    setSelectedLanguage(null);
    setSelectedLevel(null);
  };

  const getWords = () => {
    if (selectedLanguage && selectedLevel) {
      return wordLists[selectedLanguage][selectedLevel];
    }
    return [];
  };

  useEffect(() => {
    if (selectedLanguage && selectedLevel) {
      const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEYS[selectedLanguage][selectedLevel]);
      if (savedProgress) {
        const { answers, answeredIndexes } = JSON.parse(savedProgress);
        setAnswers(answers);
        setAnsweredIndexes(answeredIndexes || []);
      }
    }
  }, [selectedLanguage, selectedLevel]);

  const handleAnswer = (newAnswer: Answer) => {
    const updatedAnswers = [...answers, newAnswer];
    const questionIndex = getWords().findIndex((question) => question.word === newAnswer.word);
    const updatedIndexes = [...answeredIndexes, questionIndex];

    setAnswers(updatedAnswers);
    setAnsweredIndexes(updatedIndexes);

    if (selectedLanguage && selectedLevel) {
      localStorage.setItem(LOCAL_STORAGE_KEYS[selectedLanguage][selectedLevel], JSON.stringify({ answers: updatedAnswers, answeredIndexes: updatedIndexes }));
    }
  };

  const handleExportResults = () => {
    const data = answers.map((a, index) => ({
      '#': index + 1,
      Word: a.word,
      'Your Answer': a.selected,
      Status: a.correct ? 'Correct' : a.selected === 'Unknown' ? 'Skipped' : 'Wrong',
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    XLSX.writeFile(workbook, 'results.xlsx');
  };

  if (!selectedLanguage || !selectedLevel) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <LanguageLevelSelect
          onSelect={(language, level) => {
            setSelectedLanguage(language);
            setSelectedLevel(level);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <Quiz
        onResetQuiz={handleResetQuiz}
        data={getWords()}
        currentQuestionIndex={answeredIndexes.length}
        answers={answers}
        onAnswer={handleAnswer}
        language={selectedLanguage}
        level={selectedLevel}
        onExportResults={handleExportResults} // Excel export
      />
    </div>
  );
};

export default App;
