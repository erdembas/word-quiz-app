import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { FaChartPie, FaFileExcel, FaRedo } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { Answer } from '../App';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultProps {
  answers: Answer[];
  onResetQuiz: () => void;
}

const Result: React.FC<ResultProps> = ({ answers, onResetQuiz }) => {
  const [filter, setFilter] = useState<string>('All');
  const [showChart, setShowChart] = useState(false);

  const correctAnswers = answers.filter((a) => a.correct).length;
  const wrongAnswers = answers.filter((a) => !a.correct && a.selected !== 'Unknown').length;
  const skippedAnswers = answers.filter((a) => a.selected === 'Unknown').length;

  const filteredAnswers = answers.filter((a) => {
    if (filter === 'Correct') return a.correct;
    if (filter === 'Wrong') return !a.correct && a.selected !== 'Unknown';
    if (filter === 'Skipped') return a.selected === 'Unknown';
    return true; // Default: All
  });

  const pieData = {
    labels: ['Correct', 'Wrong', 'Skipped'],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers, skippedAnswers],
        backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],
        hoverBackgroundColor: ['#45a049', '#e53935', '#fdd835'],
      },
    ],
  };

  const exportToExcel = () => {
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

  return (
    <div className="mt-6 max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
      {/* Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button onClick={() => setShowChart(!showChart)} className="flex items-center py-2 px-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition">
            <FaChartPie className="mr-2" /> {showChart ? 'Hide Chart' : 'Show Chart'}
          </button>
          <button onClick={exportToExcel} className="flex items-center py-2 px-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition">
            <FaFileExcel className="mr-2" /> Export to Excel
          </button>

          <button onClick={onResetQuiz} className="flex items-center py-2 px-4 bg-red-100 rounded-lg shadow hover:bg-red-200 transition">
            <FaRedo className="mr-2 text-red-500" />
            Reset Quiz
          </button>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="py-2 px-4 border rounded-lg shadow">
          <option value="All">All</option>
          <option value="Correct">Correct</option>
          <option value="Wrong">Wrong</option>
          <option value="Skipped">Skipped</option>
        </select>
      </div>

      {/* Pie Chart */}
      {showChart && (
        <div className="flex justify-center items-center mb-6">
          <div style={{ width: 300, height: 300 }}>
            <Pie data={pieData} />
          </div>
        </div>
      )}

      {/* Filtered Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 py-2 px-4">#</th>
              <th className="border border-gray-300 py-2 px-4">Word</th>
              <th className="border border-gray-300 py-2 px-4">Your Answer</th>
              <th className="border border-gray-300 py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnswers.map((a, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 py-2 px-4">{index + 1}</td>
                <td className="border border-gray-300 py-2 px-4">{a.word}</td>
                <td className="border border-gray-300 py-2 px-4">{a.selected}</td>
                <td className={`border border-gray-300 py-2 px-4 ${a.correct ? 'text-green-500' : a.selected === 'Unknown' ? 'text-yellow-500' : 'text-red-500'}`}>{a.correct ? 'Correct' : a.selected === 'Unknown' ? 'Skipped' : 'Wrong'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
