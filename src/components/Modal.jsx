import React from 'react';
import ReactDOM from 'react-dom';
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const Modal = ({
  show,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = 'Conferma',
  darkMode = true,
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          darkMode
            ? 'bg-gray-800 text-white border border-gray-600'
            : 'bg-white'
        } rounded-lg shadow-xl max-w-md w-full p-6`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">{content}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors
              ${
                darkMode
                  ? 'border border-gray-600 hover:bg-gray-700'
                  : 'border hover:bg-gray-100'
              }`}
          >
            <XMarkIcon className="h-5 w-5" />
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors
              ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
          >
            <CheckCircleIcon className="h-5 w-5" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
