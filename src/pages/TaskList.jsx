import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const TaskList = () => {
  const { tasks, loading, error } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    setSearchTimeout(timeoutId);

    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [search]);

  const handleSortClick = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      task.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  let sortedTasks = [...filteredTasks];
  if (sortBy === 'title') {
    sortedTasks.sort((a, b) => {
      return a.title.localeCompare(b.title) * sortOrder;
    });
  } else if (sortBy === 'status') {
    const statusValues = {
      'To do': 1,
      Doing: 2,
      Done: 3,
    };
    sortedTasks.sort((a, b) => {
      return (statusValues[a.status] - statusValues[b.status]) * sortOrder;
    });
  } else if (sortBy === 'createdAt') {
    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return (dateA - dateB) * sortOrder;
    });
  }

  if (loading)
    return <div className="text-center py-8 text-gray-600">Caricamento...</div>;

  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="space-y-4 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Lista Task
      </h1>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Cerca task per titolo o descrizione..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="p-4 text-left text-black font-medium cursor-pointer"
                onClick={() => handleSortClick('title')}
              >
                Nome {sortBy === 'title' && (sortOrder === 1 ? '▲' : '▼')}
              </th>
              <th
                className="p-4 text-left text-black font-medium cursor-pointer"
                onClick={() => handleSortClick('status')}
              >
                Stato {sortBy === 'status' && (sortOrder === 1 ? '▲' : '▼')}
              </th>
              <th
                className="p-4 text-left text-black font-medium cursor-pointer"
                onClick={() => handleSortClick('createdAt')}
              >
                Data Creazione{' '}
                {sortBy === 'createdAt' && (sortOrder === 1 ? '▲' : '▼')}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task) => <TaskRow key={task.id} task={task} />)
            ) : (
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
