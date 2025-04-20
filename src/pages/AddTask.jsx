import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To do',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { addTask } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Il nome è obbligatorio');
      return;
    }

    setSubmitting(true);
    try {
      await addTask(formData);
      setFormData({ title: '', description: '', status: 'To do' });
      setError('');
    } catch (err) {
      setError(err.message || 'Errore durante la creazione del task');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-black flex items-center justify-center gap-2">
        <PlusCircleIcon className="h-8 w-8 text-blue-600" />
        Aggiungi Task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

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

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-black py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            'Salvataggio...'
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
