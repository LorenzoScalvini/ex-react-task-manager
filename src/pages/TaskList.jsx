import React, { useState, useContext, useMemo, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';
import styles from './TaskList.module.css';

const TaskList = () => {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState('createdAt'); // Criterio di ordinamento
  const [sortOrder, setSortOrder] = useState(1); // Direzione di ordinamento (1 = crescente, -1 = decrescente)
  const [searchQuery, setSearchQuery] = useState(''); // Stato per la query di ricerca

  // Funzione per gestire il click sulle intestazioni della tabella
  const handleSort = (column) => {
    if (sortBy === column) {
      // Se la colonna è già selezionata, inverte l'ordine
      setSortOrder((prevOrder) => -prevOrder);
    } else {
      // Se la colonna è diversa, imposta il nuovo criterio e l'ordine crescente
      setSortBy(column);
      setSortOrder(1);
    }
  };

  // Logica di ordinamento e filtraggio
  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter(
        (task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filtra i task in base alla query
      )
      .sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
          case 'status':
            // Ordine predefinito: "To do" < "Doing" < "Done"
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

        return comparison * sortOrder; // Applica l'ordine crescente o decrescente
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  // Funzione di debounce per ritardare l'aggiornamento di searchQuery
  const debounce = useCallback((func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Funzione per gestire il cambio di valore dell'input di ricerca
  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  return (
    <div className={styles.container}>
      <h1>Lista dei Task</h1>

      {/* Input di ricerca */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Cerca per nome..."
          onChange={(e) => handleSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Tabella dei task */}
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

      {/* Istruzioni per l'ordinamento */}
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
