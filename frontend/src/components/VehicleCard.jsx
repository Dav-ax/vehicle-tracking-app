import React, { useState } from "react";
import UpFillIcon from '../assets/icons/up-fill.svg'; 

export default function VehicleCard({ vehicle, onSelect }) {
  // 1. Estado local para controlar si esta tarjeta específica está expandida
  const [estaExpandido, setEstaExpandido] = useState(false);

  // 2. Función para alternar la expansión sin activar el "onSelect" de la tarjeta padre
  const alternarExpansion = (e) => {
    e.stopPropagation(); // Detiene el clic aquí para que no se ejecute onSelect(vehicle)
    setEstaExpandido(!estaExpandido);
  };

  return (
    <div className="vehicle-content" onClick={() => onSelect(vehicle)}>
      <div className="vehicle-card">
        <div className="vehicle-card-info">
          <div className="vehicle-basic-info">
          <img src='/assets/icons/profile.png' alt={`Foto de ${vehicle.name}`} className="vehicle-photo" />
          <p><strong>Conductor: </strong><br></br>{vehicle.driver}</p>
          <p><strong>Documento: </strong><br></br>{vehicle.document}</p>
          </div>
          {/* 3. Información extra que se muestra solo si estaExpandido es true */}
          {estaExpandido && (
            <div className="vehicle-extra-info" style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #eee" }}>
              <img src='/assets/icons/car-photo.png' alt={`Foto de ${vehicle.name}`} className="vehicle-photo" />
              <p><strong>Placa:</strong><br></br> {vehicle.plate || "No registrada"}</p>
              <p><strong>Ruta:</strong> <br></br>{vehicle.route || "Sin ruta asignada"}</p>
              {/* Puedes agregar aquí los campos adicionales que vengan en tu objeto vehicle */}
              <p><strong>Soat:</strong><br></br> {vehicle.validityPeriod || "No registrada"}</p>
              <p><strong>Revisión técnico-mecánica:</strong> <br></br>{vehicle.validityPeriod || "No registrada"}</p>
            </div>
          )}
        </div>
        <div className="boton-card">
          <button className="boton-card-principal">Seguir este vehículo</button>
          
          {/* 4. El botón ahora controla la expansión y rota visualmente */}
          <button 
            className="boton-card-second" 
           
          >
            <img src={UpFillIcon} alt={estaExpandido ? "Contraer detalles" : "Expandir detalles"}
             onClick={alternarExpansion}
            style={{
              transition: "transform 0.3s ease",
              transform: estaExpandido ? "rotate(180deg)" : "rotate(0deg)"
            }}
            
            
            />
          </button>
        </div>
      </div>
    </div>
  );
}