import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

// Componente AddTask per l'aggiunta di nuovi task
const AddTask = () => {
  // Stato per gestire i dati del form
  const [formData, setFormData] = useState({
    title: '', // Titolo del task (vuoto inizialmente)
    description: '', // Descrizione (vuota inizialmente)
    status: 'To do', // Stato predefinito "Da fare"
  });

  // Stati per gestire errori e stato di invio
  const [error, setError] = useState(''); // Messaggio di errore
  const [submitting, setSubmitting] = useState(false); // Stato di invio

  // Estrae la funzione addTask dal contesto globale
  const { addTask } = useContext(GlobalContext);

  // Funzione per gestire l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene il comportamento default del form

    // Validazione: il titolo è obbligatorio
    if (!formData.title.trim()) {
      setError('Il nome è obbligatorio');
      return; // Interrompe se la validazione fallisce
    }

    setSubmitting(true); // Imposta lo stato di invio a true
    // Chiama addTask dal contesto e attende il risultato
    const { success, error } = await addTask(formData);
    setSubmitting(false); // Reimposta lo stato di invio

    if (success) {
      // Resetta il form se l'operazione ha successo
      setFormData({ title: '', description: '', status: 'To do' });
      setError(''); // Pulisce eventuali errori
    } else {
      // Imposta l'errore se qualcosa va storto
      setError(error || 'Errore durante la creazione del task');
    }
  };

  // Funzione generica per gestire i cambiamenti nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target; // Estrae nome e valore dal campo
    // Aggiorna lo stato del form mantenendo gli altri valori
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Render del componente
  return (
    <div className="max-w-md mx-auto p-4">
      {/* Titolo della pagina con icona */}
      <h1 className="text-2xl font-bold text-center mb-6 text-black flex items-center justify-center gap-2">
        <PlusCircleIcon className="h-8 w-8 text-blue-600" />
        Aggiungi Task
      </h1>

      {/* Form per l'aggiunta del task */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Titolo */}
        <div>
          <label className="block mb-2 text-gray-700">Nome*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Inserisci il nome del task"
            maxLength="100"
          />
          {/* Mostra errore se presente */}
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        {/* Campo Descrizione */}
        <div>
          <label className="block mb-2 text-gray-700">Descrizione</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
            placeholder="Aggiungi una descrizione (facoltativa)"
            maxLength="500"
          />
        </div>

        {/* Campo Stato (select dropdown) */}
        <div>
          <label className="block mb-2 text-gray-700">Stato</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="To do">Da fare</option>
            <option value="Doing">In corso</option>
            <option value="Done">Completato</option>
          </select>
        </div>

        {/* Pulsante di submit */}
        <button
          type="submit"
          disabled={submitting} // Disabilita durante l'invio
          className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-black py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            'Salvataggio...' // Testo durante l'invio
          ) : (
            <>
              <PlusCircleIcon className="h-5 w-5" />
              Aggiungi Task
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
