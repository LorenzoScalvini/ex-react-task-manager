// TaskDetail.jsx
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
  const { tasks, removeTask, updateTask, loading, error } =
    useContext(GlobalContext);
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
    const { success, error } = await removeTask(task.id);
    if (success) navigate('/');
    else alert(error);
  };

  const handleUpdate = async (updatedTask) => {
    const { success, error } = await updateTask(task.id, updatedTask);
    if (success) {
      setTask({ ...task, ...updatedTask });
      setShowEditModal(false);
    } else {
      alert(error);
    }
  };

  if (loading)
    return <div className="text-center py-8 text-gray-600">Caricamento...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!task)
    return (
      <div className="text-center py-8 text-gray-600">Task non trovato</div>
    );

  const statusColors = {
    'To do': 'bg-red-100 text-red-800 border border-red-200',
    Doing: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    Done: 'bg-green-100 text-green-800 border border-green-200',
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Indietro
      </button>

      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Dettaglio Task
      </h1>

      <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg space-y-6">
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Nome:</h2>
            <p className="text-black text-lg">{task.title}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Descrizione:</h2>
            <p className="text-black whitespace-pre-line">
              {task.description || 'Nessuna descrizione'}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Stato:</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </span>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              Data creazione:
            </h2>
            <p className="text-gray-600">
              {new Date(task.createdAt).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-100 text-black py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <PencilIcon className="h-5 w-5" />
            Modifica
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-100 text-black py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <TrashIcon className="h-5 w-5" />
            Elimina
          </button>
        </div>
      </div>

      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Conferma eliminazione"
        content="Sei sicuro di voler eliminare questo task?"
        confirmText="Elimina"
      />

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
