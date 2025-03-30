// TaskList.jsx
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';
import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

const TaskList = () => {
  const { tasks, loading, error } = useContext(GlobalContext);
  const [sortBy, setSortBy] = React.useState('createdAt');
  const [sortOrder, setSortOrder] = React.useState(-1);
  const [search, setSearch] = React.useState('');

  const sortedTasks = React.useMemo(() => {
    return [...tasks]
      .filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title) * sortOrder;
        }
        if (sortBy === 'status') {
          const order = { 'To do': 1, Doing: 2, Done: 3 };
          return (order[a.status] - order[b.status]) * sortOrder;
        }
        return (new Date(a.createdAt) - new Date(b.createdAt)) * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, search]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(-sortOrder);
    } else {
      setSortBy(column);
      setSortOrder(column === 'createdAt' ? -1 : 1);
    }
  };

  const SortIcon = ({ column }) =>
    sortBy === column ? (
      sortOrder > 0 ? (
        <ArrowUpIcon className="h-4 w-4 ml-1 inline text-black" />
      ) : (
        <ArrowDownIcon className="h-4 w-4 ml-1 inline text-black" />
      )
    ) : null;

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
                onClick={() => handleSort('title')}
                className="p-4 text-left text-black font-medium cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  Nome
                  <SortIcon column="title" />
                </div>
              </th>
              <th
                onClick={() => handleSort('status')}
                className="p-4 text-left text-black font-medium cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  Stato
                  <SortIcon column="status" />
                </div>
              </th>
              <th
                onClick={() => handleSort('createdAt')}
                className="p-4 text-left text-black font-medium cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  Data Creazione
                  <SortIcon column="createdAt" />
                </div>
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
