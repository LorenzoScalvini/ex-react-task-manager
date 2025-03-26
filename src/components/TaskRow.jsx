import React from 'react';
import { Link } from 'react-router-dom';

const TaskRow = React.memo(({ task }) => {
  const statusColors = {
    'To do': 'bg-red-100 text-red-800',
    Doing: 'bg-yellow-100 text-yellow-800',
    Done: 'bg-green-100 text-green-800',
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-3">
        <Link
          to={`/task/${task.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          {task.title}
        </Link>
      </td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
      </td>
      <td className="p-3">{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
