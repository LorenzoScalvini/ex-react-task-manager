import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-center space-x-4 p-4 bg-gray-100">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${
              isActive
                ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-400'
            } 
            transition-colors duration-300`
          }
        >
          Lista Task
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${
              isActive
                ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-400'
            } 
            transition-colors duration-300`
          }
        >
          Aggiungi Task
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
