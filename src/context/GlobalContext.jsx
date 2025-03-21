import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Errore nel recupero dei task');
      }
      const data = await response.json();
      setTasks(data);
      console.log('Task recuperati:', data);
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
};
