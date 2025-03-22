import React, { useState, useRef } from 'react';
import Modal from './Modal';
import styles from './EditTaskModal.module.css';

const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const editFormRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      title,
      description,
      status,
    };
    onSave(updatedTask);
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Nome</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Descrizione</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Stato</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      }
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
      confirmText="Salva"
    />
  );
};

export default EditTaskModal;
