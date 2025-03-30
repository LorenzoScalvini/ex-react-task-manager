import { useState, useEffect } from 'react';

// URL dell'API
const API_URL = import.meta.env.VITE_API_URL; // Usa import.meta.env per Vite

const useTasks = () => {
  const [tasks, setTasks] = useState([]); // Stato per memorizzare i task

  // Funzione per recuperare i task dall'API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`); // Facciamo una richiesta GET all'API
      const data = await response.json(); // Convertiamo la risposta in JSON
      setTasks(data); // Aggiorniamo lo stato con i task recuperati
    } catch (error) {
      console.error('Errore nel recupero dei task:', error); // Mostriamo un errore in caso di problemi
    }
  };

  // Funzione per aggiungere un task
  const addTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST', // Facciamo una richiesta POST per aggiungere un task
        headers: {
          'Content-Type': 'application/json', // Indichiamo che stiamo inviando dati in formato JSON
        },
        body: JSON.stringify(task), // Inviamo i dati del nuovo task
      });
      const result = await response.json(); // Convertiamo la risposta in JSON
      setTasks((prevTasks) => [...prevTasks, result.task]); // Aggiungiamo il nuovo task allo stato
    } catch (error) {
      console.error("Errore nell'aggiunta del task:", error); // Mostriamo un errore in caso di problemi
    }
  };

  // Funzione per rimuovere un task
  const removeTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE', // Facciamo una richiesta DELETE per rimuovere un task
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Rimuoviamo il task dallo stato
    } catch (error) {
      console.error('Errore nella rimozione del task:', error); // Mostriamo un errore in caso di problemi
    }
  };

  // Funzione per aggiornare un task
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT', // Facciamo una richiesta PUT per aggiornare un task
        headers: {
          'Content-Type': 'application/json', // Indichiamo che stiamo inviando dati in formato JSON
        },
        body: JSON.stringify(updatedTask), // Inviamo i dati aggiornati del task
      });
      const result = await response.json(); // Convertiamo la risposta in JSON
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? result.task : task))
      ); // Aggiorniamo il task nello stato
    } catch (error) {
      console.error("Errore nell'aggiornamento del task:", error); // Mostriamo un errore in caso di problemi
    }
  };

  // Effetto per recuperare i task al caricamento del componente
  useEffect(() => {
    fetchTasks(); // Recuperiamo i task quando il componente viene montato
  }, []);

  return {
    tasks, // Stato dei task
    addTask, // Funzione per aggiungere un task
    removeTask, // Funzione per rimuovere un task
    updateTask, // Funzione per aggiornare un task
  };
};

export default useTasks; // Esportiamo il custom hook per usarlo in altri componenti
