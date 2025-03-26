import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';

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

  if (!task) return <div className="text-center py-8">Caricamento...</div>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Dettaglio Task</h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <h2 className="font-semibold">Nome:</h2>
          <p>{task.title}</p>
        </div>

        <div>
          <h2 className="font-semibold">Descrizione:</h2>
          <p>{task.description}</p>
        </div>

        <div>
          <h2 className="font-semibold">Stato:</h2>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              task.status === 'To do'
                ? 'bg-red-100 text-red-800'
                : task.status === 'Doing'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {task.status}
          </span>
        </div>

        <div>
          <h2 className="font-semibold">Data creazione:</h2>
          <p>{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Modifica
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
          >
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
