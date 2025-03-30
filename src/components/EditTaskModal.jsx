// EditTaskModal.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Il nome è obbligatorio');
      return;
    }
    setError('');
    onSave(formData);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleSubmit}
      title={
        <div className="flex items-center gap-2 text-black">
          <PencilSquareIcon className="h-5 w-5" />
          Modifica Task
        </div>
      }
      content={
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-black">Nome</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
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
      confirmText="Salva"
    />
  );
};

export default EditTaskModal;
