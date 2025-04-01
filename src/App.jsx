import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';
import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';

// Componente principale App
function App() {
  return (
    // Configura il router per l'applicazione
    <BrowserRouter>
      {/* Contenitore principale con stile minimo */}
      <div className="min-h-screen bg-white text-black">
        {/* Barra di navigazione */}
        <nav className="flex justify-center gap-4 p-4 bg-gray-100 border-b border-gray-300">
          {/* Link alla pagina principale (TaskList) */}
          <NavLink
            to="/" // Destinazione del link
            className={(
              { isActive } // Funzione che riceve lo stato "active" del link
            ) =>
              `px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-black font-medium border border-gray-300' // Stile quando attivo
                  : 'text-gray-700 hover:bg-gray-200' // Stile quando inattivo
              }`
            }
          >
            <HomeIcon className="h-5 w-5" /> {/* Icona della home */}
            Lista Task {/* Testo del link */}
          </NavLink>

          {/* Link alla pagina di aggiunta task */}
          <NavLink
            to="/add" // Destinazione del link
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-black font-medium border border-gray-300'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <PlusIcon className="h-5 w-5" /> {/* Icona "plus" */}
            Aggiungi Task {/* Testo del link */}
          </NavLink>
        </nav>

        {/* Contenuto principale dell'applicazione */}
        <main className="container mx-auto px-4 py-8">
          {/* Sistema di routing */}
          <Routes>
            {/* Route per la pagina principale (lista task) */}
            <Route path="/" element={<TaskList />} />
            {/* Route per la pagina di aggiunta task */}
            <Route path="/add" element={<AddTask />} />
            {/* Route per la pagina di dettaglio task (con parametro ID) */}
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
