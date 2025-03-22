import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';
import styles from './TaskDetail.module.css';

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
    return <div>Caricamento...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Dettaglio Task</h1>
      <div className={styles.taskDetails}>
        <p>
          <strong>Nome:</strong> {task.title}
        </p>
        <p>
          <strong>Descrizione:</strong> {task.description}
        </p>
        <p>
          <strong>Stato:</strong> {task.status}
        </p>
        <p>
          <strong>Data di creazione:</strong>{' '}
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => setShowEditModal(true)}
          className={styles.editButton}
        >
          Modifica Task
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className={styles.deleteButton}
        >
          Elimina Task
        </button>
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
