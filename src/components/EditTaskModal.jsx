import React, { useState } from 'react';
import Modal from './Modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

// Componente EditTaskModal che riceve 4 props:
// - show: boolean per mostrare/nascondere il modal
// - onClose: funzione da chiamare quando si chiude il modal
// - task: oggetto contenente i dati del task da modificare
// - onSave: funzione da chiamare per salvare le modifiche
const EditTaskModal = ({ show, onClose, task, onSave }) => {
  // Stato per gestire i dati del form
  const [formData, setFormData] = useState({
    title: task.title, // Titolo del task (precompilato)
    description: task.description, // Descrizione (precompilata)
    status: task.status, // Stato (precompilato)
  });

  // Stato per gestire gli errori di validazione
  const [error, setError] = useState('');

  // Funzione per gestire l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene il comportamento default del form

    // Validazione: il titolo è obbligatorio
    if (!formData.title.trim()) {
      setError('Il nome è obbligatorio');
      return; // Interrompe l'esecuzione se non valido
    }

    setError(''); // Resetta l'errore
    onSave(formData); // Chiama la funzione onSave passata come prop con i nuovi dati
  };

  return (
    // Componente Modal personalizzato con tutte le props necessarie
    <Modal
      show={show} // Controlla la visibilità del modal
      onClose={onClose} // Funzione per chiudere il modal
      onConfirm={handleSubmit} // Funzione da eseguire al click su "Salva"
      title={
        // Titolo personalizzato del modal
        <div className="flex items-center gap-2 text-black">
          <PencilSquareIcon className="h-5 w-5" /> {/* Icona matita */}
          Modifica Task {/* Testo del titolo */}
        </div>
      }
      content={
        // Contenuto del modal (il form di modifica)
        <form className="space-y-4">
          {' '}
          {/* Form con spaziatura tra gli elementi */}
          {/* Campo Titolo */}
          <div>
            <label className="block mb-1 text-black">Nome</label>
            <input
              type="text"
              value={formData.title} // Valore legato allo stato
              onChange={(
                e // Aggiorna lo stato alla modifica
              ) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {/* Mostra errore se presente */}
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
          {/* Campo Descrizione */}
          <div>
            <label className="block mb-1 text-black">Descrizione</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {/* Campo Stato (select dropdown) */}
          <div>
            <label className="block mb-1 text-black">Stato</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="To do">Da fare</option>
              <option value="Doing">In corso</option>
              <option value="Done">Completato</option>
            </select>
          </div>
        </form>
      }
      confirmText="Salva" // Testo del pulsante di conferma
    />
  );
};

export default EditTaskModal;
