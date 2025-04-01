import { createContext } from 'react';
import useTasks from '../hooks/useTasks';

// Crea un contesto globale usando createContext()
// Questo sarà il contenitore per lo stato condiviso nell'applicazione
export const GlobalContext = createContext();

// Componente GlobalProvider che funge da provider per il contesto
// Accetta children come prop, che saranno i componenti figli che avranno accesso al contesto
export const GlobalProvider = ({ children }) => {
  // Utilizza il custom hook useTasks per ottenere:
  // - tasks (lista dei task)
  // - loading (stato di caricamento)
  // - error (eventuali errori)
  // - funzioni CRUD (addTask, removeTask, updateTask, fetchTasks)
  const taskData = useTasks();

  // Ritorna il Provider del contesto con il valore taskData
  // Tutti i componenti figli (children) avranno accesso a questi valori
  return (
    <GlobalContext.Provider value={taskData}>{children}</GlobalContext.Provider>
  );
};
