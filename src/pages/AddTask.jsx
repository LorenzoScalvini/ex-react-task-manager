import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const { addTask } = useContext(GlobalContext);

  const symbols = '!@#$%^&*()-_=+[]{}|;:\'\\",.<>?/`~';

  const validateTitle = (value) => {
    if (!value.trim()) {
      setError('Il campo Nome non può essere vuoto.');
      return false;
    }
    if (value.split('').some((char) => symbols.includes(char))) {
      setError('Il campo Nome non può contenere simboli speciali.');
      return false;
    }
    setError('');
    return true;
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    validateTitle(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTitle(title)) {
      return;
    }

    const task = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      const result = await addTask(task);

      if (result.success) {
        alert('Task creato con successo!');
        setTitle('');
        descriptionRef.current.value = '';
        statusRef.current.value = 'To do';
      }
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Aggiungi un Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nome del Task
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none 
              ${
                error
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-200'
              }`}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Descrizione
          </label>
          <textarea
            id="description"
            ref={descriptionRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Stato
          </label>
          <select
            id="status"
            ref={statusRef}
            defaultValue="To do"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button type="submit" className="w-full btn btn-primary">
          Aggiungi Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
