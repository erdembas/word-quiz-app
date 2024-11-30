import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'; // Mesaj tipi
  message: string; // Gösterilecek mesaj
  onClose?: () => void; // Kapatma butonu için opsiyonel callback
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const iconMap = {
    success: <FaCheckCircle className="text-green-500 mr-3" size={20} />,
    error: <FaExclamationTriangle className="text-red-500 mr-3" size={20} />,
    warning: <FaExclamationTriangle className="text-yellow-500 mr-3" size={20} />,
    info: <FaInfoCircle className="text-blue-500 mr-3" size={20} />,
  };

  const bgColorMap = {
    success: 'bg-green-50 border-green-500',
    error: 'bg-red-50 border-red-500',
    warning: 'bg-yellow-50 border-yellow-500',
    info: 'bg-blue-50 border-blue-500',
  };

  return (
    <div className={`flex items-center border-l-4 p-4 mb-4 ${bgColorMap[type]} rounded-lg`}>
      {iconMap[type]}
      <span className="text-gray-700 flex-grow">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition" aria-label="Close alert">
          <FaTimes size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
