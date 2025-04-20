import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';
import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black">
        <nav className="flex justify-center gap-4 p-4 bg-gray-100 border-b border-gray-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-black font-medium border border-gray-300'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <HomeIcon className="h-5 w-5" />
            Lista Task
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-black font-medium border border-gray-300'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <PlusIcon className="h-5 w-5" />
            Aggiungi Task
          </NavLink>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
