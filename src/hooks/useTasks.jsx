import { useState, useEffect } from 'react';
// Importa l'URL dell'API dalle variabili d'ambiente
const API_URL = import.meta.env.VITE_API_URL;

const useTasks = () => {
  // Stato per memorizzare i task
  const [tasks, setTasks] = useState([]);
  // Stato per indicare se i dati sono in fase di caricamento
  const [loading, setLoading] = useState(true);
  // Stato per gestire eventuali errori
  const [error, setError] = useState(null);

  // Funzione per recuperare i task dal server
  const fetchTasks = async () => {
    try {
      setLoading(true); // Imposta lo stato di caricamento a true
      const response = await fetch(`${API_URL}/tasks`); // Effettua una richiesta GET all'API
      if (!response.ok) throw new Error('Errore nel recupero dei task'); // Gestisce errori di risposta
      setTasks(await response.json()); // Aggiorna lo stato con i task ricevuti
      setError(null); // Resetta eventuali errori precedenti
    } catch (error) {
      setError(error.message); // Memorizza il messaggio di errore
    } finally {
      setLoading(false); // Imposta lo stato di caricamento a false
    }
  };

  // Funzione per aggiungere un nuovo task
  const addTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST', // Metodo HTTP POST per creare un nuovo task
        headers: { 'Content-Type': 'application/json' }, // Specifica il tipo di contenuto
        body: JSON.stringify(task), // Converte il task in formato JSON
      });
      if (!response.ok) throw new Error("Errore nell'aggiunta del task"); // Gestisce errori di risposta
      const result = await response.json(); // Ottiene il task creato dal server
      setTasks((prevTasks) => [...prevTasks, result.task]); // Aggiunge il nuovo task alla lista esistente
    } catch (error) {
      setError(error.message); // Memorizza il messaggio di errore
    }
  };

  // Funzione per rimuovere un task
  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE', // Metodo HTTP DELETE per eliminare un task
      });
      if (!response.ok) throw new Error('Errore nella rimozione del task'); // Gestisce errori di risposta
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Rimuove il task dalla lista
    } catch (error) {
      setError(error.message); // Memorizza il messaggio di errore
    }
  };

  // Funzione per aggiornare un task esistente
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT', // Metodo HTTP PUT per aggiornare un task
        headers: { 'Content-Type': 'application/json' }, // Specifica il tipo di contenuto
        body: JSON.stringify(updatedTask), // Converte il task aggiornato in formato JSON
      });
      if (!response.ok) throw new Error("Errore nell'aggiornamento del task"); // Gestisce errori di risposta
      const result = await response.json(); // Ottiene il task aggiornato dal server
      setTasks(
        (prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? result.task : task)) // Aggiorna il task nella lista
      );
    } catch (error) {
      setError(error.message); // Memorizza il messaggio di errore
    }
  };

  // Effettua il recupero dei task al montaggio del componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Ritorna i dati e le funzioni per gestire i task
  return { tasks, loading, error, addTask, removeTask, updateTask, fetchTasks };
};

export default useTasks;
