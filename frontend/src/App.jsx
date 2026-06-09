import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";
import VehicleMap from "./components/VehicleMap";
import VehicleList from "./components/VehicleList";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    // Simulación de carga inicial
    setTimeout(() => {
      setError(true);
      setLoading(false);
    }, 2000);
  }, []);

  const handleReload = () => {
    setError(false);
    setLoading(true);

    setTimeout(() => {
      const mockVehicles = [
        {
          id: 1,
          name: "Camión 01",
          driver: "Juan Pérez",
          document: "123456",
          lat: 4.711,
          lng: -74.072,
         
        },
        {
          id: 2,
          name: "Auto 02",
          driver: "María Gómez",
          document: "789012",
          lat: 4.720,
          lng: -74.065,
        },
      ];
      setVehicles(mockVehicles);
      setSelectedVehicle(mockVehicles[0]);
      setLoading(false);
    }, 2000);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen onReload={handleReload} />;

  return (
    <div className="app-container">
      <Header />
      <div className="map-section">
        <VehicleMap selectedVehicle={selectedVehicle} />
      </div>
      <div className="list-section">
        <VehicleList vehicles={vehicles} onSelect={setSelectedVehicle} />
      </div>
    </div>
  );
}