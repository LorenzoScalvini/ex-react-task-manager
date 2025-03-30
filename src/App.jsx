import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';
import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navigation */}
        <nav className="flex justify-center gap-4 p-4 bg-gray-800 border-b border-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-gray-300 hover:bg-gray-700'
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
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <PlusIcon className="h-5 w-5" />
            Aggiungi Task
          </NavLink>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
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
