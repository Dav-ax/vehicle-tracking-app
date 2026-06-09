import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';   // estilos globales
import './App.css';
import './styles.css';
import App from './App'; // componente principal

// Renderiza el componente App dentro del div "root" de public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
