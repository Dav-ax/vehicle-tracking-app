import React from "react";
import "../App.css"; // estilos específicos del header

export default function Header() {
  return (
    <header className="app-header">
      {/* Menú hamburguesa */}
      <div className="menu-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Logo */}
      <div className="logo">
        <img src="/assets/icons/logo.png" alt="Logo Transporte" />
      </div>

      {/* Perfil de usuario */}
      <div className="profile-card">
        <div className="profile-content">
           <div className="profile-photo">
              <img
              src="/assets/icons/profile.png"
              alt="Foto de usuario"
              />
            </div>
            <div className="profile-info">
            <strong>Diana Cardenas</strong>
            <span className="f1">Transporte S.A.S</span>
            <span className="f2">Gestora de envíos</span>
            </div>
        </div>
      </div>
    </header>
  );
}