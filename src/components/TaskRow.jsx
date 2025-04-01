import React from 'react';
import { Link } from 'react-router-dom';

// Componente TaskRow che rappresenta una riga della tabella dei task
// React.memo memorizza il componente per evitare renderizzazioni non necessarie
const TaskRow = React.memo(({ task }) => {
  // Oggetto che mappa gli stati dei task ai rispettivi colori Tailwind CSS
  const statusColors = {
    'To do': 'bg-red-100 text-red-800 border border-red-200', // Stile per "Da fare"
    Doing: 'bg-yellow-100 text-yellow-800 border border-yellow-200', // Stile per "In corso"
    Done: 'bg-green-100 text-green-800 border border-green-200', // Stile per "Completato"
  };

  return (
    // Riga della tabella con stili di base
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Colonna Titolo */}
      <td className="p-3">
        {/* Link alla pagina di dettaglio del task */}
        <Link
          to={`/task/${task.id}`} // URL con l'ID del task
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          {task.title} {/* Mostra il titolo del task */}
        </Link>
      </td>

      {/* Colonna Stato */}
      <td className="p-3">
        {/* Badge dello stato con colore dinamico in base allo status */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[task.status] // Applica la classe CSS in base allo stato
          }`}
        >
          {task.status} {/* Mostra lo stato del task */}
        </span>
      </td>

      {/* Colonna Data di creazione */}
      <td className="p-3 text-gray-700">
        {/* Formatta la data in formato locale */}
        {new Date(task.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
});

export default TaskRow;
