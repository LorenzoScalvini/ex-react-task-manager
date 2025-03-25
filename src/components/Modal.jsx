import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = 'Conferma',
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{content}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="btn btn-primary bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Annulla
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
