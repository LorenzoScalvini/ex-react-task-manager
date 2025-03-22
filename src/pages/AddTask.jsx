import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import styles from './AddTask.module.css';

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
        // Resetta il form
        setTitle('');
        descriptionRef.current.value = '';
        statusRef.current.value = 'To do';
      }
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Aggiungi un Task</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Nome del Task</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={error ? styles.errorInput : ''}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descrizione</label>
          <textarea id="description" ref={descriptionRef} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Stato</label>
          <select id="status" ref={statusRef} defaultValue="To do">
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Aggiungi Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
