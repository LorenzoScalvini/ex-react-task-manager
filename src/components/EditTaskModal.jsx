import React, { useState } from 'react';
import Modal from './Modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={handleSubmit}
      title={
        <div className="flex items-center gap-2 text-white">
          <PencilSquareIcon className="h-5 w-5" />
          Modifica Task
        </div>
      }
      content={
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-white">Nome</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-white">Descrizione</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-white">Stato</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      }
      confirmText="Salva"
    />
  );
};

export default EditTaskModal;
