import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';

const TaskList = () => {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = React.useState('createdAt');
  const [sortOrder, setSortOrder] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'title')
          return a.title.localeCompare(b.title) * sortOrder;
        if (sortBy === 'status') {
          const order = { 'To do': 1, Doing: 2, Done: 3 };
          return (order[a.status] - order[b.status]) * sortOrder;
        }
        return (new Date(a.createdAt) - new Date(b.createdAt)) * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, search]);

  const handleSort = (column) => {
    if (sortBy === column) setSortOrder(-sortOrder);
    else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Lista Task</h1>

      <input
        type="text"
        placeholder="Cerca task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th
                onClick={() => handleSort('title')}
                className="p-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Nome {sortBy === 'title' && (sortOrder > 0 ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('status')}
                className="p-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Stato {sortBy === 'status' && (sortOrder > 0 ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('createdAt')}
                className="p-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Data {sortBy === 'createdAt' && (sortOrder > 0 ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
