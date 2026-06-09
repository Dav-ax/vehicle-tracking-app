import React from "react";
import errorIcon from '../assets/icons/error-16.svg';
import Header from "./Header";
export default function ErrorScreen({ onReload }) {
  return (
    
    <div className="error-container">
      <Header />
      <div className="error-menssage">
        <img className="error-icon" src={errorIcon} alt="Icono para recargar" />
        <h2>Ocurrió un error</h2>
        <h3>Hay un fallo en el proceso de cargar esta pantalla</h3>
     </div>
      <div className="error-container-cta">
      <p>No te preocupes, recarga la pantalla nuevamente.</p>
      <button  onClick={onReload}>
          Recargar la pantalla
      </button>
      </div>
    </div>
    
  );
}

