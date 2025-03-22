import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TaskRow.module.css';

const TaskRow = React.memo(({ task }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'To do':
        return styles.todo;
      case 'Doing':
        return styles.doing;
      case 'Done':
        return styles.done;
      default:
        return '';
    }
  };

  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`} className={styles.taskLink}>
          {task.title}
        </Link>
      </td>
      <td className={getStatusColor(task.status)}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
