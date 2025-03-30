import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const [task, setTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === parseInt(id));
    if (foundTask) setTask(foundTask);
    else navigate('/');
  }, [id, tasks, navigate]);

  const handleDelete = async () => {
    await removeTask(task.id);
    navigate('/');
  };

  const handleUpdate = async (updatedTask) => {
    await updateTask(task.id, updatedTask);
    setTask({ ...task, ...updatedTask });
    setShowEditModal(false);
  };

  if (!task)
    return <div className="text-center py-8 text-gray-300">Caricamento...</div>;

  // Dark mode status colors
  const statusColors = {
    'To do': 'bg-red-900/30 text-red-300 border border-red-800',
    Doing: 'bg-yellow-900/30 text-yellow-300 border border-yellow-800',
    Done: 'bg-green-900/30 text-green-300 border border-green-800',
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Indietro
      </button>

      <h1 className="text-3xl font-bold text-center mb-8 text-white p-6">
        Dettaglio Task
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg space-y-6">
        {/* Task Details */}
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-gray-300 mb-2">Nome:</h2>
            <p className="text-white text-lg">{task.title}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-300 mb-2">Descrizione:</h2>
            <p className="text-white whitespace-pre-line">
              {task.description || 'Nessuna descrizione'}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-300 mb-2">Stato:</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </span>
          </div>

          <div>
            <h2 className="font-semibold text-gray-300 mb-2">
              Data creazione:
            </h2>
            <p className="text-gray-400">
              {new Date(task.createdAt).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <PencilIcon className="h-5 w-5" />
            Modifica
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <TrashIcon className="h-5 w-5" />
            Elimina
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Conferma eliminazione"
        content="Sei sicuro di voler eliminare questo task?"
        confirmText="Elimina"
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default TaskDetail;
