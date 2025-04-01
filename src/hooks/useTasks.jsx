import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

// Definisce un custom hook chiamato useTasks
const useTasks = () => {
  // Stati gestiti dall'hook:
  const [tasks, setTasks] = useState([]); // Stato per memorizzare l'array dei task
  const [loading, setLoading] = useState(true); // Stato per gestire lo stato di caricamento
  const [error, setError] = useState(null); // Stato per gestire eventuali errori

  // Funzione asincrona per recuperare i task dall'API
  const fetchTasks = async () => {
    try {
      setLoading(true); // Imposta lo stato di caricamento a true
      const response = await fetch(`${API_URL}/tasks`); // Effettua la richiesta GET all'API
      if (!response.ok) throw new Error('Errore nel recupero dei task'); // Se la risposta non è ok, lancia un errore
      const data = await response.json(); // Converte la risposta in JSON
      setTasks(data); // Aggiorna lo stato dei task con i dati ricevuti
      setError(null); // Resetta lo stato degli errori
    } catch (error) {
      setError(error.message); // In caso di errore, imposta il messaggio di errore
    } finally {
      setLoading(false); // In ogni caso, imposta il caricamento a false
    }
  };

  // Funzione per aggiungere un nuovo task
  const addTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST', // Metodo HTTP POST
        headers: { 'Content-Type': 'application/json' }, // Specifica il tipo di contenuto
        body: JSON.stringify(task), // Converte l'oggetto task in JSON
      });
      if (!response.ok) throw new Error("Errore nell'aggiunta del task");
      const result = await response.json(); // Converte la risposta in JSON
      // Aggiunge il nuovo task alla lista esistente
      setTasks((prevTasks) => [...prevTasks, result.task]);
      return { success: true }; // Ritorna un oggetto con successo true
    } catch (error) {
      return { success: false, error: error.message }; // Ritorna un oggetto con l'errore
    }
  };

  // Funzione per rimuovere un task
  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE', // Metodo HTTP DELETE
      });
      if (!response.ok) throw new Error('Errore nella rimozione del task');
      // Filtra i task rimuovendo quello con l'ID specificato
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Funzione per aggiornare un task esistente
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT', // Metodo HTTP PUT
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask), // Invia i dati aggiornati
      });
      if (!response.ok) throw new Error("Errore nell'aggiornamento del task");
      const result = await response.json();
      // Aggiorna il task specifico mantenendo gli altri invariati
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? result.task : task))
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Effetto che viene eseguito al montaggio del componente
  useEffect(() => {
    fetchTasks(); // Chiama fetchTasks quando il componente viene montato
  }, []); // L'array vuoto come dipendenza significa che viene eseguito solo una volta

  // Ritorna un oggetto con tutti gli stati e le funzioni esposte
  return {
    tasks, // Lista dei task
    loading, // Stato di caricamento
    error, // Eventuale errore
    addTask, // Funzione per aggiungere task
    removeTask, // Funzione per rimuovere task
    updateTask, // Funzione per aggiornare task
    fetchTasks, // Funzione per ricaricare i task
  };
};

export default useTasks;
