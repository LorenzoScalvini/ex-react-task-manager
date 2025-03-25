# 📌 Task Manager App

Un'applicazione per la gestione delle task, sviluppata con **React, Vite, React Router e Context API**.
L'app permette di creare, visualizzare, modificare ed eliminare task, con funzionalità di **ordinamento, ricerca** e **memorizzazione** dei dati nel browser (_localStorage/sessionStorage_).

---

## 📖 Indice

- [🔍 Panoramica](#-panoramica)
- [✨ Funzionalità](#-funzionalità)
- [🛠️ Installazione](#️-installazione)
- [📁 Struttura del Progetto](#-struttura-del-progetto)
- [💻 Esempi di Codice](#-esempi-di-codice)
- [🌐 API](#-api)
- [🤝 Contribuire](#-contribuire)

---

## 🔍 Panoramica

Questa applicazione è un **task manager** che permette agli utenti di:

✅ **Visualizzare** un elenco di task.  
➕ **Aggiungere** nuove task.  
✏️ **Modificare** task esistenti.  
🗑️ **Eliminare** task.  
📌 **Ordinare** le task per nome, stato o data.  
🔍 **Cercare** task per nome.  
💾 **Memorizzare** le task nel browser per persistenza dei dati.

Il progetto utilizza **React** per la UI, **Vite** come bundler, **React Router** per la navigazione e **Context API** per la gestione dello stato globale.

---

## ✨ Funzionalità

- **📋 Visualizzazione delle task**
- **📝 Aggiunta di task** tramite form
- **✏️ Modifica di task** esistenti
- **🗑️ Eliminazione delle task** con conferma tramite modale
- **📌 Ordinamento** per nome, stato o data
- **🔍 Ricerca** con debounce per ottimizzazione
- **💾 Persistenza dei dati** su localStorage/sessionStorage

---

## 🛠️ Installazione

Clona il repository:

```bash
git clone https://github.com/tuo-username/task-manager-app.git
```

Installa le dipendenze:

```bash
cd task-manager-app
npm install
```

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri il browser e vai a:

```
http://localhost:5173
```

---

## 📁 Struttura del Progetto

```
task-manager-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Modal.jsx
│   │   ├── EditTaskModal.jsx
│   │   ├── TaskRow.jsx
│   ├── context/
│   │   ├── GlobalContext.jsx
│   ├── hooks/
│   │   ├── useTasks.js
│   ├── pages/
│   │   ├── TaskList.jsx
│   │   ├── TaskDetail.jsx
│   │   ├── AddTask.jsx
│   ├── App.jsx
│   ├── main.jsx
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Esempi di Codice

### 🔹 Gestione dello Stato con `useTasks`

```javascript
// src/hooks/useTasks.js
import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, setTasks };
};

export default useTasks;
```

### 🔹 Componente `TaskList`

```jsx
// src/pages/TaskList.jsx
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';
import styles from './TaskList.module.css';

const TaskList = () => {
  const { tasks } = useContext(GlobalContext);

  return (
    <div className={styles.container}>
      <h1>Lista dei Task</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
```

---

## 🌐 API

L'app si interfaccia con un backend con le seguenti API:

🔹 `GET /tasks` - Recupera l'elenco delle task  
🔹 `POST /tasks` - Aggiunge una nuova task  
🔹 `PUT /tasks/:id` - Modifica una task esistente  
🔹 `DELETE /tasks/:id` - Elimina una task

---

## 🤝 Contribuire

1️⃣ Fai un **fork** del repository  
2️⃣ Crea un **branch** per la tua feature:

```bash
git checkout -b feature/nuova-feature
```

3️⃣ Fai **commit** delle tue modifiche:

```bash
git commit -m "Aggiunta nuova feature"
```

4️⃣ Pusha il branch:

```bash
git push origin feature/nuova-feature
```

5️⃣ Apri una **pull request** 🚀

---
