import { useState, useEffect } from 'react';

// Custom hook per gestire i task
const useTasks = () => {
  const [tasks, setTasks] = useState([]); // Stato per memorizzare i task

  // Funzione per recuperare i task dall'API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Errore nel recupero dei task');
      }
      const data = await response.json();
      setTasks(data); // Aggiorna lo stato con i task recuperati
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  // Funzione per aggiungere un task
  const addTask = async (task) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      // Aggiorna lo stato globale aggiungendo la nuova task
      setTasks((prevTasks) => [...prevTasks, result.task]);

      return result; // Restituisce il risultato per gestire il successo
    } catch (error) {
      console.error('Errore:', error);
      throw error; // Rilancia l'errore per gestirlo nel componente
    }
  };

  // Funzione per rimuovere un task
  const removeTask = async (taskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        {
          method: 'DELETE',
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      // Rimuove il task dallo stato globale
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      return result; // Restituisce il risultato per gestire il successo
    } catch (error) {
      console.error('Errore:', error);
      throw error; // Rilancia l'errore per gestirlo nel componente
    }
  };

  // Funzione per aggiornare un task
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      // Aggiorna lo stato globale con la task modificata
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? result.task : task))
      );

      return result; // Restituisce il risultato per gestire il successo
    } catch (error) {
      console.error('Errore:', error);
      throw error; // Rilancia l'errore per gestirlo nel componente
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
