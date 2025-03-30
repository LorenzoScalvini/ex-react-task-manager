import React from 'react';
import { Link } from 'react-router-dom';

const TaskRow = React.memo(({ task }) => {
  // Dark mode status colors
  const statusColors = {
    'To do': 'bg-red-900/30 text-red-300 border border-red-800',
    Doing: 'bg-yellow-900/30 text-yellow-300 border border-yellow-800',
    Done: 'bg-green-900/30 text-green-300 border border-green-800',
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
      {/* Task Title */}
      <td className="p-3">
        <Link
          to={`/task/${task.id}`}
          className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
        >
          {task.title}
        </Link>
      </td>

      {/* Task Status */}
      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
      </td>

      {/* Creation Date */}
      <td className="p-3 text-gray-300">
        {new Date(task.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
});

export default TaskRow;
