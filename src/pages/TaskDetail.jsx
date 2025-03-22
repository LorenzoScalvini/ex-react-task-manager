import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';
import styles from './TaskDetail.module.css';

const TaskDetail = () => {
  const { id } = useParams(); // Ottieni l'ID del task dall'URL
  const { tasks, removeTask, updateTask } = useContext(GlobalContext); // Usa il contesto globale
  const [task, setTask] = useState(null); // Stato per memorizzare i dettagli del task
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Stato per la modale di eliminazione
  const [showEditModal, setShowEditModal] = useState(false); // Stato per la modale di modifica
  const navigate = useNavigate(); // Hook per la navigazione

  // Trova il task corrispondente all'ID
  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === parseInt(id));
    if (foundTask) {
      setTask(foundTask);
    } else {
      navigate('/'); // Reindirizza alla home se il task non esiste
    }
  }, [id, tasks, navigate]);

  // Funzione per gestire l'eliminazione del task
  const handleDelete = async () => {
    try {
      const result = await removeTask(task.id); // Chiama la funzione removeTask

      if (result.success) {
        alert('Task eliminato con successo!');
        navigate('/'); // Reindirizza alla home dopo l'eliminazione
      }
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  };

  // Funzione per gestire la modifica del task
  const handleSave = async (updatedTask) => {
    try {
      const result = await updateTask(task.id, updatedTask); // Chiama la funzione updateTask

      if (result.success) {
        alert('Task aggiornato con successo!');
        setShowEditModal(false); // Chiude la modale di modifica
        setTask(result.task); // Aggiorna i dettagli del task visualizzati
      }
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  };

  if (!task) {
    return <div>Caricamento...</div>; // Mostra un messaggio di caricamento
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

      {/* Pulsanti per modificare ed eliminare il task */}
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

      {/* Modale di eliminazione */}
      <Modal
        title="Conferma Eliminazione"
        content="Sei sicuro di voler eliminare questo task?"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />

      {/* Modale di modifica */}
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
