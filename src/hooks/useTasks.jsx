import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Errore nel recupero dei task');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Errore:', error);
    }
  };

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

      setTasks((prevTasks) => [...prevTasks, result.task]);

      return result;
    } catch (error) {
      console.error('Errore:', error);
      throw error;
    }
  };

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

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      return result;
    } catch (error) {
      console.error('Errore:', error);
      throw error;
    }
  };

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

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? result.task : task))
      );

      return result;
    } catch (error) {
      console.error('Errore:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
  };
};

export default useTasks;
