import { useState, useEffect } from 'react';

// URL dell'API
const API_URL = process.env.REACT_APP_API_URL;

const useTasks = () => {
  const [tasks, setTasks] = useState([]); // Stato per memorizzare i task

  // Funzione per recuperare i task dall'API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data); // Aggiorna lo stato con i task recuperati
    } catch (error) {
      console.error('Errore nel recupero dei task:', error);
    }
  };

  // Funzione per aggiungere un task
  const addTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const result = await response.json();
      setTasks((prevTasks) => [...prevTasks, result.task]); // Aggiunge il nuovo task allo stato
    } catch (error) {
      console.error("Errore nell'aggiunta del task:", error);
    }
  };

  // Funzione per rimuovere un task
  const removeTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Rimuove il task dallo stato
    } catch (error) {
      console.error('Errore nella rimozione del task:', error);
    }
  };

  // Funzione per aggiornare un task
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      const result = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? result.task : task))
      ); // Aggiorna il task nello stato
    } catch (error) {
      console.error("Errore nell'aggiornamento del task:", error);
    }
  };

  // Effettua la richiesta al caricamento del componente
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks, // Stato dei task
    addTask, // Funzione per aggiungere un task
    removeTask, // Funzione per rimuovere un task
    updateTask, // Funzione per aggiornare un task
  };
};

export default useTasks; // Esporta il custom hook
