import { createContext } from 'react';
import useTasks from '../hooks/useTasks';

// Creazione del contesto
export const GlobalContext = createContext();

// Provider del contesto
export const GlobalProvider = ({ children }) => {
  const { tasks, addTask, removeTask, updateTask } = useTasks();

  return (
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  );
};
