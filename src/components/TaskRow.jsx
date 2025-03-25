import React from 'react';
import { Link } from 'react-router-dom';

const TaskRow = React.memo(({ task }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'To do':
        return 'bg-red-100 text-red-800';
      case 'Doing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-2">
        <Link
          to={`/task/${task.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          {task.title}
        </Link>
      </td>
      <td className={`p-2 ${getStatusColor(task.status)} rounded-md`}>
        {task.status}
      </td>
      <td className="p-2">{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
