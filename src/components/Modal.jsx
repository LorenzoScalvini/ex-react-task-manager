import React from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Componente Modal riutilizzabile che accetta diverse props:
const Modal = ({
  show, // Boolean: controlla se il modal è visibile
  onClose, // Funzione: chiamata quando si chiude il modal
  onConfirm, // Funzione: chiamata quando si conferma l'azione
  title, // Contenuto del titolo (può essere stringa o JSX)
  content, // Contenuto principale del modal (JSX)
  confirmText = 'Conferma', // Testo del pulsante di conferma (default: 'Conferma')
}) => {
  // Se show è false, non renderizza nulla
  if (!show) return null;

  // Usa ReactDOM.createPortal per renderizzare il modal fuori dal DOM normale
  return ReactDOM.createPortal(
    // Overlay semi-trasparente che copre tutta la pagina
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Contenitore principale del modal */}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-300">
        {/* Intestazione del modal con titolo e pulsante chiusura */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          {/* Pulsante per chiudere il modal (icona X) */}
          <button
            onClick={onClose} // Chiama onClose al click
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Contenuto principale del modal (passato come prop) */}
        <div className="mb-6 text-black">{content}</div>

        {/* Footer con pulsanti Azione/Annulla */}
        <div className="flex justify-end gap-3">
          {/* Pulsante Annulla */}
          <button
            onClick={onClose} // Chiama onClose al click
            className="px-4 py-2 rounded-md flex items-center gap-2 transition-colors border border-gray-300 hover:bg-gray-200 text-black"
          >
            <XMarkIcon className="h-5 w-5 text-black" />
            Annulla
          </button>

          {/* Pulsante di Conferma/Azione principale */}
          <button
            onClick={onConfirm} // Chiama onConfirm al click
            className="px-4 py-2 rounded-md flex items-center gap-2 transition-colors bg-white border border-gray-300 hover:bg-gray-200 text-black"
          >
            <CheckCircleIcon className="h-5 w-5 text-black" />
            {confirmText} {/* Testo personalizzabile */}
          </button>
        </div>
      </div>
    </div>,
    // Renderizza il modal in un elemento con id 'modal-root' (deve esistere nell'HTML)
    document.getElementById('modal-root')
  );
};

export default Modal;
