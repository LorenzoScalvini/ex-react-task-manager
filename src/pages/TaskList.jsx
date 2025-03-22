import React, { useState, useContext, useMemo, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';
import styles from './TaskList.module.css';

const TaskList = () => {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => -prevOrder);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
          case 'status':
            const statusOrder = { 'To do': 1, Doing: 2, Done: 3 };
            comparison = statusOrder[a.status] - statusOrder[b.status];
            break;
          case 'createdAt':
            comparison =
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
          default:
            break;
        }

        return comparison * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  const debounce = useCallback((func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);

  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  return (
    <div className={styles.container}>
      <h1>Lista dei Task</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Cerca per nome..."
          onChange={(e) => handleSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Nome</th>
            <th onClick={() => handleSort('status')}>Stato</th>
            <th onClick={() => handleSort('createdAt')}>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>

      <div className={styles.instructions}>
        <h3>Come ordinare i task:</h3>
        <ul>
          <li>
            <strong>Clicca su "Nome"</strong> per ordinare i task in ordine
            alfabetico <strong>crescente</strong> o <strong>decrescente</strong>
            .
          </li>
          <li>
            <strong>Clicca su "Stato"</strong> per ordinare i task in base allo
            stato: <strong>"To do"</strong> → <strong>"Doing"</strong> →{' '}
            <strong>"Done"</strong>.
          </li>
          <li>
            <strong>Clicca su "Data di Creazione"</strong> per ordinare i task
            in base alla data, dalla <strong>più recente</strong> alla{' '}
            <strong>meno recente</strong> o viceversa.
          </li>
        </ul>
        <p>
          <em>
            Suggerimento: Clicca di nuovo sulla stessa intestazione per
            invertire l'ordine.
          </em>
        </p>
      </div>
    </div>
  );
};

export default TaskList;
