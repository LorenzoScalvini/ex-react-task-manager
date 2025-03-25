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
    if (foundTask) {
      setTask(foundTask);
    } else {
      navigate('/');
    }
  }, [id, tasks, navigate]);

  const handleDelete = async () => {
    try {
      const result = await removeTask(task.id);

      if (result.success) {
        alert('Task eliminato con successo!');
        navigate('/');
      }
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  };

  const handleSave = async (updatedTask) => {
    try {
      const result = await updateTask(task.id, updatedTask);

      if (result.success) {
        alert('Task aggiornato con successo!');
        setShowEditModal(false);
        setTask(result.task);
      }
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  };

  if (!task) {
    return <div className="text-center py-6">Caricamento...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Dettaglio Task</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <strong className="text-gray-600">Nome:</strong>
          <p className="text-lg font-semibold">{task.title}</p>
        </div>
        <div>
          <strong className="text-gray-600">Descrizione:</strong>
          <p>{task.description}</p>
        </div>
        <div>
          <strong className="text-gray-600">Stato:</strong>
          <span
            className={`
              inline-block px-2 py-1 rounded text-sm 
              ${
                task.status === 'To do'
                  ? 'bg-red-100 text-red-800'
                  : task.status === 'Doing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }
            `}
          >
            {task.status}
          </span>
        </div>
        <div>
          <strong className="text-gray-600">Data di creazione:</strong>
          <p>{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="btn btn-edit flex-1"
          >
            Modifica Task
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="btn btn-danger flex-1"
          >
            Elimina Task
          </button>
        </div>
      </div>

      <Modal
        title="Conferma Eliminazione"
        content="Sei sicuro di voler eliminare questo task?"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />

      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleSave}
      />
    </div>
  );
};

export default TaskDetail;
