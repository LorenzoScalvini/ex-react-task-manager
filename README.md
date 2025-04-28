# Task Manager App - Documentazione Dettagliata

## Tech Stack

<p align="left">
 <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Hero_Icons-000000?style=flat&logo=heroicons&logoColor=white" alt="Hero Icons">
  <img src="https://img.shields.io/badge/REST_API-000000?style=flat&logo=json&logoColor=white" alt="REST API">
  <img src="https://img.shields.io/badge/Context_API-FFFFFF?style=flat&logo=react&logoColor=61DAFB" alt="Context API">
  <img src="https://img.shields.io/badge/Responsive_Design-FF6B6B?style=flat" alt="Responsive Design">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat" alt="MIT License">
</p>

## Panoramica dell'Applicazione

Questa applicazione è un task manager completo sviluppato con React, che consente agli utenti di visualizzare, creare, modificare ed eliminare attività. L'app comunica con un'API REST per la gestione dei dati e utilizza diverse librerie moderne come React Router per la navigazione e Tailwind CSS per lo stile.

## Struttura dell'Applicazione

### Tecnologie utilizzate

- **React** come framework principale
- **React Router** per la gestione delle rotte
- **Context API** per la gestione dello stato globale
- **Tailwind CSS** per lo stile
- **Heroicons** per le icone

### Componenti Principali

1. **App.jsx**: Entry point dell'applicazione che configura le rotte
2. **GlobalContext.jsx**: Contesto globale per la condivisione dei dati tra componenti
3. **useTasks.jsx**: Custom hook per la gestione delle operazioni CRUD sui task
4. **TaskList.jsx**: Lista dei task con funzionalità di ricerca e ordinamento
5. **AddTask.jsx**: Form per la creazione di nuovi task
6. **TaskDetail.jsx**: Visualizzazione dettagliata di un singolo task
7. **EditTaskModal.jsx**: Modal per la modifica di un task esistente
8. **Modal.jsx**: Componente generico per mostrare dialoghi modali

## Analisi del Codice

### Entry Point (main.jsx)

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalProvider } from './context/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
```

Questo file inizializza l'applicazione React:

- Crea un root React nel DOM
- Avvolge l'applicazione con il `GlobalProvider` per fornire lo stato globale
- Renderizza il componente `App` come componente radice

### Gestione dello Stato Globale (GlobalContext.jsx)

```jsx
import { createContext } from 'react';
import useTasks from '../hooks/useTasks';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const taskData = useTasks();

  return (
    <GlobalContext.Provider value={taskData}>{children}</GlobalContext.Provider>
  );
};
```

Questo file:

- Crea un Context React per condividere lo stato tra i componenti
- Utilizza il custom hook `useTasks` per ottenere tutte le funzionalità di gestione dei task
- Fornisce questi dati a tutti i componenti figli attraverso il `Provider`

### Custom Hook per CRUD (useTasks.jsx)

```jsx
import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    // Recupera tutti i task dall'API
  };

  const addTask = async (task) => {
    // Aggiunge un nuovo task all'API
  };

  const removeTask = async (taskId) => {
    // Rimuove un task dall'API
  };

  const updateTask = async (taskId, updatedTask) => {
    // Aggiorna un task esistente nell'API
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, addTask, removeTask, updateTask, fetchTasks };
};

export default useTasks;
```

Questo custom hook:

- Gestisce lo stato locale dei task, del caricamento e degli errori
- Fornisce quattro funzioni per le operazioni CRUD (Create, Read, Update, Delete)
- Utilizza l'URL dell'API dalle variabili d'ambiente
- Esegue automaticamente il caricamento dei task al montaggio del componente
- Aggiorna lo stato locale dopo ogni operazione

Ogni funzione CRUD:

1. Invia una richiesta all'API con il metodo HTTP appropriato
2. Gestisce l'errore se la richiesta fallisce
3. Aggiorna lo stato locale dei task in base alla risposta

### Navigazione dell'App (App.jsx)

```jsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';
import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black">
        <nav className="flex justify-center gap-4 p-4 bg-gray-100 border-b border-gray-300">
          {/* NavLinks per la navigazione */}
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
```

Questo file definisce:

- La struttura di navigazione dell'app con React Router
- La barra di navigazione con link alle pagine principali
- Tre rotte: lista dei task, aggiunta task e dettaglio task
- Uno stile coerente con Tailwind CSS

### Lista dei Task (TaskList.jsx)

```jsx
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

  // Gestione del debounce per la ricerca
  useEffect(() => {
    // Implementazione del debounce
  }, [search]);

  const handleSortClick = (column) => {
    // Gestione dell'ordinamento
  };

  // Filtraggio e ordinamento dei task
  const filteredTasks = tasks.filter(/* logica di filtro */);
  let sortedTasks = [...filteredTasks];
  // Logica di ordinamento...

  // Rendering della lista dei task
};
```

Questo componente gestisce:

1. **Ricerca con debounce**:

   - Memorizza il valore di ricerca in `search`
   - Usa `debouncedSearch` per il filtraggio effettivo
   - Implementa il debounce con un timeout di 300ms
   - Cancella il timeout se l'utente digita nuovamente

2. **Ordinamento**:

   - Memorizza la colonna di ordinamento in `sortBy`
   - Memorizza la direzione di ordinamento in `sortOrder`
   - Inverte la direzione se si clicca sulla stessa colonna
   - Implementa logiche di ordinamento specifiche per ciascuna colonna:
     - Per il titolo: usa `localeCompare`
     - Per lo stato: usa un mapping numerico per l'ordinamento
     - Per la data: converte le stringhe in oggetti Date

3. **Filtraggio**:
   - Filtra i task in base al titolo e alla descrizione
   - Ignora la distinzione tra maiuscole e minuscole
   - Applica il filtro al valore con debounce

### Componente Task Row (TaskRow.jsx)

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TaskRow = React.memo(({ task }) => {
  const statusColors = {
    'To do': 'bg-red-100 text-red-800 border border-red-200',
    Doing: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    Done: 'bg-green-100 text-green-800 border border-green-200',
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
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
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
      </td>

      <td className="p-3 text-gray-700">
        {new Date(task.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
});
```

Questo componente:

- Renderizza una singola riga della tabella task
- Utilizza `React.memo` per ottimizzare le prestazioni
- Mostra il titolo del task come link alla pagina di dettaglio
- Visualizza lo stato con un badge colorato
- Formatta la data di creazione

### Aggiunta di Task (AddTask.jsx)

```jsx
import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To do',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { addTask } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    // Validazione e invio del task
  };

  const handleChange = (e) => {
    // Aggiornamento dello stato del form
  };

  return (
    // Form per l'aggiunta di task
  );
};
```

Questo componente:

- Gestisce il form per la creazione di un nuovo task
- Implementa la validazione del form (il titolo è obbligatorio)
- Mostra gli errori di validazione
- Gestisce lo stato di invio del form
- Resetta il form dopo l'invio riuscito
- Utilizza il metodo `addTask` dal contesto globale

### Dettaglio Task (TaskDetail.jsx)

```jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';
import /* icone */ '@heroicons/react/24/outline';

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, removeTask, updateTask, loading, error } =
    useContext(GlobalContext);
  const [task, setTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Ricerca del task corrispondente all'ID
  }, [id, tasks, navigate]);

  const handleDelete = async () => {
    // Eliminazione del task
  };

  const handleUpdate = async (updatedTask) => {
    // Aggiornamento del task
  };

  // Rendering del dettaglio task
};
```

Questo componente:

- Recupera l'ID del task dai parametri dell'URL
- Trova il task corrispondente nell'array dei task
- Mostra il dettaglio del task con tutte le sue informazioni
- Gestisce l'eliminazione del task tramite un modal di conferma
- Gestisce la modifica del task tramite un modal di modifica
- Reindirizza l'utente alla home se il task non esiste

### Modal di Modifica (EditTaskModal.jsx)

```jsx
import React, { useState } from 'react';
import Modal from './Modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    // Validazione e salvataggio delle modifiche
  };

  return (
    // Modal per la modifica del task
  );
};
```

Questo componente:

- Estende il componente Modal generico
- Inizializza il form con i dati del task esistente
- Implementa la validazione del form (il titolo è obbligatorio)
- Chiama la funzione `onSave` quando il form viene inviato correttamente

### Componente Modal Generico (Modal.jsx)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Modal = ({
  show,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = 'Conferma',
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    // Struttura del modal
    document.getElementById('modal-root')
  );
};
```

Questo componente:

- Crea un portale React per rendere il modal al di fuori della gerarchia DOM normale
- Mostra un overlay semi-trasparente su tutta la pagina
- Implementa la chiusura del modal tramite un pulsante "Annulla"
- Fornisce un pulsante di conferma personalizzabile
- È riutilizzabile per diversi tipi di modali

## Flusso dei Dati

1. **Inizializzazione**:

   - `main.jsx` avvia l'applicazione e configura il `GlobalProvider`
   - `GlobalProvider` utilizza il custom hook `useTasks`
   - `useTasks` effettua la chiamata iniziale all'API per recuperare i task

2. **Operazioni CRUD**:

   - **Create**: `AddTask` → `GlobalContext.addTask` → `useTasks.addTask` → API → aggiornamento stato
   - **Read**: `GlobalContext.tasks` → rendering in `TaskList` e `TaskDetail`
   - **Update**: `EditTaskModal` → `TaskDetail.handleUpdate` → `GlobalContext.updateTask` → `useTasks.updateTask` → API → aggiornamento stato
   - **Delete**: `TaskDetail.handleDelete` → `GlobalContext.removeTask` → `useTasks.removeTask` → API → aggiornamento stato

3. **Ricerca e Ordinamento** (in `TaskList`):
   - Input di ricerca → debounce → filtraggio dei task
   - Click sulle intestazioni della tabella → ordinamento dei task

## Formato dei Dati

L'API restituisce i task nel seguente formato:

```json
[
  {
    "title": "Complete React project task manager",
    "description": "Finish building the landing page using React and Tailwind CSS.",
    "status": "Done",
    "id": 1,
    "createdAt": "2025-03-22T17:10:00.000Z"
  }
  // Altri task...
]
```

Proprietà di ogni task:

- `title`: String - il titolo/nome del task (obbligatorio)
- `description`: String - la descrizione del task (opzionale)
- `status`: String - lo stato del task ('To do', 'Doing', 'Done')
- `id`: Number - l'identificatore univoco del task
- `createdAt`: String - la data di creazione in formato ISO

## Features Avanzate

### Debounce nella Ricerca

```jsx
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
```

La funzione di debounce:

1. Cancella il timeout precedente se esiste
2. Crea un nuovo timeout di 300ms
3. Aggiorna il valore con debounce solo quando l'utente smette di digitare
4. Pulisce il timeout quando il componente si smonta

Questo approccio ottimizza le prestazioni evitando di eseguire il filtraggio ad ogni pressione di tasto.

### Sistema di Ordinamento

```jsx
const handleSortClick = (column) => {
  if (sortBy === column) {
    setSortOrder(sortOrder * -1);
  } else {
    setSortBy(column);
    setSortOrder(1);
  }
};
```

La logica di ordinamento:

1. Verifica se la colonna cliccata è già quella attiva
2. Se è già attiva, inverte la direzione dell'ordinamento
3. Se è una nuova colonna, imposta quella come attiva e la direzione a crescente

L'ordinamento viene poi applicato in base al tipo di dato:

- Per le stringhe (titolo): utilizzo di `localeCompare`
- Per gli stati: utilizzo di un mapping numerico predefinito
- Per le date: conversione in oggetti Date e confronto numerico

## Conclusione

Questa applicazione implementa un sistema completo di gestione dei task con funzionalità CRUD, ricerca, ordinamento e navigazione tra le pagine. Utilizza tecnologie moderne come React, React Router e Tailwind CSS per fornire un'esperienza utente fluida e reattiva.

L'applicazione è strutturata in modo modulare, con un chiaro flusso di dati e responsabilità ben definite per ciascun componente. Le funzionalità avanzate come il debounce nella ricerca e il sistema di ordinamento flessibile migliorano significativamente l'esperienza utente.
