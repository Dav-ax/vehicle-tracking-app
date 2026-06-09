import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function VehicleMap({ positions }) {
  useEffect(() => {
    // Crear el mapa en el div con id="map"
    const map = L.map("map").setView([4.711, -74.072], 13); // Bogotá como ejemplo

    // Cargar tiles de OpenStreetMap (gratis)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Dibujar posiciones de vehículos
    if (positions && positions.length > 0) {
      positions.forEach((pos) => {
        L.marker([pos.latitude, pos.longitude])
          .addTo(map)
          .bindPopup(`Vehículo: ${pos.deviceId}`);
      });
    }

    // Cleanup al desmontar el componente
    return () => {
      map.remove();
    };
  }, [positions]);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}