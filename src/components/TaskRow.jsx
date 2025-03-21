import React from 'react';
import styles from './TaskRow.module.css';

const TaskRow = React.memo(({ task }) => {
  // Funzione per assegnare il colore in base allo stato
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
      <td>{task.title}</td>
      <td className={getStatusColor(task.status)}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
