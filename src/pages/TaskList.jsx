import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const TaskList = () => {
  // Estrae i dati dal contesto globale:
  const { tasks, loading, error } = useContext(GlobalContext);

  // Stato per la barra di ricerca:
  const [search, setSearch] = React.useState('');

  // Filtra i task in base al testo di ricerca:
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) || // Cerca nel titolo
      task.description?.toLowerCase().includes(search.toLowerCase()) // Cerca nella descrizione
  );

  // Mostra stato di caricamento:
  if (loading)
    return <div className="text-center py-8 text-gray-600">Caricamento...</div>;

  // Mostra eventuali errori:
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
        {/* Icona lente di ingrandimento (posizione assoluta) */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>

        {/* Input di ricerca */}
        <input
          type="text"
          placeholder="Cerca task per titolo o descrizione..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Aggiorna lo stato al cambiamento
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Tabella dei task */}
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="w-full">
          {/* Intestazione della tabella */}
          <thead className="bg-gray-100">
            <tr>
              {/* Colonne: Nome, Stato, Data Creazione */}
              <th className="p-4 text-left text-black font-medium">Nome</th>
              <th className="p-4 text-left text-black font-medium">Stato</th>
              <th className="p-4 text-left text-black font-medium">
                Data Creazione
              </th>
            </tr>
          </thead>

          {/* Corpo della tabella */}
          <tbody className="divide-y divide-gray-300">
            {filteredTasks.length > 0 ? (
              // Se ci sono task filtrati, mostra una riga per ogni task
              filteredTasks.map((task) => (
                <TaskRow key={task.id} task={task} /> // Usa TaskRow per ogni elemento
              ))
            ) : (
              // Se non ci sono task, mostra messaggio
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
