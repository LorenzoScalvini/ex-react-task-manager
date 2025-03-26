import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-center gap-4 p-4 bg-gray-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-all ${
              isActive
                ? 'bg-blue-100 text-blue-600 font-medium'
                : 'hover:bg-gray-100'
            }`
          }
        >
          Lista Task
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-all ${
              isActive
                ? 'bg-blue-100 text-blue-600 font-medium'
                : 'hover:bg-gray-100'
            }`
          }
        >
          Aggiungi Task
        </NavLink>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
