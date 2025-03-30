import { createContext } from 'react'; // Importiamo createContext per creare un contesto globale
import useTasks from '../hooks/useTasks'; // Importiamo il custom hook per gestire i task

// Creiamo il contesto globale
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Usiamo il custom hook per ottenere i task e le funzioni per gestirli
  const { tasks, addTask, removeTask, updateTask } = useTasks();

  return (
    // Forniamo il contesto globale ai componenti figli
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children} {/* Renderizziamo i componenti figli */}
    </GlobalContext.Provider>
  );
};
