import React, { useState } from "react";
import VehicleCard from "./VehicleCard";

export default function VehicleList({ vehicles, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="vehicle-list">
      <div className="search-bar">
        <input
        type="text"
        placeholder="Buscar vehículo..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      </div>
      <div className="cards-container">
        {filtered.map(v => (
          <VehicleCard key={v.id} vehicle={v} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}