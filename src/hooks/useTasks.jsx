import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Errore nel recupero dei task');
      setTasks(await response.json());
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Errore nell'aggiunta del task");
      const result = await response.json();
      setTasks((prevTasks) => [...prevTasks, result.task]);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Errore nella rimozione del task');
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error("Errore nell'aggiornamento del task");
      const result = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? result.task : task))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, addTask, removeTask, updateTask, fetchTasks };
};

export default useTasks;
