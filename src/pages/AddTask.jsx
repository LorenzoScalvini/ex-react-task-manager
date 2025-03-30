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
  const { addTask } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Il nome è obbligatorio');
      return;
    }

    try {
      await addTask(formData);
      setFormData({ title: '', description: '', status: 'To do' });
      setError('');
    } catch (err) {
      setError('Errore durante la creazione del task');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-white flex items-center justify-center gap-2">
        <PlusCircleIcon className="h-8 w-8 text-blue-400" />
        Aggiungi Task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-300">Nome</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Inserisci il nome del task"
          />
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block mb-2 text-gray-300">Descrizione</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
            placeholder="Aggiungi una descrizione (facoltativa)"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-300">Stato</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Aggiungi Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
