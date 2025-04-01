// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa il client di ReactDOM
import App from './App'; // Importa il componente principale App
import './index.css'; // Importa gli stili globali
import { GlobalProvider } from './context/GlobalContext'; // Importa il provider del contesto globale

// Crea il root dell'applicazione
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizza l'applicazione
root.render(
  <React.StrictMode>
    {/* Avvolge l'app con il provider del contesto globale */}
    <GlobalProvider>
      <App /> {/* Componente principale dell'applicazione */}
    </GlobalProvider>
  </React.StrictMode>
);

// Crea il container per i modal quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root'; // ID usato dai componenti Modal per il portal
  document.body.appendChild(modalRoot); // Aggiunge il container al body
});
