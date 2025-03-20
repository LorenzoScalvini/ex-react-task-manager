import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import styles from './App.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Lista Task
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Aggiungi Task
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}
