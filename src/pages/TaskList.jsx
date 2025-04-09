import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const TaskList = () => {
  // Estrae i dati dal contesto globale, inclusi i task, lo stato di caricamento e gli eventuali errori
  const { tasks, loading, error } = useContext(GlobalContext);

  // Stato per il valore della barra di ricerca
  const [search, setSearch] = useState('');
  // Stato per il valore della ricerca con debounce (ritardo per evitare troppi aggiornamenti)
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Stato per il criterio di ordinamento (es. titolo, stato, data di creazione)
  const [sortBy, setSortBy] = useState('createdAt'); // Default: ordina per data di creazione
  // Stato per la direzione dell'ordinamento (1 = crescente, -1 = decrescente)
  const [sortOrder, setSortOrder] = useState(1);

  // Stato per il riferimento al timer del debounce
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Effetto per gestire il debounce della barra di ricerca
  useEffect(() => {
    // Cancella il timer precedente se esiste
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Imposta un nuovo timer per aggiornare il valore del debounce
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // Ritardo di 300ms

    // Salva il riferimento al timer
    setSearchTimeout(timeoutId);

    // Pulizia: cancella il timer quando il componente viene smontato
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [search]); // Esegui l'effetto ogni volta che cambia il valore di `search`

  // Funzione per gestire il click sulle intestazioni della tabella per l'ordinamento
  const handleSortClick = (column) => {
    // Se la colonna cliccata è già il criterio di ordinamento, inverte la direzione
    if (sortBy === column) {
      setSortOrder(sortOrder * -1);
    } else {
      // Altrimenti, imposta la nuova colonna come criterio di ordinamento e resetta la direzione
      setSortBy(column);
      setSortOrder(1);
    }
  };

  // Filtra i task in base al valore della barra di ricerca (titolo o descrizione)
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || // Controlla se il titolo contiene il testo cercato
      task.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) // Controlla se la descrizione contiene il testo cercato
  );

  // Ordina i task filtrati in base al criterio e alla direzione selezionati
  let sortedTasks = [...filteredTasks];
  if (sortBy === 'title') {
    // Ordinamento alfabetico per titolo
    sortedTasks.sort((a, b) => {
      return a.title.localeCompare(b.title) * sortOrder;
    });
  } else if (sortBy === 'status') {
    // Ordinamento per stato (definito da un ordine specifico)
    const statusValues = {
      'To do': 1,
      Doing: 2,
      Done: 3,
    };
    sortedTasks.sort((a, b) => {
      return (statusValues[a.status] - statusValues[b.status]) * sortOrder;
    });
  } else if (sortBy === 'createdAt') {
    // Ordinamento per data di creazione
    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return (dateA - dateB) * sortOrder;
    });
  }

  // Ritorna un messaggio di caricamento se i dati sono ancora in fase di caricamento
  if (loading)
    return <div className="text-center py-8 text-gray-600">Caricamento...</div>;

  // Ritorna un messaggio di errore se c'è stato un problema nel caricamento dei dati
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="space-y-4 max-w-6xl mx-auto px-4">
      {/* Titolo della pagina */}
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Lista Task
      </h1>

      {/* Barra di ricerca */}
      <div className="relative">
        {/* Icona della lente di ingrandimento */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        {/* Input per la ricerca */}
        <input
          type="text"
          placeholder="Cerca task per titolo o descrizione..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Tabella dei task */}
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="w-full">
          {/* Intestazione della tabella */}
          <thead className="bg-gray-100">
            <tr>
              {/* Colonna per il titolo, cliccabile per ordinamento */}
              <th
                className="p-4 text-left text-black font-medium cursor-pointer"
                onClick={() => handleSortClick('title')}
              >
                Nome {sortBy === 'title' && (sortOrder === 1 ? '▲' : '▼')}
              </th>
              {/* Colonna per lo stato, cliccabile per ordinamento */}
              <th
                className="p-4 text-left text-black font-medium cursor-pointer"
                onClick={() => handleSortClick('status')}
              >
                Stato {sortBy === 'status' && (sortOrder === 1 ? '▲' : '▼')}
              </th>
              {/* Colonna per la data di creazione, cliccabile per ordinamento */}
              <th
                className="p-4 text-left text-black font-medium cursor-pointer"
                onClick={() => handleSortClick('createdAt')}
              >
                Data Creazione{' '}
                {sortBy === 'createdAt' && (sortOrder === 1 ? '▲' : '▼')}
              </th>
            </tr>
          </thead>

          {/* Corpo della tabella */}
          <tbody className="divide-y divide-gray-300">
            {sortedTasks.length > 0 ? (
              // Mostra una riga per ogni task filtrato e ordinato
              sortedTasks.map((task) => <TaskRow key={task.id} task={task} />)
            ) : (
              // Mostra un messaggio se non ci sono task da visualizzare
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-600">
                  Nessun task trovato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
