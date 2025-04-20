import React from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Modal = ({
  show,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = 'Conferma',
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-black" />
          </button>
        </div>

        <div className="mb-6 text-black">{content}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md flex items-center gap-2 transition-colors border border-gray-300 hover:bg-gray-200 text-black"
          >
            <XMarkIcon className="h-5 w-5 text-black" />
            Annulla
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md flex items-center gap-2 transition-colors bg-white border border-gray-300 hover:bg-gray-200 text-black"
          >
            <CheckCircleIcon className="h-5 w-5 text-black" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
